export class NewBooksSection {
    #books;
    #currentIndex;
    #autoSlideInterval;
    #slideDuration;
    #featuredContainer;
    #listContainer;

    constructor(books) {
        this.#books = books;
        this.#currentIndex = 0;
        this.#autoSlideInterval = null;
        this.#slideDuration = 5000;

        this.#featuredContainer = document.querySelector('.new-book-card');
        this.#listContainer = document.querySelector('.new-books-grid');

        if (this.#featuredContainer && this.#listContainer) {
            this.init();
        } else {
            console.warn('NewBooksSection: Thiếu DOM required');
        }
    }

    init() {
        // Lần render đầu tiên không cần chờ delay fade-out
        this.#render(false);
        this.#addEventListeners();
        this.#startAutoSlide();
    }

    #render(withFade = true) {
        const featuredBook = this.#books[this.#currentIndex];
        const otherBooks = this.#books.map((book, index) => ({ ...book, originalIndex: index }))
                                      .filter(book => book.originalIndex !== this.#currentIndex);
        const ratingImgName = this.#getRatingImageName(featuredBook.rating);

        // --- BƯỚC 1: BẮT ĐẦU FADE OUT ---
        if (withFade) {
            // Loại bỏ class 'active' để kích hoạt CSS transition fade-out
            this.#featuredContainer.classList.remove('active');
        }

        // Thời gian chờ fade-out hoàn tất (nên khớp với CSS transition, v.d. 300ms)
        // Nếu là lần render đầu (withFade=false) thì không cần chờ.
        const delay = withFade ? 300 : 0;

        setTimeout(() => {
            // --- BƯỚC 2: CẬP NHẬT NỘI DUNG HTML MỚI ---
            this.#featuredContainer.innerHTML = `
                <div>
                     <img class="new-book-cover jstoBookDetailPage" src="${featuredBook.img}" alt="${featuredBook.title}" data-book-id='${featuredBook.id}'>
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
                <div class="book-cover-small js-small-book" data-index="${book.originalIndex}" style="cursor: pointer; transition: all 0.3s ease;">
                    <img src="${book.img}" alt="${book.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 4px;">
                </div>
            `).join('');
            this.#addGridListeners();

            // --- BƯỚC 3: BẮT ĐẦU FADE IN ---
            // Sử dụng requestAnimationFrame để đảm bảo browser đã nhận biết nội dung mới trước khi thêm class
            requestAnimationFrame(() => {
                 this.#featuredContainer.classList.add('active');
            });

        }, delay);
    }

    #getRatingImageName(score) {
        let scoreInt = Math.round(score * 10);
        scoreInt = Math.round(scoreInt / 5) * 5;
        if (scoreInt === 0) return 'rating-0.png';
        const scoreStr = scoreInt < 10 ? `0${scoreInt}` : `${scoreInt}`;
        return `rating-${scoreStr}.png`;
    }

    #addGridListeners() {
        const smallBooks = this.#listContainer.querySelectorAll('.js-small-book');
        smallBooks.forEach(el => {
            el.addEventListener('click', () => {
                const newIndex = parseInt(el.dataset.index);
                this.#handleSwap(newIndex);
            });
        });
    }

    #handleSwap(index) {
        if (index === this.#currentIndex) return; // Không làm gì nếu click vào sách đang hiển thị
        this.#currentIndex = index;
        this.#resetAutoSlide();
        this.#render(true); // Gọi render với hiệu ứng fade
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