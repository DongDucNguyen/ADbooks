export class AuthorRatingSection {
    #data;         
    #container;    
    #headerStar;   
    #filterSelect; 
    #viewAllBtn;   

    constructor(data) {
        this.#data = data;
        
        this.#container = document.querySelector('.rating'); 
        this.#headerStar = document.querySelector('.rating-star');
        this.#filterSelect = document.querySelector('.filter-select');
        this.#viewAllBtn = document.querySelector('.all-ratings');

        if (this.#container) {
            this.init();
        }
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
            <img src="${starImgSrc}" alt="${displayScore} sao" style="height: 25px; vertical-align: middle;">
            <span style="font-size: 20px; vertical-align: middle; margin-left: 10px;">${displayScore} / 5.0</span>
        `;
    }

    #getStarImgPath(score) {
        const roundedScore = Math.round(score * 2) / 2;
        let scoreInt = roundedScore * 10; 
        
        let fileName = '';
        if (scoreInt === 0) fileName = 'rating-0.png';
        else if (scoreInt < 10) fileName = `rating-0${scoreInt}.png`;
        else {
            if (scoreInt > 50) scoreInt = 50;
            fileName = `rating-${scoreInt}.png`;
        }
        
        return `../Images/ratings/${fileName}`;
    }

    #renderList(dataToRender) {
        this.#container.innerHTML = '';
        
        // Giới hạn hiển thị 3-5 comment
        const displayData = dataToRender.slice(0, 5); 

        const topHtml = `<div class="line"></div>`;
        
        const cardsHtml = displayData.map(review => {
            const starImgSrc = this.#getStarImgPath(review.score);

            // [UPDATE] Thêm data-rating-id và hiển thị Book Title
            return `
            <div class="rating-card" data-rating-id="${review.id}">
                <div class="main-inf">
                    <div class="name">${review.name}</div>
                    <div class="date">${review.date}</div>
                    <div class="star">
                        <img src="${starImgSrc}" alt="${review.score} sao" style="height: 20px;">
                    </div>
                </div>
                <div class="comment">
                    <div class="review-book-ref" style="font-size: 13px; color: #666; margin-bottom: 4px; font-weight: bold;">
                        <i class="fa-solid fa-book"></i> ${review.bookTitle}
                    </div>
                    
                    <div class="comment-title">${review.title}</div>
                    <div class="content">"${review.content}"</div>
                </div>
            </div>
            `;
        }).join('');

        const bottomHtml = `
            <div class="line"></div>
            <div class="all-ratings" style="cursor: pointer; text-align: center; padding: 10px; color: #555;">
                Xem tất cả đánh giá
            </div>
        `;

        this.#container.innerHTML = topHtml + cardsHtml + bottomHtml;

        const newViewAllBtn = this.#container.querySelector('.all-ratings');
        if (newViewAllBtn) {
            newViewAllBtn.addEventListener('click', () => {
                window.location.href = '../Details/Listing-Author-Rating.html';
            });
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