export class TrendingSection {
    // 1. Khai báo các thuộc tính Private
    #books;            // Dữ liệu sách đầu vào
    #grid1El;          // DOM element cho hàng sách trên (3 cuốn)
    #grid2El;          // DOM element cho hàng sách dưới (3 cuốn)
    
    constructor(books) {
        // Gán dữ liệu private
        this.#books = books;
        
        // Select DOM elements
        this.#grid1El = document.querySelector('.js-book-grid-1');
        this.#grid2El = document.querySelector('.js-book-grid-2');

        // Chỉ chạy init nếu tìm thấy DOM
        if (this.#grid1El && this.#grid2El) {
            this.init();
        } else {
            console.warn('TrendingSection: Không tìm thấy element .js-book-grid-1 hoặc .js-book-grid-2');
        }
    }

    // Public method: Khởi chạy
    init() {
        this.render();
    }

    // Private method: Logic render chính
    render() {
        // Chia dữ liệu thành 2 phần: 3 cuốn đầu và 3 cuốn sau
        // (Giả sử danh sách có ít nhất 6 cuốn, hoặc tự động chia đôi)
        const midIndex = Math.ceil(this.#books.length / 2);
        
        const firstRowBooks = this.#books.slice(0, midIndex); // 3 cuốn đầu
        const secondRowBooks = this.#books.slice(midIndex);   // Các cuốn còn lại

        // Render HTML vào từng Grid
        this.#grid1El.innerHTML = firstRowBooks.map(book => this.#createCardHtml(book)).join('');
        this.#grid2El.innerHTML = secondRowBooks.map(book => this.#createCardHtml(book)).join('');
    }

    // Private method: Tạo HTML cho từng thẻ sách (Book Card)
    #createCardHtml(book) {
        // Xử lý logic ảnh rating (từ số điểm -> tên file ảnh)
        const ratingImgName = this.#getRatingImageName(book.rating);

        return `
            <div class="book-card">
                <div class="book-cover jstoBookDetailPage" data-book-id="${book.id}">
                    <img src="${book.img}" alt="${book.title}">
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
    // Dựa trên cấu trúc file bạn cung cấp: rating-05, rating-10... rating-50
    #getRatingImageName(score) {
        // Nhân 10 để lấy số nguyên (4.5 -> 45)
        let scoreInt = Math.round(score * 10); 
        
        // Đảm bảo chia hết cho 5 (vì ảnh bước nhảy là 0, 05, 10...)
        // Ví dụ: 43 -> 45, 41 -> 40
        scoreInt = Math.round(scoreInt / 5) * 5;

        // Format thành chuỗi 2 chữ số (5 -> "05", 0 -> "00" -> map về 0)
        // Xử lý đặc biệt cho trường hợp 0 (file là rating-0.png hay rating-00.png?)
        // Dựa theo ảnh bạn gửi: rating-0.png, rating-05.png
        
        if (scoreInt === 0) return 'rating-0.png';
        
        const scoreStr = scoreInt < 10 ? `0${scoreInt}` : `${scoreInt}`;
        return `rating-${scoreStr}.png`;
    }
}