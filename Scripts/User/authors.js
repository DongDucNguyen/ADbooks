export class UserAuthorSection {
    #data;
    #container;

    constructor(data) {
        this.#data = data;
        this.#container = document.querySelector('.js-author-container');
        if (this.#container) this.init();
    }

    init() {
        this.#render();
    }

    #render() {
        const listHtml = this.#data.slice(0, 4).map(author => {
            // Xử lý danh sách sách: Biến mỗi sách thành 1 thẻ <a>
            // Thêm onclick="event.stopPropagation()" để không bị xung đột với click của thẻ cha
            const booksHtml = author.books.map(book => 
                `<a href="${book.link}" 
                    data-book-id="${book.id}" 
                    class="author-book-link"
                    onclick="event.stopPropagation();">
                    ${book.title}
                 </a>`
            ).join(', '); // Ngăn cách bằng dấu phẩy

            return `
                <div class="your-author-card" 
                     data-author-id="${author.id}" 
                     onclick="window.location.href='${author.link}'">
                    
                    <div class="your-author-image" data-author-id="${author.id}">
                        <img src="${author.img}" alt="${author.name}">
                    </div>
                    
                    <div class="your-author-infor">
                        <div class="your-author-name">${author.name}</div>
                        <div class="your-author-books">Sách: ${booksHtml}</div>
                    </div>
                </div>
            `;
        }).join('');

        this.#container.innerHTML = `
            <div class="your-authors-title">TÁC GIẢ CỦA BẠN</div>
            ${listHtml}
            <div class="all-authors">Tất cả</div>
        `;
    }
}