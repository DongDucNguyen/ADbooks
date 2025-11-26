export class ChangePasswordModal {
    #overlay;
    #form;

    constructor() {
        this.#render();
        this.#attachEvents();
    }

    #render() {
        this.#overlay = document.createElement('div');
        this.#overlay.className = 'modal-overlay';
        this.#overlay.innerHTML = `
            <div class="modal-content">
                <button type="button" class="close-modal-btn js-close">&times;</button>
                <div class="modal-header">Đổi mật khẩu</div>
                <p class="password-note">Mật khẩu mới phải có ít nhất 6 ký tự, bao gồm chữ và số.</p>

                <form id="change-pass-form" class="edit-form-grid" style="grid-template-columns: 1fr;">
                    <div class="form-group">
                        <label>Mật khẩu hiện tại <span class="text-red">*</span></label>
                        <input type="password" name="currentPassword" class="form-input" required autocomplete="current-password" />
                    </div>
                    <div class="form-group">
                        <label>Mật khẩu mới <span class="text-red">*</span></label>
                        <input type="password" name="newPassword" class="form-input" required autocomplete="new-password" />
                    </div>
                    <div class="form-group">
                        <label>Nhập lại mật khẩu mới <span class="text-red">*</span></label>
                        <input type="password" name="confirmPassword" class="form-input" required autocomplete="new-password" />
                    </div>
                </form>

                <div class="modal-actions">
                    <button type="button" class="btn btn-cancel js-close">Hủy</button>
                    <button type="button" class="btn btn-save js-save-pass">Lưu thay đổi</button>
                </div>
            </div>
        `;
        document.body.appendChild(this.#overlay);
        this.#form = this.#overlay.querySelector('#change-pass-form');
    }

    #attachEvents() {
        // Đóng modal
        this.#overlay.querySelectorAll('.js-close').forEach(btn => {
            btn.addEventListener('click', () => this.close());
        });

        this.#overlay.addEventListener('click', (e) => {
            if (e.target === this.#overlay) this.close();
        });

        // Nút Lưu
        this.#overlay.querySelector('.js-save-pass').addEventListener('click', () => {
            this.#handleSave();
        });

        // Nhấn Enter cũng submit
        this.#form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.#handleSave();
        });
    }

    #handleSave() {
        const formData = new FormData(this.#form);
        const currentPassword = (formData.get('currentPassword') || '').trim();
        const newPassword = (formData.get('newPassword') || '').trim();
        const confirmPassword = (formData.get('confirmPassword') || '').trim();

        this.#clearErrors();

        // 1. Kiểm tra để trống
        if (!currentPassword || !newPassword || !confirmPassword) {
            return this.#showError('Vui lòng điền đầy đủ các trường!');
        }

        // 2. Độ dài mật khẩu mới
        if (newPassword.length < 6) {
            return this.#showError('Mật khẩu mới phải có ít nhất 6 ký tự!');
        }

        // 3. Mật khẩu mới và xác nhận phải giống nhau
        if (newPassword !== confirmPassword) {
            return this.#showError('Mật khẩu xác nhận không khớp!');
        }

        // 4. Không được trùng mật khẩu cũ
        if (newPassword === currentPassword) {
            return this.#showError('Mật khẩu mới không được trùng với mật khẩu cũ!');
        }

        // 5. Lấy user từ localStorage
        const userData = JSON.parse(localStorage.getItem('userLogin'));
        if (!userData) {
            alert('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
            window.location.href = '/Login.html';
            return;
        }

        // 6. Kiểm tra mật khẩu hiện tại (plain text)
        if (userData.encryptedPassword !== currentPassword) {
            return this.#showError('Mật khẩu hiện tại không đúng!');
        }

        // Cập nhật mật khẩu mới
        userData.encryptedPassword = newPassword;
        localStorage.setItem('userLogin', JSON.stringify(userData));

        alert('Đổi mật khẩu thành công! Bạn sẽ được đăng xuất để bảo mật.');
        this.close();

        // Buộc đăng xuất
        setTimeout(() => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userLogin');
            window.location.href = '/Login.html';
        }, 1000);
    }

    #showError(message) {
        alert('Lỗi: ' + message);
    }

    #clearErrors() {
        // Xóa lỗi cũ nếu có
    }

    show() {
        this.#overlay.classList.add('active');
        setTimeout(() => {
            this.#form.querySelector('[name="currentPassword"]').focus();
        }, 100);
    }

    close() {
        this.#overlay.classList.remove('active');
        this.#form.reset();
        this.#clearErrors();
    }
}


// sau khi có api
// async #handleSave() {
//     const formData = new FormData(this.#form);
//     const currentPassword = (formData.get('currentPassword') || '').trim();
//     const newPassword = (formData.get('newPassword') || '').trim();
//     const confirmPassword = (formData.get('confirmPassword') || '').trim();

//     this.#clearErrors();

//     // Kiểm tra cơ bản
//     if (!currentPassword || !newPassword || !confirmPassword) {
//         return this.#showError('Vui lòng điền đầy đủ các trường!');
//     }
//     if (newPassword.length < 6) {
//         return this.#showError('Mật khẩu mới phải có ít nhất 6 ký tự!');
//     }
//     if (newPassword !== confirmPassword) {
//         return this.#showError('Mật khẩu xác nhận không khớp!');
//     }
//     if (newPassword === currentPassword) {
//         return this.#showError('Mật khẩu mới không được trùng với mật khẩu cũ!');
//     }

//     try {
//         // Gửi POST request lên API
//         const response = await fetch('/api/change-password', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 // nếu cần token: 'Authorization': 'Bearer ' + token
//             },
//             body: JSON.stringify({
//                 currentPassword,
//                 newPassword
//             })
//         });

//         const result = await response.json();

//         if (!response.ok) {
//             // Backend trả về lỗi
//             return this.#showError(result.message || 'Đổi mật khẩu thất bại!');
//         }

//         alert('Đổi mật khẩu thành công! Bạn sẽ được đăng xuất để bảo mật.');
//         this.close();

//         // Buộc đăng xuất
//         setTimeout(() => {
//             localStorage.removeItem('isLoggedIn');
//             localStorage.removeItem('userLogin'); // nếu bạn có lưu
//             window.location.href = '/Login.html';
//         }, 1000);

//     } catch (error) {
//         this.#showError('Có lỗi xảy ra. Vui lòng thử lại!');
//         console.error(error);
//     }
// }
