import { RatingModal } from '../rating-modal.js';

export class UserRatingSection {
    #data;
    #container;
    #modal;

    constructor(data) {
        this.#data = data;
        this.#container = document.querySelector('.js-rating-container');
        this.#modal = new RatingModal();
        if (this.#container) this.init();
    }

    init() {
        this.#render();
        this.#addEventListeners();
    }

    #render() {
        const listHtml = this.#data.slice(0, 4).map(rating => {
            const ratingImgName = this.#getRatingImageName(rating.star);
            return `
                <div class="your-rating-card" data-id="${rating.id}" style="cursor: pointer;">
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
                        <div class="content" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">"${rating.content}"</div>
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

        // [SỰ KIỆN CLICK]
        this.#container.querySelectorAll('.your-rating-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                const item = this.#data.find(r => r.id == id);
                if (item) {
                    // Chuẩn hóa dữ liệu cho Modal
                    const modalData = {
                        ...item,
                        score: item.star,       // User data dùng 'star'
                        title: item.Title,      // User data dùng 'Title' hoa
                        name: "Bạn"             // Tên mặc định
                    };
                    this.#modal.show(modalData);
                }
            });
        });
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