// Scripts/Reading/Reading-Detail/reading-controls.js
export class ReadingControls {
    #favBtn;
    #autoScrollBtn;
    #fullScreenBtn;
    #pdfViewerInstance;
    #isAutoScrollActive;
    #isFavorite; // [NEW] Biến lưu trạng thái nội bộ

    /**
     * @param {Object} pdfViewerInstance 
     * @param {boolean} isFavorite - Trạng thái yêu thích ban đầu (true/false)
     */
    constructor(pdfViewerInstance, isFavorite = false) {
        this.#pdfViewerInstance = pdfViewerInstance;
        this.#isFavorite = isFavorite; // [NEW] Lưu trạng thái đầu vào

        this.#favBtn = document.querySelector('.js-fav-btn');
        this.#autoScrollBtn = document.querySelector('.js-autoscroll-btn');
        this.#fullScreenBtn = document.querySelector('.js-fullscreen-btn');
        this.#isAutoScrollActive = false;

        this.init();
    }

    init() {
        this.#applyInitialFavoriteState(); // [NEW] Gọi hàm set trạng thái ban đầu
        this.#setupFavorite();
        this.#setupAutoScroll();
        this.#setupFullScreen();
    }

    // [NEW] Hàm cập nhật UI dựa trên dữ liệu đầu vào
    #applyInitialFavoriteState() {
        if (!this.#favBtn) return;
        
        if (this.#isFavorite) {
            this.#favBtn.classList.add('active');
            this.#favBtn.textContent = "Đã thích";
        } else {
            this.#favBtn.classList.remove('active');
            this.#favBtn.textContent = "Yêu thích";
        }
    }

    #setupFavorite() {
        if (!this.#favBtn) return;

        this.#favBtn.addEventListener('click', () => {
            // Đảo ngược trạng thái logic
            this.#isFavorite = !this.#isFavorite;

            // Cập nhật UI
            if (this.#isFavorite) {
                this.#favBtn.classList.add('active');
                this.#favBtn.textContent = "Đã thích";
                // TODO: Gọi API lưu 'Like' vào database tại đây
                console.log("User action: Liked book");
            } else {
                this.#favBtn.classList.remove('active');
                this.#favBtn.textContent = "Yêu thích";
                // TODO: Gọi API xóa 'Like'
                console.log("User action: Unliked book");
            }
        });
    }

    #setupAutoScroll() {
        if(!this.#autoScrollBtn || !this.#pdfViewerInstance) return;

        this.#autoScrollBtn.addEventListener('click', () => {
            this.#isAutoScrollActive = !this.#isAutoScrollActive;
            this.#autoScrollBtn.classList.toggle('active');

            if (this.#isAutoScrollActive) {
                this.#pdfViewerInstance.startAutoScroll();
            } else {
                this.#pdfViewerInstance.stopAutoScroll();
            }
        });
    }

    #setupFullScreen() {
        if(!this.#fullScreenBtn || !this.#pdfViewerInstance) return;

        this.#fullScreenBtn.addEventListener('click', () => {
            // Gọi method toggleFullScreen của PDF Viewer và truyền nút bấm vào để nó đổi text
            this.#pdfViewerInstance.toggleFullScreen(this.#fullScreenBtn);
        });
    }
}