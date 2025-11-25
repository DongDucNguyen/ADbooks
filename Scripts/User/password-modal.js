export class ChangePasswordModal {
    #overlay;
    
    constructor() {
        this.#render();
        this.#attachEvents();
    }

    #render() {
        this.#overlay = document.createElement('div');
        this.#overlay.className = 'modal-overlay';
        this.#overlay.innerHTML = `
            <div class="modal-content">
                <button class="close-modal-btn js-close">&times;</button>
                <div class="modal-header">Đổi mật khẩu</div>
                <p class="password-note">Mật khẩu mới phải có ít nhất 6 ký tự.</p>

                <form id="change-pass-form" class="edit-form-grid" style="grid-template-columns: 1fr;">
                    <div class="form-group">
                        <label>Mật khẩu hiện tại</label>
                        <input type="password" class="form-input" placeholder="••••••">
                    </div>
                    <div class="form-group">
                        <label>Mật khẩu mới</label>
                        <input type="password" class="form-input" placeholder="••••••">
                    </div>
                    <div class="form-group">
                        <label>Nhập lại mật khẩu mới</label>
                        <input type="password" class="form-input" placeholder="••••••">
                    </div>
                </form>

                <div class="modal-actions">
                    <button class="btn btn-cancel js-close">Hủy</button>
                    <button class="btn btn-save js-save-pass">Lưu thay đổi</button>
                </div>
            </div>
        `;
        document.body.appendChild(this.#overlay);
    }

    #attachEvents() {
        const closeBtns = this.#overlay.querySelectorAll('.js-close');
        closeBtns.forEach(btn => btn.addEventListener('click', () => this.close()));
        
        this.#overlay.querySelector('.js-save-pass').addEventListener('click', () => {
            alert('Mật khẩu đã được thay đổi!');
            this.close();
        });

        this.#overlay.addEventListener('click', (e) => {
            if (e.target === this.#overlay) this.close();
        });
    }

    show() {
        this.#overlay.classList.add('active');
    }

    close() {
        this.#overlay.classList.remove('active');
    }
}