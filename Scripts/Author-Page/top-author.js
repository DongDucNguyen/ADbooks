export class TopAuthorSlider {
    // 1. Khai báo thuộc tính Private
    #authors;
    #currentIndex;
    #autoSlideInterval;
    #slideDuration;

    // DOM Elements
    #containerEl;   // Chứa Info, Photo, Books
    #nameEl;        // Tên tác giả nằm riêng bên dưới
    #dotsContainer; // Container chứa các chấm tròn

    constructor(authors) {
        this.#authors = authors;
        this.#currentIndex = 0;
        this.#slideDuration = 5000; // 5 giây
        this.#autoSlideInterval = null;

        // Select DOM Elements dựa trên HTML bạn cung cấp
        this.#containerEl = document.querySelector('.author-container');
        this.#nameEl = document.querySelector('.author-name');
        this.#dotsContainer = document.querySelector('.dots');

        if (this.#containerEl && this.#nameEl && this.#dotsContainer) {
            this.init();
        } else {
            console.warn('TopAuthorSlider: Thiếu DOM required (.author-container, .author-name, hoặc .dots)');
        }
    }

    init() {
        this.#renderDots();     // Tạo các chấm tròn dựa trên số lượng tác giả
        this.#render(false);    // Render lần đầu không cần fade
        this.#startAutoSlide(); // Bắt đầu đếm ngược
    }

    // Private: Tạo chấm tròn động
    #renderDots() {
        this.#dotsContainer.innerHTML = this.#authors.map((_, index) => {
            return `<span class="dot" data-index="${index}"></span>`;
        }).join('');

        // Add sự kiện click cho từng chấm
        const dots = this.#dotsContainer.querySelectorAll('.dot');
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.dataset.index);
                this.#handleDotClick(index);
            });
        });
    }

    // Private: Xử lý khi click vào chấm
    #handleDotClick(index) {
        if (index === this.#currentIndex) return;
        this.#currentIndex = index;
        this.#resetAutoSlide(); // Reset lại timer 5s
        this.#render(true);     // Render có hiệu ứng fade
    }

    // Private: Hàm render chính
    #render(withFade = true) {
        const author = this.#authors[this.#currentIndex];

        // 1. Cập nhật trạng thái active cho các chấm (Dots)
        const dots = this.#dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === this.#currentIndex);
        });

        // 2. Xử lý hiệu ứng Fade
        if (withFade) {
            // Thêm class để CSS xử lý opacity về 0
            this.#containerEl.style.opacity = '0';
            this.#nameEl.style.opacity = '0';
            this.#containerEl.style.transition = 'opacity 0.3s ease';
            this.#nameEl.style.transition = 'opacity 0.3s ease';
        }

        const delay = withFade ? 300 : 0;

        setTimeout(() => {
            // 3. Cập nhật nội dung HTML
            this.#updateContent(author);

            // 4. Fade In trở lại
            if (withFade) {
                requestAnimationFrame(() => {
                    this.#containerEl.style.opacity = '1';
                    this.#nameEl.style.opacity = '1';
                });
            }
        }, delay);
    }

    // Helper: Cập nhật HTML bên trong các container
    #updateContent(author) {
        // Cập nhật Tên
        this.#nameEl.textContent = author.name;

        // Cập nhật cấu trúc bên trong .author-container
        // Lưu ý: Giữ nguyên cấu trúc HTML gốc để CSS hoạt động đúng
        this.#containerEl.innerHTML = `
            <div class="author-info">
                <p><strong>Ngày Sinh:</strong> ${author.birthDate}</p>
                <p><strong>Mô Tả:</strong></p>
                <div class="desc-lines">${author.description}</div>
            </div>

            <div class="author-photo jstoAuthorPage">
                <img src="${author.img}"  class="jstoAuthorPage">
            </div>

            <div class="author-books">
                ${author.books.map(bookImg => `<img src="${bookImg.img}" alt="Book Cover" data-book-id="${bookImg.id}" class="jstoBookDetailPage">`).join('')}
            </div>
        `;
    }

    // Logic Auto Slide
    next() {
        this.#currentIndex = (this.#currentIndex + 1) % this.#authors.length;
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