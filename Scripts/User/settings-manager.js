import { ConfirmationModal } from './confirmation.js';
import { ChangePasswordModal } from './password-modal.js';

export class SettingsManager {
    #confirmModal;
    #passwordModal;

    constructor() {
        // Khởi tạo sẵn 2 loại modal
        this.#confirmModal = new ConfirmationModal();
        this.#passwordModal = new ChangePasswordModal();
        
        this.init();
    }

    init() {
        // Lấy tất cả các nút lệnh
        const commands = document.querySelectorAll('.setting-command');
        
        commands.forEach(cmd => {
            const text = cmd.textContent.trim();
            
            // Gán sự kiện dựa trên nội dung text
            cmd.addEventListener('click', () => {
                this.#handleCommand(text);
            });
        });
    }

    #handleCommand(commandText) {
        switch (commandText) {
            case 'Đăng xuất':
                this.#confirmModal.show(
                    'Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?', 
                    () => {
                        alert('Đang đăng xuất...');
                        window.location.href = './Login.html'; // Chuyển về trang login
                    }
                );
                break;

            case 'Xóa lịch sử':
                this.#confirmModal.show(
                    'Toàn bộ lịch sử đọc sách sẽ bị xóa vĩnh viễn. Bạn có chắc chắn?', 
                    () => {
                        console.log('Đã xóa lịch sử');
                        alert('Lịch sử đã được xóa sạch!');
                        // Logic xóa UI hoặc reload trang ở đây
                    }
                );
                break;

            case 'Xóa tài khoản':
                this.#confirmModal.show(
                    'CẢNH BÁO: Hành động này không thể hoàn tác. Mọi dữ liệu sẽ bị mất. Bạn có chắc chắn muốn xóa tài khoản?', 
                    () => {
                        console.log('Đã xóa tài khoản');
                        alert('Tài khoản đã bị xóa. Tạm biệt!');
                        window.location.href = './Explore-Page.html';
                    }
                );
                break;

            case 'Đổi mật khẩu':
                this.#passwordModal.show();
                break;

            case 'Sửa thông tin':
                // Mục này đã được xử lý bởi EditProfileModal ở code cũ
                break;

            default:
                console.log('Chưa xử lý chức năng:', commandText);
        }
    }
}