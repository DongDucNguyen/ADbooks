import { authService } from '../API/auth-service.js';

export class RegisterForm {
    #form;
    #fields;

    constructor(formSelector) {
        this.#form = document.querySelector(formSelector);
        if (!this.#form) return;

        // Map các input theo HTML, có address
        this.#fields = {
            lastName: this.#form.querySelector('#lastname'),
            firstName: this.#form.querySelector('#firstname'),
            username: this.#form.querySelector('#username'),
            birthday: this.#form.querySelector('#birthday'),
            email: this.#form.querySelector('#email'),
            phoneNumber: this.#form.querySelector('#phoneNumber'),
            password: this.#form.querySelector('#password'),
            rePassword: this.#form.querySelector('#confirm-password')
        };

        this.#init();
    }

    #init() {
        this.#form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!this.#validate()) return;
            this.#signUp();
        });
    }

    #validate() {
        const f = this.#fields;

        if (!f.lastName.value.trim()) return alert("Họ không được để trống!");
        if (!f.firstName.value.trim()) return alert("Tên không được để trống!");
        if (!f.username.value.trim()) return alert("Username không được để trống!");
        if (!f.birthday.value.trim()) return alert("Ngày sinh không được để trống!");
        if (!f.email.value.trim()) return alert("Email không được để trống!");
        if (!f.phoneNumber.value.trim()) return alert("Số điện thoại không được để trống!"); // để giống db
        if (!f.password.value) return alert("Mật khẩu không được để trống!");
        if (!f.rePassword.value) return alert("Xác nhận mật khẩu không được để trống!");
        if (f.password.value !== f.rePassword.value) return alert("Mật khẩu không khớp!");

        return true;
    }

    async #signUp() {
        const f = this.#fields;

        const user = {
            firstname: f.firstName.value.trim(),
            lastname: f.lastName.value.trim(),
            username: f.username.value.trim(),
            birthday: f.birthday.value.trim(),
            email: f.email.value.trim(),
            phoneNumber: f.phoneNumber.value.trim(),
            password: f.password.value.trim()
        };

        try {
            const response = await fetch("http://localhost:8080/api/auth/signup", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.message || "Đăng ký thất bại!");
                return;
            }

            alert("Đăng ký thành công!");
            this.#form.reset();
            window.location.href = "Login.html";

        } catch (error) {
            console.error("Lỗi khi gửi đăng ký:", error);
            alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
        }
    }


}

// Khởi tạo form
new RegisterForm('#registerForm');

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('formRegister') || document.querySelector('form');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Lấy dữ liệu từ form
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // Validate mật khẩu khớp nhau
            if (password !== confirmPassword) {
                alert('Mật khẩu xác nhận không khớp!');
                return;
            }

            try {
                const submitBtn = registerForm.querySelector('button');
                const originalText = submitBtn.innerText;
                submitBtn.innerText = 'Đang đăng ký...';
                submitBtn.disabled = true;

                // Gọi API với object dữ liệu đầy đủ
                await authService.register({
                    username,
                    email,
                    password,
                    firstName,
                    lastName
                });

                // Thành công
                alert('Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.');
                window.location.href = 'Login.html';

            } catch (error) {
                console.error(error);
                alert('Đăng ký thất bại: ' + error.message);
            } finally {
                const submitBtn = registerForm.querySelector('button');
                submitBtn.innerText = 'ĐĂNG KÝ'; // Hoặc lấy từ biến originalText nếu muốn
                submitBtn.disabled = false;
            }
        });
    }
});
