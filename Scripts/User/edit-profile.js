export class EditProfileModal {
    // Biến static để lưu instance duy nhất
    static #instance = null;

    #userData;
    #overlay;
    #form;
    #triggerBtn;

    constructor(userData) {
        // Nếu đã có instance rồi → trả về luôn instance đó, không tạo mới
        if (EditProfileModal.#instance) {
            return EditProfileModal.#instance;
        }

        // userData phải là object user hiện tại từ localStorage
        this.#userData = userData || {};

        this.#triggerBtn = this.#findTriggerButton(); // Tìm nút "Sửa thông tin"

        if (this.#triggerBtn) {
            this.init();
        } else {
            console.error("Không tìm thấy nút 'Sửa thông tin'");
        }

        // Lưu instance hiện tại để các lần sau tái sử dụng
        EditProfileModal.#instance = this;
    }

    init() {
        this.#render();       // Vẽ modal (chỉ chạy 1 lần)
        this.#attachEvents(); // Gán sự kiện
    }

    // Tìm nút "Sửa thông tin" dựa trên text
    #findTriggerButton() {
        const commands = document.querySelectorAll('.setting-command');
        for (const cmd of commands) {
            if (cmd.textContent.trim() === 'Sửa thông tin') {
                return cmd;
            }
        }
        return null;
    }

    #render() {
        // Nếu đã có overlay rồi (do instance cũ) → không tạo nữa
        const existingOverlay = document.querySelector('.modal-overlay');
        if (existingOverlay) {
            this.#overlay = existingOverlay;
            this.#form = this.#overlay.querySelector('#edit-profile-form');
            return;
        }

        this.#overlay = document.createElement('div');
        this.#overlay.className = 'modal-overlay';

        this.#overlay.innerHTML = `
            <div class="modal-content">
                <button type="button" class="close-modal-btn">&times;</button>
                <div class="modal-header">Cập nhật thông tin</div>

                <form class="edit-form-grid" id="edit-profile-form">
                    <div class="form-group">
                        <label>Họ</label>
                        <input type="text" name="lastname" class="form-input" value="${this.#escapeHtml(this.#userData.lastname || '')}">
                    </div>
                    <div class="form-group">
                        <label>Tên</label>
                        <input type="text" name="firstname" class="form-input" value="${this.#escapeHtml(this.#userData.firstname || '')}">
                    </div>

                    <div class="form-group">
                        <label>Username</label>
                        <input type="text" name="username" class="form-input" value="${this.#escapeHtml(this.#userData.username || '')}" readonly style="background-color: #e9e9e9; cursor: not-allowed;">
                    </div>

                    <div class="form-group">
                        <label>Ngày sinh</label>
                        <input type="date" name="birthday" class="form-input" value="${this.#userData.birthday || ''}">
                    </div>

                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" name="email" class="form-input" value="${this.#escapeHtml(this.#userData.email || '')}">
                    </div>
                    <div class="form-group">
                        <label>Số điện thoại</label>
                        <input type="tel" name="phoneNumber" class="form-input" value="${this.#escapeHtml(this.#userData.phoneNumber || '')}">
                    </div>

                </form>

                <div class="modal-actions">
                    <button type="button" class="btn btn-cancel js-close-modal">Hủy bỏ</button>
                    <button type="button" class="btn btn-save js-save-modal">Lưu thay đổi</button>
                </div>
            </div>
        `;

        document.body.appendChild(this.#overlay);
        this.#form = this.#overlay.querySelector('#edit-profile-form');
    }

    #attachEvents() {
        // Mở modal
        this.#triggerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.#overlay.classList.add('active');
        });

        // Đóng modal: nút X và nút Hủy
        const closeBtns = this.#overlay.querySelectorAll('.close-modal-btn, .js-close-modal');
        closeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.#close();
            });
        });

        // Click ngoài vùng modal → đóng
        this.#overlay.addEventListener('click', (e) => {
            if (e.target === this.#overlay) {
                this.#close();
            }
        });

        // Lưu dữ liệu
        const saveBtn = this.#overlay.querySelector('.js-save-modal');
        saveBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.#saveData();
        });
    }

    #close() {
        this.#overlay.classList.remove('active');
    }

    #saveData() {
        const formData = new FormData(this.#form);
        const data = Object.fromEntries(formData.entries());

        // Cập nhật lại this.#userData
        this.#userData = { ...this.#userData, ...data };

        // Lưu vào localStorage
        localStorage.setItem("userLogin", JSON.stringify(this.#userData));

        console.log("Đã lưu thông tin người dùng:", this.#userData);
        alert("Cập nhật thông tin thành công!");

        this.#close();
    }

    
    #escapeHtml(text) {
        if (typeof text !== 'string') return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

const currentUser = JSON.parse(localStorage.getItem("userLogin"));
if (currentUser) {
    new EditProfileModal(currentUser); 
}

// khi có API
// export class EditProfileModal {
//     static #instance = null;

//     #userData;
//     #overlay;
//     #form;
//     #triggerBtn;

//     constructor(userData) {
//         if (EditProfileModal.#instance) return EditProfileModal.#instance;

//         this.#userData = userData || {};
//         this.#triggerBtn = this.#findTriggerButton();

//         if (this.#triggerBtn) this.init();
//         else console.error("Không tìm thấy nút 'Sửa thông tin'");

//         EditProfileModal.#instance = this;
//     }

//     init() {
//         this.#render();
//         this.#attachEvents();
//     }

//     #findTriggerButton() {
//         const commands = document.querySelectorAll('.setting-command');
//         for (const cmd of commands) {
//             if (cmd.textContent.trim() === 'Sửa thông tin') return cmd;
//         }
//         return null;
//     }

//     #render() {
//         const existingOverlay = document.querySelector('.modal-overlay');
//         if (existingOverlay) {
//             this.#overlay = existingOverlay;
//             this.#form = this.#overlay.querySelector('#edit-profile-form');
//             return;
//         }

//         this.#overlay = document.createElement('div');
//         this.#overlay.className = 'modal-overlay';

//         this.#overlay.innerHTML = `
//             <div class="modal-content">
//                 <button type="button" class="close-modal-btn">&times;</button>
//                 <div class="modal-header">Cập nhật thông tin</div>

//                 <form class="edit-form-grid" id="edit-profile-form">
//                     <div class="form-group">
//                         <label>Họ</label>
//                         <input type="text" name="lastname" class="form-input" value="${this.#escapeHtml(this.#userData.lastname || '')}">
//                     </div>
//                     <div class="form-group">
//                         <label>Tên</label>
//                         <input type="text" name="firstname" class="form-input" value="${this.#escapeHtml(this.#userData.firstname || '')}">
//                     </div>
//                     <div class="form-group">
//                         <label>Username</label>
//                         <input type="text" name="username" class="form-input" value="${this.#escapeHtml(this.#userData.username || '')}" readonly style="background-color: #e9e9e9; cursor: not-allowed;">
//                     </div>
//                     <div class="form-group">
//                         <label>Ngày sinh</label>
//                         <input type="date" name="birthday" class="form-input" value="${this.#userData.birthday || ''}">
//                     </div>
//                     <div class="form-group">
//                         <label>Email</label>
//                         <input type="email" name="email" class="form-input" value="${this.#escapeHtml(this.#userData.email || '')}">
//                     </div>
//                     <div class="form-group">
//                         <label>Số điện thoại</label>
//                         <input type="tel" name="phoneNumber" class="form-input" value="${this.#escapeHtml(this.#userData.phoneNumber || '')}">
//                     </div>
//                 </form>

//                 <div class="modal-actions">
//                     <button type="button" class="btn btn-cancel js-close-modal">Hủy bỏ</button>
//                     <button type="button" class="btn btn-save js-save-modal">Lưu thay đổi</button>
//                 </div>
//             </div>
//         `;

//         document.body.appendChild(this.#overlay);
//         this.#form = this.#overlay.querySelector('#edit-profile-form');
//     }

//     #attachEvents() {
//         this.#triggerBtn.addEventListener('click', (e) => {
//             e.preventDefault();
//             this.#overlay.classList.add('active');
//         });

//         const closeBtns = this.#overlay.querySelectorAll('.close-modal-btn, .js-close-modal');
//         closeBtns.forEach(btn => btn.addEventListener('click', e => {
//             e.preventDefault();
//             this.#close();
//         }));

//         this.#overlay.addEventListener('click', e => {
//             if (e.target === this.#overlay) this.#close();
//         });

//         const saveBtn = this.#overlay.querySelector('.js-save-modal');
//         saveBtn.addEventListener('click', e => {
//             e.preventDefault();
//             this.#saveDataAPI();
//         });
//     }

//     #close() {
//         this.#overlay.classList.remove('active');
//     }

//     async #saveDataAPI() {
//         const formData = new FormData(this.#form);
//         const data = Object.fromEntries(formData.entries());

//         try {
//             const response = await fetch(`http://localhost:8080/api/users/${this.#userData.id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     // 'Authorization': 'Bearer ' + token nếu cần
//                 },
//                 body: JSON.stringify(data)
//             });

//             const result = await response.json();

//             if (!response.ok) {
//                 alert("Cập nhật thất bại: " + (result.message || response.statusText));
//                 return;
//             }

//             // Thành công → cập nhật localStorage
//             this.#userData = { ...this.#userData, ...data };
//             localStorage.setItem("userLogin", JSON.stringify(this.#userData));

//             alert("Cập nhật thông tin thành công!");
//             this.#close();
//         } catch (err) {
//             alert("Lỗi kết nối API: " + err.message);
//         }
//     }

//     #escapeHtml(text) {
//         if (typeof text !== 'string') return '';
//         const div = document.createElement('div');
//         div.textContent = text;
//         return div.innerHTML;
//     }
// }

// // Khởi tạo modal với user hiện tại
// const currentUser = JSON.parse(localStorage.getItem("userLogin"));
// if (currentUser) {
//     new EditProfileModal(currentUser);
// }
