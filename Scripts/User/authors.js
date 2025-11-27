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
        this.#addEventListeners(); // [NEW] Gọi hàm lắng nghe sự kiện
    }

    #render() {
        const listHtml = this.#data.slice(0, 4).map(author => {
            // Xử lý danh sách sách
            const booksHtml = author.books.map(book => 
                // BỎ dòng: onclick="event.stopPropagation()"
                `<a href="${book.link}" 
                    data-book-id="${book.id}" 
                    class="author-book-link jstoBookDetailPage"> 
                    ${book.title}
                </a>`
            ).join(', ');

            return `
                <div class="your-author-card jstoAuthorPage" 
                     data-author-id="${author.id}">
                    
                    <div class="your-author-image" data-author-id="${author.id}">
                        <img src="${author.img}" alt="${author.name}" onerror="this.src='../Images/Authors/default.jpg'">
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
            <div class="all-authors" style="cursor: pointer;">Tất cả</div>
        `;
    }

    // [NEW] Xử lý sự kiện click "Tất cả"
    #addEventListeners() {
        const viewAllBtn = this.#container.querySelector('.all-authors');

        if (viewAllBtn) {
            viewAllBtn.addEventListener('click', () => {
                // 1. Lưu tiêu đề mong muốn cho trang Listing Author
                localStorage.setItem('selectedAuthorCategory', "TÁC GIẢ CỦA BẠN");

                // 2. Điều hướng tới trang danh sách tác giả
                window.location.href = "./Details/Listing-Authors.html";
            });
        }
    }
}