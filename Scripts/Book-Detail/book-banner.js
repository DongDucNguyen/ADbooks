// Scripts/Book-Detail/book-banner.js

export class BookBanner {
    #data;
    #container;
    #elements;
    #isFavorite; 

    constructor(data) {
        this.#data = data;
        this.#isFavorite = data.isFavorite || false; 
        this.#container = document.querySelector('.introduction-banner');

        if (this.#container) {
            this.#elements = {
                cover: this.#container.querySelector('.book-cover img'),
                title: this.#container.querySelector('.book-title'),
                author: this.#container.querySelector('.author-name'),
                date: this.#container.querySelector('.publish-date'),
                shortInfo: this.#container.querySelector('.book-infor-content'),
                playBtn: this.#container.querySelector('.function-buttons button:nth-child(1)'),
                favBtn: this.#container.querySelector('.function-buttons button:nth-child(2)')
            };
            this.init();
        }
    }

    init() {
        this.#render();
        this.#updateFavoriteUI(); 
        this.#addEventListeners();
    }

    #render() {
        if (!this.#data) return;
        if (this.#elements.cover) this.#elements.cover.src = this.#data.img;
        if (this.#elements.title) this.#elements.title.textContent = this.#data.title;
        if (this.#elements.author) this.#elements.author.textContent = this.#data.author;
        if (this.#elements.date) this.#elements.date.textContent = `Publish Date: ${this.#data.publishDate}`;
        if (this.#elements.shortInfo) this.#elements.shortInfo.textContent = this.#data.shortInfo;
    }

    #updateFavoriteUI() {
        const btn = this.#elements.favBtn;
        if (!btn) return;
        if (this.#isFavorite) {
            btn.classList.add('active'); 
            btn.style.backgroundColor = 'pink'; 
            btn.innerText = "Đã thích";
        } else {
            btn.classList.remove('active');
            btn.style.backgroundColor = ''; 
            btn.innerText = "Yêu thích";
        }
    }

    #addEventListeners() {
        if (this.#elements.favBtn) {
            this.#elements.favBtn.addEventListener('click', () => {
                this.#isFavorite = !this.#isFavorite;
                this.#updateFavoriteUI();
            });
        }
        
        // --- CẬP NHẬT SỰ KIỆN NÚT PLAY ---
        if (this.#elements.playBtn) {
            this.#elements.playBtn.addEventListener('click', () => {
                // Lấy ID sách từ dữ liệu đã truyền vào class
                const bookId = this.#data.id; 
                console.log("Đang mở sách ID:", bookId);

                // Cách 1: Truyền qua URL (Khuyên dùng)
                window.location.href = `../Reading-Page.html?id=${bookId}`;

                // Cách 2: Lưu vào localStorage (Nếu muốn giữ trạng thái lâu dài)
                // localStorage.setItem('currentBookId', bookId);
                // window.location.href = "../Reading-Page.html";
            });
        }
    }
}