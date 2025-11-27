// Scripts/Reading/Reading-Detail/reading-info.js
export class ReadingInfo {
    #data;
    #elements;

    constructor(bookData) {
        this.#data = bookData;
        
        // Gom nhóm các elements cần thao tác trong Sidebar
        this.#elements = {
            coverContainer: document.querySelector('.book-cover-wrapper img'),
            title: document.querySelector('.book-text .book-title'),
            author: document.querySelector('.book-text .book-author')
        };

        // Chỉ chạy nếu tìm thấy DOM (Phòng thủ)
        if (this.#elements.title || this.#elements.coverContainer) {
            this.init();
        }
    }

    init() {
        this.#render();
    }

    #render() {
        if (!this.#data) return;

        // 1. Cập nhật ảnh bìa
        if (this.#elements.coverContainer && this.#data.coverUrl) {
            this.#elements.coverContainer.src = this.#data.coverUrl;
            this.#elements.coverContainer.alt = this.#data.title;
        }

        // 2. Cập nhật Tiêu đề sách
        if (this.#elements.title && this.#data.title) {
            this.#elements.title.textContent = this.#data.title;
        }

        // 3. Cập nhật Tác giả
        if (this.#elements.author && this.#data.author) {
            this.#elements.author.textContent = this.#data.author;
        }
        
        // [Mở rộng] Có thể cập nhật cả <title> của tab trình duyệt
        document.title = `${this.#data.title} - Reading View`;
    }
}