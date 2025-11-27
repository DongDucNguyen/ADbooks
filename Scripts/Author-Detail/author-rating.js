import { RatingModal } from '../rating-modal.js'; // Import Modal mới

export class AuthorRatingSection {
    #data;         
    #container;    
    #headerStar;   
    #filterSelect; 
    #viewAllBtn;   
    #modal;

    constructor(data) {
        this.#data = data;
        this.#container = document.querySelector('.rating'); 
        this.#headerStar = document.querySelector('.rating-star');
        this.#filterSelect = document.querySelector('.filter-select');
        this.#viewAllBtn = document.querySelector('.all-ratings');
        this.#modal = new RatingModal();

        if (this.#container) this.init();
    }

    init() {
        this.#updateHeaderInfo();
        this.#renderList(this.#data);
        this.#addEventListeners();
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
        `;
    }

    #getStarImgPath(score) {
        // Đường dẫn ../ vì ở trong Details
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
            <div class="rating-card" data-id="${review.id}" style="cursor: pointer;">
                <div class="main-inf">
                    <div class="name">${review.name}</div>
                    <div class="date">${review.date}</div>
                    <div class="star"><img src="${starImgSrc}" style="height: 20px;"></div>
                </div>
                <div class="comment">
                    <div class="review-book-ref" style="font-size: 13px; color: #666; margin-bottom: 4px; font-weight: bold;">
                        <i class="fa-solid fa-book"></i> ${review.bookTitle}
                    </div>
                    <div class="comment-title">${review.title}</div>
                    <div class="content" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">"${review.content}"</div>
                </div>
            </div>`;
        }).join('');

        const bottomHtml = `<div class="line"></div><div class="all-ratings" style="cursor: pointer; text-align: center; padding: 10px; color: #555;">Xem tất cả đánh giá</div>`;
        this.#container.innerHTML = topHtml + cardsHtml + bottomHtml;

        // [SỰ KIỆN CLICK]
        this.#container.querySelectorAll('.rating-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                const item = this.#data.find(r => r.id == id);
                if (item) this.#modal.show(item);
            });
        });

        const newViewAllBtn = this.#container.querySelector('.all-ratings');
        if (newViewAllBtn) {
            newViewAllBtn.addEventListener('click', () => window.location.href = '../Details/Listing-Author-Rating.html');
        }
    }

    #addEventListeners() {
        if (this.#filterSelect) {
            this.#filterSelect.addEventListener('change', (e) => {
                const value = e.target.value;
                let filteredData = [];

                switch(value) {
                    case "all": filteredData = this.#data; break;
                    case "option1": filteredData = this.#data.filter(item => item.score === 5.0); break;
                    case "option2": filteredData = this.#data.filter(item => item.score >= 4.0 && item.score < 5.0); break;
                    case "option3": filteredData = this.#data.filter(item => item.score >= 3.0 && item.score < 4.0); break;
                    case "option4": filteredData = this.#data.filter(item => item.score >= 2.0 && item.score < 3.0); break;
                    case "option5": filteredData = this.#data.filter(item => item.score >= 1.0 && item.score < 2.0); break;
                    default: filteredData = this.#data; break;
                }
                this.#renderList(filteredData);
            });
        }
    }
}