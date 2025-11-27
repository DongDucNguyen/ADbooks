export class ReadingPdfViewer {
    #container;
    #pdfWrapper;
    #audioEl;
    #autoScrollInterval;
    #scrollAccumulator;

    /**
     * @param {string} audioElementId - ID của thẻ audio để đồng bộ tốc độ cuộn
     */
    constructor(audioElementId) {
        this.#container = document.getElementById('pdf-viewer-container');
        this.#pdfWrapper = document.querySelector('.js-pdf-wrapper');
        this.#audioEl = document.getElementById(audioElementId);
        
        this.#autoScrollInterval = null;
        this.#scrollAccumulator = 0; // Biến tích lũy pixel lẻ khi cuộn chậm
    }

    /**
     * Public Method: Bắt đầu tải và hiển thị PDF
     * @param {string} url - Đường dẫn file PDF
     */
    loadPdf(url) {
        if (this.#container && this.#pdfWrapper) {
            this.#renderPdfProcess(url);
            this.#setupFullscreenEvents();
        } else {
            console.error('ReadingPdfViewer: Không tìm thấy DOM Container');
        }
    }

    /**
     * Public Method: Bật chế độ tự động cuộn
     */
    startAutoScroll() {
        this.stopAutoScroll(); // Clear interval cũ nếu có để tránh trùng lặp
        // Cập nhật mỗi 50ms (~20fps) để mượt mà nhưng không nặng máy
        this.#autoScrollInterval = setInterval(() => this.#performScrollStep(), 50);
    }

    /**
     * Public Method: Tắt chế độ tự động cuộn
     */
    stopAutoScroll() {
        if (this.#autoScrollInterval) {
            clearInterval(this.#autoScrollInterval);
            this.#autoScrollInterval = null;
        }
    }

    /**
     * Public Method: Bật/Tắt toàn màn hình
     * @param {HTMLElement} btnElement - Nút bấm kích hoạt (để đổi text hiển thị nếu cần)
     */
    toggleFullScreen(btnElement) {
        if (!this.#pdfWrapper) return;

        const isFullscreen = this.#pdfWrapper.classList.contains('fullscreen-active');

        if (!isFullscreen) {
            // Active Fullscreen
            this.#pdfWrapper.classList.add('fullscreen-active');
            if (btnElement) {
                btnElement.textContent = "Thoát";
                btnElement.classList.add('active');
            }
            this.#showFloatingExitButton(btnElement);
        } else {
            // Exit Fullscreen
            this.#pdfWrapper.classList.remove('fullscreen-active');
            if (btnElement) {
                btnElement.textContent = "Toàn màn hình";
                btnElement.classList.remove('active');
            }
            this.#hideFloatingExitButton();
        }
    }

    // ============================================================
    // PRIVATE METHODS (XỬ LÝ LOGIC NỘI BỘ)
    // ============================================================

    async #renderPdfProcess(url) {
        // Xóa nội dung cũ (loading hoặc lỗi cũ)
        this.#container.innerHTML = ''; 

        try {
            if (typeof pdfjsLib === 'undefined') {
                throw new Error("Thư viện PDF.js chưa được tải.");
            }

            const loadingTask = pdfjsLib.getDocument(url);
            const pdf = await loadingTask.promise;
            
            // Loop qua từng trang để render
            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                
                // Tính toán scale để trang PDF vừa khít với container
                // Trừ 40px cho padding/margin
                const baseWidth = this.#pdfWrapper.clientWidth - 40; 
                const viewportRaw = page.getViewport({ scale: 1.0 });
                
                let scale = baseWidth / viewportRaw.width;
                // Giới hạn scale max để tránh vỡ hình trên màn hình quá lớn
                if (scale > 2.5) scale = 2.5; 

                const viewport = page.getViewport({ scale: scale });

                // Tạo Canvas
                const canvas = document.createElement('canvas');
                canvas.className = 'pdf-page-canvas';
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                
                const context = canvas.getContext('2d');
                this.#container.appendChild(canvas);

                // Render trang lên Canvas
                await page.render({
                    canvasContext: context,
                    viewport: viewport
                }).promise;
            }

        } catch (error) {
            console.error('PDF Error:', error);
            this.#container.innerHTML = `
                <div style="padding: 20px; color: #ff6b6b; text-align: center;">
                    <p>Không thể tải nội dung sách.</p>
                    <small>${error.message}</small>
                </div>
            `;
        }
    }

    #performScrollStep() {
        // Nếu không có audio hoặc đang pause thì không cuộn
        if (!this.#audioEl || this.#audioEl.paused) return;

        const currentRate = this.#audioEl.playbackRate || 1.0;
        const baseSpeed = 0.8; // Tốc độ cơ bản (pixel per tick)
        
        // Tốc độ cuộn tỉ lệ thuận với tốc độ đọc
        const step = baseSpeed * currentRate;

        this.#scrollAccumulator += step;

        // Chỉ cuộn khi tích lũy đủ ít nhất 1 pixel (vì pixel phải là số nguyên)
        if (this.#scrollAccumulator >= 1) {
            const pixelsToScroll = Math.floor(this.#scrollAccumulator);
            
            this.#pdfWrapper.scrollBy({
                top: pixelsToScroll,
                behavior: 'auto' // 'auto' để mượt hơn trong setInterval so với 'smooth'
            });

            this.#scrollAccumulator -= pixelsToScroll;
        }
    }

    #setupFullscreenEvents() {
        // Lắng nghe phím ESC để thoát toàn màn hình
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.#pdfWrapper.classList.contains('fullscreen-active')) {
                // Tìm nút fullscreen chính trên giao diện để reset trạng thái của nó
                const mainBtn = document.querySelector('.js-fullscreen-btn');
                this.toggleFullScreen(mainBtn);
            }
        });
    }

    #showFloatingExitButton(linkedMainBtn) {
        // Kiểm tra xem nút floating đã có chưa, nếu chưa thì tạo mới
        let exitBtn = document.querySelector('.exit-fullscreen-btn');
        
        if (!exitBtn) {
            exitBtn = document.createElement('button');
            exitBtn.className = 'exit-fullscreen-btn';
            exitBtn.innerHTML = '<i class="fa-solid fa-xmark"></i> Đóng';
            document.body.appendChild(exitBtn);

            // Gán sự kiện click cho nút floating này
            exitBtn.addEventListener('click', () => {
                this.toggleFullScreen(linkedMainBtn);
            });
        }

        // Thêm class để hiển thị hiệu ứng fade-in
        setTimeout(() => exitBtn.classList.add('show'), 100);
    }

    #hideFloatingExitButton() {
        const exitBtn = document.querySelector('.exit-fullscreen-btn');
        if (exitBtn) {
            exitBtn.classList.remove('show');
            // Có thể remove khỏi DOM sau khi animation xong nếu muốn tối ưu
        }
    }
}