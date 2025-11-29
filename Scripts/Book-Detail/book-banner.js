// Scripts/Book-Detail/book-banner.js

export class BookBanner {
    #data;
    #container;
    #elements;

    // Biến trạng thái private để quản lý trạng thái yêu thích
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
                // Giả định nút thứ 1 là Phát, nút thứ 2 là Yêu thích
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
        if (!this.#elements.cover || !this.#data) return;

        this.#elements.cover.src = this.#data.img || '../Images/Book-Covers/default.png';
        this.#elements.title.textContent = this.#data.title || 'N/A';
        this.#elements.author.textContent = this.#data.author || 'N/A';
        this.#elements.date.textContent = this.#data.publishDate || 'N/A';
        this.#elements.shortInfo.textContent = this.#data.shortInfo || 'Không có thông tin tóm tắt.';
    }

    #updateFavoriteUI() {
        if (!this.#elements.favBtn) return;

        // Cập nhật class/text để phản ánh trạng thái
        if (this.#isFavorite) {
            this.#elements.favBtn.classList.add('active');
            this.#elements.favBtn.textContent = 'Đã Thêm';
        } else {
            this.#elements.favBtn.classList.remove('active');
            this.#elements.favBtn.textContent = 'Yêu Thích';
        }
    }

    #addEventListeners() {
        // Sự kiện nút Yêu thích (Tương tác UI)
        if (this.#elements.favBtn) {
            this.#elements.favBtn.addEventListener('click', () => {
                // Tích hợp logic gọi API /favorite ở đây (nếu cần)

                this.#isFavorite = !this.#isFavorite;
                this.#updateFavoriteUI();

                console.log(`Favorite status changed to: ${this.#isFavorite}`);
            });
        }

        // Sự kiện nút Phát Ngay (Navigation)
        if (this.#elements.playBtn) {
            this.#elements.playBtn.addEventListener('click', () => {

                // [FIX QUAN TRỌNG] Lấy ID sách từ dữ liệu đã fetch
                const bookId = this.#data.id;

                if (!bookId) {
                    console.error("Lỗi: Không tìm thấy ID sách để chuyển hướng.");
                    alert("Không thể phát sách: Thiếu thông tin ID.");
                    return;
                }

                // [FIX CHÍNH] Nối ID vào URL để trang đọc có thể tải tài nguyên
                console.log("Đang chuyển hướng đến sách ID:", bookId);
                window.location.href = `/Reading-Page.html?id=${bookId}`;
            });
        }
    }
}