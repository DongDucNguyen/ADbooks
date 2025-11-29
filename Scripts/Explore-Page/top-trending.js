// Scripts/Explore-Page/top-trending.js
export class TrendingSection {
    // 1. Khai báo các thuộc tính Private
    #books = [];
    #grid1El;
    #grid2El;

    // Sửa constructor: Không nhận data, tự fetch
    constructor() {
        this.#grid1El = document.querySelector('.js-book-grid-1');
        this.#grid2El = document.querySelector('.js-book-grid-2');

        if (this.#grid1El && this.#grid2El) {
            this.init();
        } else {
            console.warn('TrendingSection: Không tìm thấy element .js-book-grid-1 hoặc .js-book-grid-2');
        }
    }

    // Public method: Khởi chạy
    async init() {
        await this.#fetchData();
        this.render();
    }

    async #fetchData() {
        try {
            // API: Lấy Top Trending, giới hạn 6 cuốn
            const response = await fetch("http://localhost:8080/api/v1/books?type=trending&size=6");
            if (!response.ok) throw new Error('Failed to fetch trending books');

            const data = await response.json();
            // Map dữ liệu từ BookSlimResponse sang cấu trúc FE
            this.#books = data.content.map(book => ({
                id: book.id,
                title: book.name,
                author: book.authorNames,
                img: book.thumbnailUrl,
                rating: book.averageRating,
                reviewCount: book.ratingCount ? book.ratingCount.toLocaleString('en-US') : '0'
            }));
        } catch (error) {
            console.error("Error fetching trending books:", error);
            this.#books = []; // Dùng mảng rỗng nếu có lỗi
        }
    }

    // Private method: Logic render chính
    render() {
        if (this.#books.length === 0) {
            this.#grid1El.innerHTML = '<p style="grid-column: 1 / -1; text-align: center;">Không có sách Trending.</p>';
            this.#grid2El.innerHTML = '';
            return;
        }

        const midIndex = Math.ceil(this.#books.length / 2);

        const firstRowBooks = this.#books.slice(0, midIndex);
        const secondRowBooks = this.#books.slice(midIndex);

        this.#grid1El.innerHTML = firstRowBooks.map(book => this.#createCardHtml(book)).join('');
        this.#grid2El.innerHTML = secondRowBooks.map(book => this.#createCardHtml(book)).join('');
    }

    // Private method: Tạo HTML cho từng thẻ sách (Book Card)
    #createCardHtml(book) {
        const ratingImgName = this.#getRatingImageName(book.rating);

        return `
            <div class="book-card">
                <div class="book-cover jstoBookDetailPage" data-book-id="${book.id}">
                    <img src="${book.img}" alt="${book.title}" onerror="this.src='./Images/Book-Covers/default.png'">
                </div>
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <div class="author">By ${book.author}</div>
                    <div class="rating">
                        <img src="./Images/ratings/${ratingImgName}" alt="rating ${book.rating}">
                        (${book.reviewCount})
                    </div>
                    <a href="#" class="read-more-btn jstoBookDetailPage" data-book-id="${book.id}">
                        Xem thêm
                    </a>
                </div>
            </div>
        `;
    }

    // Private method: Chuyển đổi điểm số (ví dụ 4.5) thành tên file ảnh (rating-45.png)
    #getRatingImageName(score) {
        let scoreInt = Math.round(score * 10);
        scoreInt = Math.round(scoreInt / 5) * 5;
        if (scoreInt === 0) return 'rating-0.png';
        if (scoreInt > 50) scoreInt = 50;
        
        const scoreStr = scoreInt < 10 ? `0${scoreInt}` : `${scoreInt}`;
        return `rating-${scoreStr}.png`;
    }
}