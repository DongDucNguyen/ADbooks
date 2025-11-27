export class HeroSlider {
    // 1. Khai báo các thuộc tính Private (bắt buộc phải khai báo ở đầu class)
    #banners;
    #currentIndex;
    #autoSlideInterval;
    #slideDuration;
    
    // Các DOM elements cũng nên là private
    #contentEl;
    #imageEl;
    #arrows;

    constructor(banners) {
        // Gán giá trị cho thuộc tính private
        this.#banners = banners;
        this.#currentIndex = 0;
        this.#autoSlideInterval = null;
        this.#slideDuration = 5000;

        this.#contentEl = document.querySelector('.js-hero-content');
        this.#imageEl = document.querySelector('.js-hero-image');
        this.#arrows = document.querySelectorAll('.hero-section .arrow');

        if (this.#contentEl && this.#imageEl) {
            this.init();
        }
    }

    // Public method: Phương thức này cần public để bên ngoài gọi được
    init() {
        this.#addEventListeners();
        this.#render(false);

        setTimeout(() => {
            this.#contentEl.classList.add('active');
            this.#imageEl.classList.add('active');
        }, 100);

        this.#startAutoSlide();
    }

    // Private method: Chỉ dùng nội bộ trong class, bên ngoài không cần biết
    #addEventListeners() {
        if (this.#arrows[0]) {
            this.#arrows[0].addEventListener('click', () => {
                this.prev(); // Public method để người dùng có thể gọi thủ công nếu muốn
                this.#resetAutoSlide();
            });
        }

        if (this.#arrows[1]) {
            this.#arrows[1].addEventListener('click', () => {
                this.next();
                this.#resetAutoSlide();
            });
        }
    }

    // Private method: Logic render là nội bộ
    #render(withFade = true) {
        const banner = this.#banners[this.#currentIndex];

        if (withFade) {
            this.#contentEl.classList.remove('active');
            this.#imageEl.classList.remove('active');
        }

        const delay = withFade ? 300 : 0;

        setTimeout(() => {
            //Ở đây Có 2 phương án để chuyển tới trang specific book nhưng ưu tiên di chuyển bẳng id đưa vào sẵn ở mỗi button và ảnh nhé
            this.#contentEl.innerHTML = `
                <h2>${banner.name}</h2>
                <p>${banner.description}</p>
                <a href="#" class="read-more-btn jstoBookDetailPage" data-book-id="${banner.id}">XEM THÊM &rarr;</div> 
            `;
            
            this.#imageEl.innerHTML = `
                <img src="${banner.img}" class="banner-img jstoBookDetailPage" alt="${banner.name}" data-book-id="${banner.id}">
                <img src="./Images/Background/bg pattern.png" class="banner-bg" alt="pattern">
            `;

            if (withFade) {
                requestAnimationFrame(() => {
                    this.#contentEl.classList.add('active');
                    this.#imageEl.classList.add('active');
                });
            }
        }, delay);
    }

    // Public methods: next/prev có thể để public để các script khác gọi được (ví dụ: swipe gesture)
    next() {
        this.#currentIndex = (this.#currentIndex + 1) % this.#banners.length;
        this.#render();
    }

    prev() {
        this.#currentIndex = (this.#currentIndex - 1 + this.#banners.length) % this.#banners.length;
        this.#render();
    }

    // Private methods: Quản lý auto slide là việc nội bộ
    #startAutoSlide() {
        this.#autoSlideInterval = setInterval(() => this.next(), this.#slideDuration);
    }

    #stopAutoSlide() {
        clearInterval(this.#autoSlideInterval);
    }

    #resetAutoSlide() {
        this.#stopAutoSlide();
        this.#startAutoSlide();
    }
}