export class UserRatingSection {
    #data;
    #container;

    constructor(data) {
        this.#data = data;
        this.#container = document.querySelector('.js-rating-container');
        if (this.#container) this.init();
    }

    init() {
        this.#render();
        this.#addEventListeners(); // [NEW] Gọi hàm gắn sự kiện sau khi render
    }

    #render() {
        // ... (Giữ nguyên logic render của bạn) ...
        const listHtml = this.#data.slice(0, 4).map(rating => {
            const ratingImgName = this.#getRatingImageName(rating.star);
            return `
                <div class="your-rating-card" data-rating-id="${rating.id}">
                    <div class="main-inf">
                        <div class="date">${rating.date}</div>
                        <div class="star">
                            <img src="./Images/ratings/${ratingImgName}" alt="Rating ${rating.star}" style="height: 18px;">
                        </div>
                    </div>
                    <div class="comment">
                    <div class="review-book-ref" style="font-size: 13px; color: #666; margin-bottom: 4px; font-weight: bold;">
                        <i class="fa-solid fa-book"></i> ${rating.bookTitle}
                    </div>
                        <div class="comment-title">${rating.Title}</div>
                        <div class="content">"${rating.content}"</div>
                    </div>
                </div>
            `;
        }).join('');

        this.#container.innerHTML = `
            <div class="rating-title">ĐÁNH GIÁ CỦA BẠN</div>
            <div class="your-rating">
                ${listHtml}
                <div class="all-ratings" style="cursor: pointer;">Tất cả</div>
            </div>
        `;
    }

    // [NEW] Hàm xử lý sự kiện click
    #addEventListeners() {
        const viewAllBtn = this.#container.querySelector('.all-ratings');
        
        if (viewAllBtn) {
            viewAllBtn.addEventListener('click', () => {
                // 1. Lưu Title vào LocalStorage
                localStorage.setItem('selectedAuthorCategory', "ĐÁNH GIÁ CỦA BẠN");
                
                // 2. Điều hướng
                // Lưu ý: Kiểm tra lại đường dẫn "../Details" hay "./Details" tùy vào file HTML của bạn nằm ở đâu
                window.location.href = "./Details/Listing-Author-Rating.html"; 
            });
        }
    }

    #getRatingImageName(score) {
        let scoreInt = Math.round(score * 10); 
        scoreInt = Math.round(scoreInt / 5) * 5;
        if (scoreInt === 0) return 'rating-0.png';
        const scoreStr = scoreInt < 10 ? `0${scoreInt}` : `${scoreInt}`;
        return `rating-${scoreStr}.png`;
    }
}