// Scripts/Book-Detail/book-banner.js
export class BookBanner {
    #data;
    #bookId; // [NEW] Lưu ID sách
    #container;
    #elements;
    #isFavorite;
    #token = localStorage.getItem('token'); // Lấy token

    constructor(data, bookId) {
        this.#data = data;
        this.#bookId = bookId; // Gán ID sách
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
        if (this.#elements.cover) {
            this.#elements.cover.src = this.#data.img;
            this.#elements.cover.setAttribute('data-book-id', this.#data.id);
        }
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
            btn.style.backgroundColor = '#A4A09A'; // Màu gốc
            btn.innerText = "Đã thích";
        } else {
            btn.classList.remove('active');
            btn.style.backgroundColor = '';
            btn.innerText = "Yêu thích";
        }
    }

    async #toggleFavorite() {
        if (!this.#token) {
            alert("Vui lòng đăng nhập để sử dụng chức năng này.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/v1/books/${this.#bookId}/favorite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.#token}`
                },
            });
            const data = await response.json();

            if (!response.ok) {
                alert(`Lỗi: ${data.message || 'Không thể cập nhật trạng thái yêu thích.'}`);
                return;
            }

            this.#isFavorite = data.isFavorite;
            this.#updateFavoriteUI();
            console.log(data.message);

        } catch (error) {
            console.error("Lỗi gọi API Toggle Favorite:", error);
            alert("Lỗi kết nối. Không thể cập nhật trạng thái yêu thích.");
        }
    }

    #addEventListeners() {
        if (this.#elements.favBtn) {
            this.#elements.favBtn.addEventListener('click', () => {
                this.#toggleFavorite();
            });
        }

        if (this.#elements.playBtn) {
            this.#elements.playBtn.addEventListener('click', () => {
                // Chuyển hướng đến trang đọc sách
                if (this.#bookId) {
                    // Resource data đã được lưu ở book-detail.js
                    window.location.href = `/Reading-Page.html?id=${this.#bookId}`;
                }
            });
        }
    }
}