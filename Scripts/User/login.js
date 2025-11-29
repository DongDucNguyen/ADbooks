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
            // 1️⃣ Gửi POST đến API signin
            const response = await fetch("http://localhost:8080/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });

            // 2️⃣ Backend trả lỗi (401, 400, 500)
            if (!response.ok) {
                const err = await response.json().catch(() => ({}));

                alert(err.message || "Đăng nhập thất bại!");
                return;
            }

            // 3️⃣ Nhận JWT từ backend
            const data = await response.json();

            // Expect: { token: "...", type: "Bearer", email: "...", roles: [...] }
            if (!data.token) {
                alert("Không nhận được token từ server!");
                return;
            }

            // 4️⃣ Lưu token và user info
            localStorage.setItem("token", data.token);
            localStorage.setItem("userInfo", JSON.stringify(data));

            // 5️⃣ Chuyển hướng
            alert("Đăng nhập thành công!");
            sessionStorage.setItem("sessionActive", "true");

            setTimeout(() => {
                window.location.href = "/Explore-Page.html";
            }, 100);

        } catch (error) {
            console.error("Lỗi khi đăng nhập:", error);
            alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
        }
    }
}

// Khởi tạo form
new LoginForm("#formLogin");
