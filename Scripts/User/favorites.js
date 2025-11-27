export class UserFavoriteSection {
    #data;
    #container;

    constructor(data) {
        this.#data = data;
        this.#container = document.querySelector('.js-favorite-container');
        if (this.#container) this.init();
    }

    init() {
        this.#render();
        this.#addEventListeners(); // [NEW] Gọi hàm lắng nghe sự kiện
    }

    #render() {
        const listHtml = this.#data.slice(0, 6).map(book => `
            <div class="favorite-card jstoBookDetailPage" 
                 data-book-id="${book.id}">
                 
                <img src="${book.img}" alt="${book.title}" onerror="this.src='../Images/Book-Covers/default.png'">
                <div>${book.title}</div>
            </div>
        `).join('');

        this.#container.innerHTML = `
            <p class="favorite-title">YÊU THÍCH</p>
            <div class="favorite-grid">
                ${listHtml}
            </div>
            <div class="line"></div>
            <div class="all-favorites" style="cursor: pointer;">Tất cả</div>
        `;
    }

    // [NEW] Xử lý sự kiện click "Tất cả"
    #addEventListeners() {
        const viewAllBtn = this.#container.querySelector('.all-favorites');
        
        if (viewAllBtn) {
            viewAllBtn.addEventListener('click', () => {
                // 1. Lưu tiêu đề mong muốn cho trang Listing Book
                localStorage.setItem('selectedGenre', "YÊU THÍCH");
                
                // 2. Điều hướng tới trang danh sách sách
                window.location.href = "./Details/Listing-Book-Page.html";
            });
        }
    }
}