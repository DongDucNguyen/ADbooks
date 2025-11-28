export class UserFavoriteSection {
    #data;
    #container;
    #token;

    constructor(data) {
        this.#data = data;
        this.#container = document.querySelector('.js-favorite-container');
        this.#token = token
        if (this.#container) this.init();
    }

    async init() {
        await this.#fetchFavorites();
        this.#render();
        this.#addEventListeners(); // [NEW] Gọi hàm lắng nghe sự kiện
    }

    async #fetchFavorites(page = 0, size = 6) {
        try {
            const res = await fetch(`http://localhost:8080/api/v1/books/favorites?page=${page}&size=${size}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.#token}`
                }
            });

            if (!res.ok) throw new Error('Failed to fetch favorites');

            const result = await res.json();
            this.#data = result.content; // mảng sách
        } catch (err) {
            console.error('Error fetching favorites:', err);
            this.#data = [];
        }
    }

    #render() {
        if (!this.#data.length) {
            this.#container.innerHTML = '<p>Không có sách yêu thích nào.</p>';
            return;
        }

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

        // [Optional] Thêm click từng sách để đi chi tiết
        this.#container.querySelectorAll('.jstoBookDetailPage').forEach(card => {
            card.addEventListener('click', () => {
                const bookId = card.dataset.bookId;
                localStorage.setItem('selectedBookId', bookId);
                window.location.href = "./Details/Book-Detail-Page.html";
            });
        });
    }
}