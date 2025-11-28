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
