export class EditProfileModal {
    #userData;
    #overlay;
    #form;
    #triggerBtn;

    constructor(userData) {
        this.#userData = userData;
        this.#triggerBtn = this.#findTriggerButton(); // Tìm nút "Sửa thông tin"
        
        if (this.#triggerBtn) {
            this.init();
        } else {
            console.error("Không tìm thấy nút 'Sửa thông tin'");
        }
    }

    init() {
        this.#render(); // Vẽ HTML popup
        this.#attachEvents(); // Gán sự kiện click
    }

    // Hàm tìm nút dựa trên text content vì trong HTML bạn không đặt ID
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
        // Tạo element overlay và nội dung form
        this.#overlay = document.createElement('div');
        this.#overlay.className = 'modal-overlay';
        
        this.#overlay.innerHTML = `
            <div class="modal-content">
                <button class="close-modal-btn">&times;</button>
                <div class="modal-header">Cập nhật thông tin</div>
                
                <form class="edit-form-grid" id="edit-profile-form">
                    <div class="form-group">
                        <label>Họ</label>
                        <input type="text" name="lastname" class="form-input" value="${this.#userData.lastname}">
                    </div>
                    <div class="form-group">
                        <label>Tên</label>
                        <input type="text" name="firstname" class="form-input" value="${this.#userData.firstname}">
                    </div>
                    
                    <div class="form-group">
                        <label>Username</label>
                        <input type="text" name="username" class="form-input" value="${this.#userData.username}" readonly style="background-color: #e9e9e9; cursor: not-allowed;">
                    </div>
                    <div class="form-group">
                        <label>Ngày sinh</label>
                        <input type="date" name="birthday" class="form-input" value="${this.#userData.birthday}">
                    </div>

                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" name="email" class="form-input" value="${this.#userData.email}">
                    </div>
                    <div class="form-group">
                        <label>Số điện thoại</label>
                        <input type="tel" name="phone" class="form-input" value="${this.#userData.phone}">
                    </div>

                    <div class="form-group full-width">
                        <label>Địa chỉ</label>
                        <input type="text" name="address" class="form-input" value="${this.#userData.address}">
                    </div>
                </form>

                <div class="modal-actions">
                    <button class="btn btn-cancel js-close-modal">Hủy bỏ</button>
                    <button class="btn btn-save js-save-modal">Lưu thay đổi</button>
                </div>
            </div>
        `;

        // Thêm vào body
        document.body.appendChild(this.#overlay);
        this.#form = this.#overlay.querySelector('#edit-profile-form');
    }

    #attachEvents() {
        // 1. Mở Modal
        this.#triggerBtn.addEventListener('click', () => {
            this.#overlay.classList.add('active');
        });

        // 2. Đóng Modal (Nút X, Nút Hủy, Click ra ngoài)
        const closeBtns = this.#overlay.querySelectorAll('.close-modal-btn, .js-close-modal');
        closeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.#close();
            });
        });

        // Click vào vùng đen mờ thì đóng
        this.#overlay.addEventListener('click', (e) => {
            if (e.target === this.#overlay) {
                this.#close();
            }
        });

        // 3. Lưu thông tin
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
        // Lấy dữ liệu từ form (Mock logic)
        const formData = new FormData(this.#form);
        const data = Object.fromEntries(formData.entries());
        
        console.log("Dữ liệu đã lưu:", data);
        alert("Cập nhật thông tin thành công!");
        
        // Cập nhật lại dữ liệu nội bộ (nếu cần)
        this.#userData = { ...this.#userData, ...data };
        
        this.#close();
    }
}