export class QuoteBanner {
    #quotes;
    #currentIndex;
    #bannerEl;
    #interval;
    #duration;

    constructor(quotes) {
        this.#quotes = quotes;
        this.#currentIndex = 0;
        this.#duration = 7000; // 7 giây
        this.#interval = null;

        // Select DOM element
        this.#bannerEl = document.querySelector('.sponsor-banner');

        if (this.#bannerEl) {
            this.init();
        } else {
            console.warn('QuoteBanner: Không tìm thấy .sponsor-banner');
        }
    }

    init() {
        // Thiết lập CSS transition bằng JS để đảm bảo hiệu ứng mượt mà
        this.#bannerEl.style.transition = "opacity 0.5s ease-in-out";
        this.#bannerEl.style.opacity = "1";
        
        // Render lần đầu
        this.#render(false);
        
        // Bắt đầu chạy tự động
        this.#startAutoSlide();
    }

    #render(withFade = true) {
        const currentQuote = this.#quotes[this.#currentIndex];

        if (withFade) {
            // 1. Fade Out
            this.#bannerEl.style.opacity = "0";

            // 2. Đợi 500ms (khớp với transition) rồi đổi nội dung
            setTimeout(() => {
                this.#updateContent(currentQuote);
                // 3. Fade In
                this.#bannerEl.style.opacity = "1";
            }, 500);
        } else {
            // Lần đầu không cần fade
            this.#updateContent(currentQuote);
        }
    }

    #updateContent(quoteData) {
        this.#bannerEl.innerHTML = `
            <p>"${quoteData.text}"</p> 
            <div>- ${quoteData.author} -</div> 
        `;
    }

    #next() {
        this.#currentIndex = (this.#currentIndex + 1) % this.#quotes.length;
        this.#render(true);
    }

    #startAutoSlide() {
        // Đảm bảo xóa interval cũ nếu có
        if (this.#interval) clearInterval(this.#interval);
        
        this.#interval = setInterval(() => {
            this.#next();
        }, this.#duration);
    }
}