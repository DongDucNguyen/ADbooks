import { AddRatingModal } from './add-rating-modal.js';
import { ViewRatingModal } from './view-rating-modal.js';

export class BookRatingSection {
    #data;         
    #container;    
    #headerStar;   
    #filterSelect; 
    #plusBtn; 
    #viewModal; // Instance modal xem chi tiết

    constructor(data) {
        this.#data = data;
        this.#container = document.querySelector('.rating'); 
        this.#headerStar = document.querySelector('.rating-star');
        this.#filterSelect = document.querySelector('.filter-select');
        this.#plusBtn = document.querySelector('.plus-btn');

        // Khởi tạo Modal Xem
        this.#viewModal = new ViewRatingModal();

        if (this.#container) {
            this.init();
        }
    }

    init() {
        this.#updateHeaderInfo();
        this.#renderList(this.#data);
        this.#addEventListeners();
        this.#initAddRatingModal();
    }

    #initAddRatingModal() {
        if (!this.#plusBtn) return;
        const addModal = new AddRatingModal((newReview) => {
            this.#data.unshift(newReview);
            if (this.#filterSelect) this.#filterSelect.value = 'all';
            this.#renderList(this.#data);
            this.#updateHeaderInfo();
            this.#container.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        this.#plusBtn.addEventListener('click', () => addModal.show());
    }

    #updateHeaderInfo() {
        if (!this.#headerStar) return;
        const totalScore = this.#data.reduce((sum, item) => sum + item.score, 0);
        const avgScore = this.#data.length ? (totalScore / this.#data.length) : 0;
        const displayScore = avgScore.toFixed(1);
        const starImgSrc = this.#getStarImgPath(avgScore);

        this.#headerStar.innerHTML = `
            <img src="${starImgSrc}" alt="${displayScore}" style="height: 25px; vertical-align: middle;">
            <span style="font-size: 20px; vertical-align: middle; margin-left: 10px;">${displayScore} / 5.0</span>
            <span style="font-size: 14px; color: #666; margin-left: 5px;">(${this.#data.length} đánh giá)</span>
        `;
    }

    #getStarImgPath(score) {
        const roundedScore = Math.round(score * 2) / 2;
        let scoreInt = roundedScore * 10; 
        if(scoreInt > 50) scoreInt = 50;
        const fileName = (scoreInt === 0) ? 'rating-0.png' : (scoreInt < 10 ? `rating-0${scoreInt}.png` : `rating-${scoreInt}.png`);
        return `../Images/ratings/${fileName}`;
    }

    #renderList(dataToRender) {
        this.#container.innerHTML = '';
        const displayData = dataToRender.slice(0, 5); 

        const topHtml = `<div class="line"></div>`;
        const cardsHtml = displayData.map(review => {
            const starImgSrc = this.#getStarImgPath(review.score);
            return `
            <div class="rating-card" data-rating-id="${review.id}" style="cursor: pointer;">
                <div class="main-inf">
                    <div class="name">${review.name}</div>
                    <div class="date">${review.date}</div>
                    <div class="star">
                        <img src="${starImgSrc}" alt="${review.score} sao" style="height: 20px;">
                    </div>
                </div>
                <div class="comment">
                    <div class="comment-title">${review.title}</div>
                    <div class="content" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">"${review.content}"</div>
                </div>
            </div>`;
        }).join('');

        const bottomHtml = `
            <div class="line"></div>
            <div class="all-ratings" style="cursor: pointer; text-align: center; padding: 10px; color: #555;">
                Xem tất cả đánh giá (${this.#data.length})
            </div>`;

        this.#container.innerHTML = topHtml + cardsHtml + bottomHtml;

        // Gắn sự kiện CLICK để xem chi tiết
        this.#container.querySelectorAll('.rating-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.ratingId;
                const item = this.#data.find(r => r.id == id);
                if (item) this.#viewModal.show(item);
            });
        });

        // Nút xem tất cả
        const viewAllBtn = this.#container.querySelector('.all-ratings');
        if (viewAllBtn) {
            viewAllBtn.addEventListener('click', () => window.location.href = '../Details/Listing-Rating.html');
        }
    }

    #addEventListeners() {
        if (this.#filterSelect) {
            this.#filterSelect.addEventListener('change', (e) => {
                const value = e.target.value;
                let filteredData = this.#data;
                if (value === 'option1') filteredData = this.#data.filter(i => i.score === 5.0);
                else if (value === 'option2') filteredData = this.#data.filter(i => i.score >= 4.0 && i.score < 5.0);
                else if (value === 'option3') filteredData = this.#data.filter(i => i.score >= 3.0 && i.score < 4.0);
                else if (value === 'option4') filteredData = this.#data.filter(i => i.score >= 2.0 && i.score < 3.0);
                else if (value === 'option5') filteredData = this.#data.filter(i => i.score >= 1.0 && i.score < 2.0);
                this.#renderList(filteredData);
            });
        }
    }
}