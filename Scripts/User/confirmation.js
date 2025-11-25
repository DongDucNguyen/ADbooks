export class ConfirmationModal {
    #overlay;
    #messageElement;
    #confirmBtn;
    #cancelBtn;
    #currentConfirmCallback; // Lưu hành động cần thực hiện khi bấm "Có"

    constructor() {
        this.#render();
        this.#attachEvents();
    }

    #render() {
        this.#overlay = document.createElement('div');
        this.#overlay.className = 'modal-overlay';
        
        this.#overlay.innerHTML = `
            <div class="modal-content confirmation-type">
                <div class="modal-header">Xác nhận</div>
                <div class="modal-message js-message">Nội dung câu hỏi...</div>
                
                <div class="modal-actions" style="justify-content: center;">
                    <button class="btn btn-cancel js-cancel">Không</button>
                    <button class="btn btn-danger js-confirm">Có, tôi chắc chắn</button>
                </div>
            </div>
        `;
        document.body.appendChild(this.#overlay);

        // Cache elements
        this.#messageElement = this.#overlay.querySelector('.js-message');
        this.#confirmBtn = this.#overlay.querySelector('.js-confirm');
        this.#cancelBtn = this.#overlay.querySelector('.js-cancel');
    }

    #attachEvents() {
        // Nút Không
        this.#cancelBtn.addEventListener('click', () => this.close());
        
        // Nút Có
        this.#confirmBtn.addEventListener('click', () => {
            if (this.#currentConfirmCallback) {
                this.#currentConfirmCallback(); // Thực hiện hành động được gửi tới
            }
            this.close();
        });

        // Click ra ngoài để đóng
        this.#overlay.addEventListener('click', (e) => {
            if (e.target === this.#overlay) this.close();
        });
    }

    // Phương thức mở Modal
    // message: Câu hỏi (VD: Bạn có chắc muốn xóa?)
    // onConfirm: Hàm sẽ chạy nếu chọn Có
    show(message, onConfirm) {
        this.#messageElement.textContent = message;
        this.#currentConfirmCallback = onConfirm;
        this.#overlay.classList.add('active');
    }

    close() {
        this.#overlay.classList.remove('active');
        this.#currentConfirmCallback = null; // Reset callback
    }
}