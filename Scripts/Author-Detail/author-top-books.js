export class AuthorTopBooks {
    #books;
    #container;
    #authorNameEl;

    constructor(booksData, authorName) {
        this.#books = booksData || [];
        this.#container = document.querySelector('.top-books-grid');
        this.#authorNameEl = document.querySelector('.top-books-author-name');
        
        // Cập nhật tên tác giả ở tiêu đề phần này (nếu có element đó)
        if (this.#authorNameEl) {
            this.#authorNameEl.textContent = authorName;
        }

        if (this.#container) {
            this.init();
        }
    }

    init() {
        this.#render();
        this.#addEventListeners();
    }

    #render() {
        // Nếu không có sách nào
        if (!this.#books || this.#books.length === 0) {
            this.#container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #fff;">Chưa có sách nào được cập nhật.</p>';
            return;
        }

        // Map dữ liệu sách từ API: id, name, thumbnailUrl
        this.#container.innerHTML = this.#books.map(book => `
            <div class="top-book-card jstoBookDetailPage" data-book-id="${book.id}" style="cursor: pointer;">
                <div class="book-cover-wrapper">
                    <img src="${book.thumbnailUrl}" alt="${book.name}" onerror="this.src='../Images/Book-Covers/default.png'">
                </div>
                <div class="book-name">${book.name}</div>
            </div>
        `).join('');
    }

    #addEventListeners() {
        // Thêm sự kiện click để chuyển sang trang chi tiết sách
        const bookCards = this.#container.querySelectorAll('.jstoBookDetailPage');
        
        bookCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const bookId = card.dataset.bookId;
                if (bookId) {
                    // Chuyển hướng sang trang chi tiết sách với ID tương ứng
                    window.location.href = `../Details/book-detail.html?id=${bookId}`;
                }
            });
        });
    }
}