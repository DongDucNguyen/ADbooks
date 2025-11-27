export class BookBanner {
    #data;
    #container;
    #elements;
    
    // [UPDATE] Biến trạng thái private
    #isFavorite; 

    constructor(data) {
        this.#data = data;
        // Khởi tạo trạng thái từ dữ liệu đầu vào
        this.#isFavorite = data.isFavorite || false; 

        this.#container = document.querySelector('.introduction-banner');

        if (this.#container) {
            this.#elements = {
                cover: this.#container.querySelector('.book-cover img'),
                title: this.#container.querySelector('.book-title'),
                author: this.#container.querySelector('.author-name'),
                date: this.#container.querySelector('.publish-date'),
                shortInfo: this.#container.querySelector('.book-infor-content'),
                // Lấy nút buttons (Giả sử nút thứ 2 là nút Yêu thích như trong HTML)
                playBtn: this.#container.querySelector('.function-buttons button:nth-child(1)'),
                favBtn: this.#container.querySelector('.function-buttons button:nth-child(2)')
            };
            this.init();
        }
    }

    init() {
        this.#render();
        this.#updateFavoriteUI(); // Cập nhật giao diện nút Favorite lần đầu
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

    // [UPDATE] Hàm riêng để cập nhật giao diện nút Favorite dựa trên biến #isFavorite
    #updateFavoriteUI() {
        const btn = this.#elements.favBtn;
        if (!btn) return;

        if (this.#isFavorite) {
            btn.classList.add('active'); 
            btn.style.backgroundColor = 'pink'; // Hoặc màu bạn muốn
            btn.innerText = "Đã thích";
        } else {
            btn.classList.remove('active');
            btn.style.backgroundColor = ''; // Reset màu
            btn.innerText = "Yêu thích";
        }
    }

    #addEventListeners() {
        // Sự kiện nút Yêu thích
        if (this.#elements.favBtn) {
            this.#elements.favBtn.addEventListener('click', () => {
                // Đổi trạng thái (Toggle)
                this.#isFavorite = !this.#isFavorite;
                
                // Cập nhật lại UI
                this.#updateFavoriteUI();
                
                // Log kiểm tra
                console.log(`Favorite status changed to: ${this.#isFavorite}`);
            });
        }
        
        // Sự kiện nút Phát
        if (this.#elements.playBtn) {
            this.#elements.playBtn.addEventListener('click', () => {
                const bookId = this.#data.bookId;
                console.log("Đang xem sách ID:", bookId);

                window.location.href = "/Reading-Page.html";
            });
        }
    }
}