export class AuthorTopBooks {
    #books;
    #container;
    #authorNameEl;

    constructor(data, authorName) {
        this.#books = data;
        this.#container = document.querySelector('.top-books-grid');
        this.#authorNameEl = document.querySelector('.top-books-author-name');
        
        // Cập nhật tên tác giả ở header section này
        if (this.#authorNameEl) {
            this.#authorNameEl.textContent = authorName;
        }

        if (this.#container) {
            this.init();
        }
    }

    init() {
        this.#render();
    }

    #render() {
        if (!this.#books || this.#books.length === 0) return;

        this.#container.innerHTML = this.#books.map(book => `
            <div class="top-book-card jstoBookDetailPage" data-book-id="${book.id}" style="cursor: pointer;">
                <img src="${book.img}" alt="${book.title}" onerror="this.src='../Images/Book-Covers/default.png'">
                <div class="book-name">${book.title}</div>
            </div>
        `).join('');
    }
}