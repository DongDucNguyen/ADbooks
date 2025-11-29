// Scripts/Reading/Reading-Detail/reading-controls.js
export class ReadingControls {
    #favBtn;
    #autoScrollBtn;
    #fullScreenBtn;
    #pdfViewerInstance;
    #isAutoScrollActive;
    #isFavorite;
    #bookId; // NEW
    #token = localStorage.getItem('token'); // NEW

    /**
     * @param {Object} pdfViewerInstance
     * @param {string} bookId - ID của sách
     * @param {boolean} isFavorite - Trạng thái yêu thích ban đầu (true/false)
     */
    constructor(pdfViewerInstance, bookId, isFavorite = false) {
        this.#pdfViewerInstance = pdfViewerInstance;
        this.#bookId = bookId;
        this.#isFavorite = isFavorite;

        this.#favBtn = document.querySelector('.js-fav-btn');
        this.#autoScrollBtn = document.querySelector('.js-autoscroll-btn');
        this.#fullScreenBtn = document.querySelector('.js-fullscreen-btn');
        this.#isAutoScrollActive = false;

        this.init();
    }

    init() {
        this.#applyInitialFavoriteState();
        this.#setupFavorite();
        this.#setupAutoScroll();
        this.#setupFullScreen();
    }

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

    async #toggleFavorite() {
        if (!this.#token) {
            alert("Vui lòng đăng nhập để sử dụng chức năng này.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/v1/books/${this.#bookId}/favorite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.#token}`
                },
            });
            const data = await response.json();

            if (!response.ok) {
                alert(`Lỗi: ${data.message || 'Không thể cập nhật trạng thái yêu thích.'}`);
                return;
            }

            this.#isFavorite = data.isFavorite;
            this.#applyInitialFavoriteState(); // Sử dụng lại hàm này để update UI
            console.log(data.message);

        } catch (error) {
            console.error("Lỗi gọi API Toggle Favorite:", error);
            alert("Lỗi kết nối. Không thể cập nhật trạng thái yêu thích.");
        }
    }


    #setupFavorite() {
        if (!this.#favBtn) return;

        this.#favBtn.addEventListener('click', () => {
            this.#toggleFavorite();
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
            this.#pdfViewerInstance.toggleFullScreen(this.#fullScreenBtn);
        });
    }
}