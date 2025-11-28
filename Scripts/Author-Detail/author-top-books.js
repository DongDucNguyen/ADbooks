export class AuthorTopBooks {
    constructor(books, authorName) {
        this.books = books;
        this.authorName = authorName;
    }

    init() {
        // Cập nhật tên tác giả ở tiêu đề section
        const nameEl = document.querySelector('.top-books-author-name');
        if (nameEl) nameEl.textContent = this.authorName;

        // Render danh sách sách
        const grid = document.querySelector('.top-books-grid');
        if (grid) {
            if (this.books.length === 0) {
                grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666;">Chưa có sách nào.</p>';
                return;
            }

            grid.innerHTML = this.books.map(book => `
                <div class="top-book-card" 
                     onclick="window.location.href='book.html?id=${book.id}'" 
                     style="cursor: pointer;">
                    <img src="${book.img}" alt="${book.title}" 
                         style="width: 100%; height: 200px; object-fit: cover; border-radius: 5px;">
                    <div class="book-name" style="margin-top: 10px; font-weight: 500;">${book.title}</div>
                </div>
            `).join('');
        }
    }
}