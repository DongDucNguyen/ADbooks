export class AddRatingModal {
    #overlay;
    #submitCallback;
    #currentScore = 0; // Lưu số sao người dùng chọn

    constructor(submitCallback) {
        this.#submitCallback = submitCallback;
        this.#render();
        this.#attachEvents();
    }

    #render() {
        this.#overlay = document.createElement('div');
        this.#overlay.className = 'rating-modal-overlay';
        
        this.#overlay.innerHTML = `
            <div class="rating-modal-content">
                <button class="close-modal-btn">&times;</button>
                <div class="rating-modal-header">Viết đánh giá của bạn</div>
                
                <div class="star-input-group">
                    <i class="fa-solid fa-star" data-value="1"></i>
                    <i class="fa-solid fa-star" data-value="2"></i>
                    <i class="fa-solid fa-star" data-value="3"></i>
                    <i class="fa-solid fa-star" data-value="4"></i>
                    <i class="fa-solid fa-star" data-value="5"></i>
                </div>

                <div class="rating-form-group">
                    <input type="text" id="review-title" class="rating-input" placeholder="Tiêu đề (VD: Tuyệt phẩm!)">
                </div>
                <div class="rating-form-group">
                    <textarea id="review-content" class="rating-input" placeholder="Chia sẻ cảm nhận của bạn về cuốn sách..."></textarea>
                </div>

                <div class="rating-modal-actions">
                    <button class="modal-btn btn-cancel js-cancel">Hủy</button>
                    <button class="modal-btn btn-submit js-submit">Gửi đánh giá</button>
                </div>
            </div>
        `;
        document.body.appendChild(this.#overlay);
    }

    #attachEvents() {
        // 1. Xử lý click chọn sao
        const stars = this.#overlay.querySelectorAll('.star-input-group i');
        stars.forEach(star => {
            star.addEventListener('click', (e) => {
                const value = parseInt(e.target.dataset.value);
                this.#currentScore = value;
                this.#updateStarVisuals(stars, value);
            });
            
            // (Tuỳ chọn) Hover hiệu ứng
            star.addEventListener('mouseover', (e) => {
                 const value = parseInt(e.target.dataset.value);
                 this.#updateStarVisuals(stars, value);
            });
        });

        // Reset sao khi chuột rời khỏi vùng chọn (trở về điểm đã click)
        const starGroup = this.#overlay.querySelector('.star-input-group');
        starGroup.addEventListener('mouseleave', () => {
            this.#updateStarVisuals(stars, this.#currentScore);
        });

        // 2. Nút đóng / Hủy
        const closeBtns = this.#overlay.querySelectorAll('.close-modal-btn, .js-cancel');
        closeBtns.forEach(btn => btn.addEventListener('click', () => this.close()));

        this.#overlay.addEventListener('click', (e) => {
            if (e.target === this.#overlay) this.close();
        });

        // 3. Nút Gửi
        const submitBtn = this.#overlay.querySelector('.js-submit');
        submitBtn.addEventListener('click', () => {
            this.#handleSubmit();
        });
    }

    // Hàm tô màu sao
    #updateStarVisuals(stars, value) {
        stars.forEach(star => {
            const starValue = parseInt(star.dataset.value);
            if (starValue <= value) {
                star.classList.add('active'); // Vàng
            } else {
                star.classList.remove('active'); // Xám
            }
        });
    }

    #handleSubmit() {
        const title = this.#overlay.querySelector('#review-title').value;
        const content = this.#overlay.querySelector('#review-content').value;

        if (this.#currentScore === 0) {
            alert("Vui lòng chạm vào sao để chấm điểm!");
            return;
        }

        if (!title || !content) {
            alert("Vui lòng nhập đầy đủ tiêu đề và nội dung!");
            return;
        }

        // Tạo object dữ liệu mới
        const newReview = {
            id: Date.now(), // ID giả lập
            name: "Bạn (Mới)", // Tên người dùng hiện tại
            date: new Date().toLocaleDateString('vi-VN'), // Ngày hiện tại
            score: this.#currentScore,
            title: title,
            content: content
        };

        // Gửi dữ liệu về class cha
        this.#submitCallback(newReview);
        this.close();
        
        // Reset form
        this.#overlay.querySelector('#review-title').value = '';
        this.#overlay.querySelector('#review-content').value = '';
        this.#currentScore = 0;
        this.#updateStarVisuals(this.#overlay.querySelectorAll('.star-input-group i'), 0);
    }

    show() {
        this.#overlay.classList.add('active');
    }

    close() {
        this.#overlay.classList.remove('active');
    }
}