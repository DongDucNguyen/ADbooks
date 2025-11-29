// Scripts/Explore-Page/new-books.js
export class NewBooksSection {
    #books = [];
    #currentIndex = 0;
    #autoSlideInterval = null;
    #slideDuration = 5000;
    #featuredContainer;
    #listContainer;

    // Sửa constructor: Không nhận data, tự fetch
    constructor() {
        this.#featuredContainer = document.querySelector('.new-book-card');
        this.#listContainer = document.querySelector('.new-books-grid');

        if (this.#featuredContainer && this.#listContainer) {
            this.init();
        } else {
            console.warn('NewBooksSection: Thiếu DOM required');
        }
    }

    async init() {
        await this.#fetchData();
        if (this.#books.length === 0) return;

        this.#render(false);
        this.#addEventListeners();
        this.#startAutoSlide();
    }

    async #fetchData() {
        try {
            // API: Lấy New Releases, giới hạn 8 cuốn để đủ cho featured và grid
            const response = await fetch("http://localhost:8080/api/v1/books?type=new&size=8");
            if (!response.ok) throw new Error('Failed to fetch new books');

            const data = await response.json();

            // Map dữ liệu từ BookSlimResponse sang cấu trúc FE
            this.#books = data.content.map(book => ({
                id: book.id,
                title: book.name,
                author: book.authorNames,
                img: book.thumbnailUrl,
                rating: book.averageRating,
                reviewCount: book.ratingCount ? book.ratingCount.toLocaleString('en-US') : '0',
                description: "Đang cập nhật mô tả..." // Dùng mô tả giả
            }));

        } catch (error) {
            console.error("Error fetching new books:", error);
            this.#books = [];
        }
    }

    #render(withFade = true) {
        if (this.#books.length === 0) {
            this.#featuredContainer.innerHTML = '<p>Không có sách mới.</p>';
            this.#listContainer.innerHTML = '';
            return;
        }

        const featuredBook = this.#books[this.#currentIndex];
        // Chỉ lấy 3 cuốn đầu tiên của danh sách CÒN LẠI để hiển thị trong grid nhỏ
        const otherBooks = this.#books.filter(book => book.id !== featuredBook.id).slice(0, 3);
        const ratingImgName = this.#getRatingImageName(featuredBook.rating);

        // --- BƯỚC 1: BẮT ĐẦU FADE OUT ---
        if (withFade) {
            this.#featuredContainer.classList.remove('active');
        }

        const delay = withFade ? 300 : 0;

        setTimeout(() => {
            // --- BƯỚC 2: CẬP NHẬT NỘI DUNG HTML MỚI ---
            this.#featuredContainer.innerHTML = `
                <div>
                     <img class="new-book-cover jstoBookDetailPage" src="${featuredBook.img}" alt="${featuredBook.title}" data-book-id='${featuredBook.id}' onerror="this.src='./Images/Book-Covers/default.png'">
                </div>
                <div class="new-book-info">
                    <h3>${featuredBook.title}</h3>
                    <div class="author">By ${featuredBook.author}</div>
                    <div class="rating">
                        <img src="./Images/ratings/${ratingImgName}" alt="Rating ${featuredBook.rating}">
                        <span>(${featuredBook.reviewCount})</span>
                    </div>
                    <div class="description">
                        ${featuredBook.description}
                    </div>
                </div>
            `;

            // Cập nhật danh sách nhỏ bên phải luôn
            this.#listContainer.innerHTML = otherBooks.map(book => `
                <div class="book-cover-small js-small-book jstoBookDetailPage" data-book-id="${book.id}" style="cursor: pointer; transition: all 0.3s ease;">
                    <img src="${book.img}" alt="${book.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 4px;" onerror="this.src='./Images/Book-Covers/default.png'">
                </div>
            `).join('');
            this.#addGridListeners();

            // --- BƯỚC 3: BẮT ĐẦU FADE IN ---
            requestAnimationFrame(() => {
                 this.#featuredContainer.classList.add('active');
            });

        }, delay);
    }

    #getRatingImageName(score) {
        let scoreInt = Math.round(score * 10);
        scoreInt = Math.round(scoreInt / 5) * 5;
        if (scoreInt === 0) return 'rating-0.png';
        if (scoreInt > 50) scoreInt = 50;
        const scoreStr = scoreInt < 10 ? `0${scoreInt}` : `${scoreInt}`;
        return `rating-${scoreStr}.png`;
    }

    #addGridListeners() {
        // Sự kiện click vào sách nhỏ để chuyển thành featured
        const smallBooks = this.#listContainer.querySelectorAll('.js-small-book');
        smallBooks.forEach(el => {
            el.addEventListener('click', () => {
                const bookId = el.dataset.bookId;
                const newIndex = this.#books.findIndex(b => b.id == bookId);
                if (newIndex !== -1) {
                    this.#handleSwap(newIndex);
                }
            });
        });
    }

    #handleSwap(index) {
        if (index === this.#currentIndex) return;
        this.#currentIndex = index;
        this.#resetAutoSlide();
        this.#render(true);
    }

    #addEventListeners() {
        const section = document.querySelector('.new-books-section');
        if(section) {
            section.addEventListener('mouseenter', () => this.#stopAutoSlide());
            section.addEventListener('mouseleave', () => this.#startAutoSlide());
        }
    }

    next() {
        this.#currentIndex = (this.#currentIndex + 1) % this.#books.length;
        this.#render(true);
    }

    #startAutoSlide() {
        if (this.#autoSlideInterval) clearInterval(this.#autoSlideInterval);
        this.#autoSlideInterval = setInterval(() => {
            this.next();
        }, this.#slideDuration);
    }

    #stopAutoSlide() {
        if (this.#autoSlideInterval) {
            clearInterval(this.#autoSlideInterval);
            this.#autoSlideInterval = null;
        }
    }

    #resetAutoSlide() {
        this.#stopAutoSlide();
        this.#startAutoSlide();
    }
}