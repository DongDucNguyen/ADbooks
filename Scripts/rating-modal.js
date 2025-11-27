/* Scripts/rating-modal.js */
export class RatingModal {
    #overlay;
    #nameEl;
    #dateEl;
    #starEl;
    #bookEl;
    #titleEl;
    #contentEl;

    constructor() {
        this.#render();
        this.#attachEvents();
    }

    #render() {
        // Tạo HTML cho Modal
        this.#overlay = document.createElement('div');
        this.#overlay.className = 'standalone-modal-overlay';
        
        this.#overlay.innerHTML = `
            <div class="standalone-modal-box">
                <button class="modal-close-btn">&times;</button>
                
                <div class="modal-header-info">
                    <div>
                        <div class="modal-user-name js-m-name">User Name</div>
                        <div class="modal-date js-m-date">Date</div>
                    </div>
                    <div class="modal-star js-m-star">
                        </div>
                </div>

                <div class="modal-body">
                    <div class="modal-book-ref js-m-book" style="display:none;">
                        <i class="fa-solid fa-book"></i> <span class="js-m-book-text">Book Name</span>
                    </div>
                    <div class="modal-review-title js-m-title">Title</div>
                    <div class="modal-review-content js-m-content">Content</div>
                </div>
            </div>
        `;
        document.body.appendChild(this.#overlay);

        // Cache các element
        this.#nameEl = this.#overlay.querySelector('.js-m-name');
        this.#dateEl = this.#overlay.querySelector('.js-m-date');
        this.#starEl = this.#overlay.querySelector('.js-m-star');
        this.#bookEl = this.#overlay.querySelector('.js-m-book');
        this.#titleEl = this.#overlay.querySelector('.js-m-title');
        this.#contentEl = this.#overlay.querySelector('.js-m-content');
    }

    #attachEvents() {
        // Đóng khi click nút X
        this.#overlay.querySelector('.modal-close-btn').addEventListener('click', () => this.close());
        
        // Đóng khi click ra vùng tối bên ngoài
        this.#overlay.addEventListener('click', (e) => {
            if (e.target === this.#overlay) this.close();
        });
    }

    // Tự động tính đường dẫn ảnh sao cho đúng dù ở trang nào
    #getStarSrc(score) {
        const roundedScore = Math.round(score * 2) / 2;
        let scoreInt = roundedScore * 10;
        if (scoreInt > 50) scoreInt = 50;
        
        const fileName = (scoreInt === 0) ? 'rating-0.png' : 
                         (scoreInt < 10) ? `rating-0${scoreInt}.png` : 
                         `rating-${scoreInt}.png`;

        // Logic quan trọng: Kiểm tra URL để biết đang ở thư mục con hay root
        const isInDetails = window.location.pathname.toLowerCase().includes('/details/');
        const prefix = isInDetails ? '../Images/ratings/' : './Images/ratings/';
        
        return `${prefix}${fileName}`;
    }

    // Hàm gọi Modal hiện lên
    show(data) {
        if (!data) return;

        this.#nameEl.textContent = data.name || "Người dùng";
        this.#dateEl.textContent = data.date;
        this.#titleEl.textContent = data.title;
        this.#contentEl.textContent = data.content;

        // Hiển thị tên sách nếu có
        if (data.bookTitle) {
            this.#bookEl.style.display = 'inline-block';
            this.#bookEl.querySelector('.js-m-book-text').textContent = data.bookTitle;
        } else {
            this.#bookEl.style.display = 'none';
        }

        // Render sao
        const imgSrc = this.#getStarSrc(data.score);
        this.#starEl.innerHTML = `<img src="${imgSrc}" alt="${data.score}">`;

        this.#overlay.classList.add('active');
    }

    close() {
        this.#overlay.classList.remove('active');
    }
}