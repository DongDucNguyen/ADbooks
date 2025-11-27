export class ViewRatingModal {
    #overlay;
    #titleEl;
    #contentEl;
    #nameEl;
    #dateEl;
    #starContainer;
    #bookRefEl; 

    constructor() {
        this.#render();
        this.#attachEvents();
    }

    #render() {
        this.#overlay = document.createElement('div');
        this.#overlay.className = 'rating-modal-overlay';
        
        this.#overlay.innerHTML = `
            <div class="rating-modal-content view-mode">
                <button class="close-modal-btn">&times;</button>
                <div class="view-rating-header">
                    <div class="view-user-info">
                        <div class="name js-view-name">User Name</div>
                        <div class="date js-view-date">DD/MM/YYYY</div>
                    </div>
                    <div class="view-rating-star js-view-star"></div>
                </div>
                <div class="view-rating-body">
                    <div class="view-book-ref js-view-book-ref" style="display: none;">
                        <i class="fa-solid fa-book"></i> <span class="js-book-title-text"></span>
                    </div>
                    <div class="view-rating-title js-view-title">Rating Title</div>
                    <div class="view-rating-content js-view-content"></div>
                </div>
            </div>
        `;
        document.body.appendChild(this.#overlay);

        this.#nameEl = this.#overlay.querySelector('.js-view-name');
        this.#dateEl = this.#overlay.querySelector('.js-view-date');
        this.#starContainer = this.#overlay.querySelector('.js-view-star');
        this.#titleEl = this.#overlay.querySelector('.js-view-title');
        this.#contentEl = this.#overlay.querySelector('.js-view-content');
        this.#bookRefEl = this.#overlay.querySelector('.js-view-book-ref');
    }

    #attachEvents() {
        const closeBtn = this.#overlay.querySelector('.close-modal-btn');
        closeBtn.addEventListener('click', () => this.close());
        this.#overlay.addEventListener('click', (e) => {
            if (e.target === this.#overlay) this.close();
        });
    }

    // [QUAN TRỌNG] Hàm tự động tính đường dẫn ảnh dựa trên URL hiện tại
    #getStarImgPath(score) {
        const roundedScore = Math.round(score * 2) / 2;
        let scoreInt = roundedScore * 10;
        if (scoreInt > 50) scoreInt = 50;
        
        const fileName = (scoreInt === 0) ? 'rating-0.png' : 
                         (scoreInt < 10) ? `rating-0${scoreInt}.png` : 
                         `rating-${scoreInt}.png`;

        // Kiểm tra xem trang hiện tại có nằm trong thư mục con (Details) không
        const isInSubFolder = window.location.pathname.includes('/Details/');
        const basePath = isInSubFolder ? '../Images/ratings/' : './Images/ratings/';
        
        return `${basePath}${fileName}`; 
    }

    show(data) {
        if (!data) return;

        this.#nameEl.textContent = data.name || "Người dùng";
        this.#dateEl.textContent = data.date;
        this.#titleEl.textContent = data.title;
        this.#contentEl.textContent = data.content;

        // Hiển thị tên sách nếu có
        if (data.bookTitle) {
            this.#bookRefEl.style.display = 'inline-block';
            this.#bookRefEl.querySelector('.js-book-title-text').textContent = data.bookTitle;
        } else {
            this.#bookRefEl.style.display = 'none';
        }

        // Render ảnh sao
        const imgSrc = this.#getStarImgPath(data.score);
        this.#starContainer.innerHTML = `<img src="${imgSrc}" alt="${data.score} sao">`;

        this.#overlay.classList.add('active');
    }

    close() {
        this.#overlay.classList.remove('active');
    }
}