// 1. Import service
import { authService } from '../API/auth-service.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('formLogin');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const errorMessageElement = document.getElementById('error-message');
            const submitBtn = loginForm.querySelector('button'); // Lấy nút button
            
            // 1. Khai báo biến này ở ngoài try để finally dùng được
            const originalBtnText = submitBtn.innerText; 

            const email = emailInput.value; // Đảm bảo biến này chứa email (vd: test@gmail.com)
            const password = passwordInput.value;

            try {
                submitBtn.innerText = 'Đang xử lý...';
                submitBtn.disabled = true;
                if (errorMessageElement) errorMessageElement.style.display = 'none';

                // Gọi hàm login với email
                await authService.login(email, password);

                window.location.href = 'index.html';

            } catch (error) {
                console.error('Login Error:', error); // Log rõ lỗi ra
                if (errorMessageElement) {
                    // Hiển thị message lỗi cụ thể từ server nếu có
                    errorMessageElement.innerText = error.message || 'Email hoặc mật khẩu không đúng!';
                    errorMessageElement.style.display = 'block';
                } else {
                    alert('Đăng nhập thất bại: ' + (error.message || 'Lỗi không xác định'));
                }
            } finally {
                // 2. Giờ thì biến này đã tồn tại
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});
