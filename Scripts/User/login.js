export class LoginForm {
    #form;
    #emailInput;
    #passwordInput;

    constructor(formSelector) {
        this.#form = document.querySelector(formSelector);
        if (!this.#form) return;

        this.#emailInput = this.#form.querySelector("#email");
        this.#passwordInput = this.#form.querySelector("#password");

        this.#init();
    }

    #init() {
        this.#form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.#submit();
        });
    }

    async #submit() {
        const email = this.#emailInput.value.trim().toLowerCase();
        const password = this.#passwordInput.value;

        if (!email || !password) {
            alert("Email và mật khẩu không được để trống!");
            return;
        }

        try {
            // 1️⃣ GET user chỉ theo email
            const response = await fetch(
                `http://localhost:3000/user?email=${encodeURIComponent(email)}`
            );

            if (!response.ok) {
                alert("Không thể kết nối tới server!");
                return;
            }

            const data = await response.json();

            if (data.length === 0) {
                alert("Tài khoản không tồn tại!");
                return;
            }

            const user = data[0];

            // 2️⃣ So sánh mật khẩu trong JS
            if (user.encryptedPassword !== password) {
                alert("Mật khẩu không đúng!");
                return;
            }

            // 3️⃣ Lưu trạng thái đăng nhập localStorage
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userLogin", JSON.stringify(user));

            // 4️⃣ Thông báo và chuyển hướng
            alert("Đăng nhập thành công!");
            setTimeout(() => {
                window.location.href = "/Explore-Page.html";
            }, 100);

            sessionStorage.setItem("sessionActive", "true");

        } catch (error) {
            console.error("Lỗi khi đăng nhập:", error);
            alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
        }
    }
}

// Khởi tạo form
new LoginForm("#formLogin");
