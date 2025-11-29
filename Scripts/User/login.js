// Scripts/User/login.js
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
                // Đảm bảo body gửi đi đúng format DTO của Java
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });

            // 2️⃣ Backend trả lỗi (401, 400, 500)
            if (!response.ok) {
                // RẤT QUAN TRỌNG: Đọc nội dung lỗi từ Backend để hiển thị chi tiết (ví dụ: "Sai email hoặc mật khẩu")
                const err = await response.json().catch(() => ({}));

                // Nếu có lỗi 401/Bad Credentials hoặc các lỗi khác từ GlobalExceptionHandler
                const errorMessage = err.message || `Đăng nhập thất bại (Mã lỗi: ${response.status}).`;

                alert(errorMessage);
                return;
            }

            // 3️⃣ Nhận JWT từ backend
            const data = await response.json();

            // 4️⃣ Lưu token và user info
            localStorage.setItem("token", data.token);
            localStorage.setItem("userInfo", JSON.stringify(data));

            // 5️⃣ Chuyển hướng
            alert("Đăng nhập thành công!");
            sessionStorage.setItem("sessionActive", "true");

            setTimeout(() => {
                // Chuyển hướng về trang Khám phá
                window.location.href = "/Explore-Page.html";
            }, 100);

        } catch (error) {
            // Xử lý lỗi TypeError: Failed to fetch (thường là lỗi CORS hoặc server offline)
            console.error("Lỗi khi đăng nhập:", error);
            alert("LỖI KẾT NỐI: Không thể liên hệ được Server (Có thể do lỗi CORS hoặc Server chưa hoạt động).");
        }
    }
}

// Khởi tạo form
new LoginForm("#formLogin");