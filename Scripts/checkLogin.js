// checkLogin.js - Phiên bản đã sửa hoàn chỉnh
export class CheckLogin {
    #publicPages;

    constructor(publicPages = ["Login.html", "Register.html"]) {
        this.#publicPages = publicPages;

        // Chạy ngay khi script được load (không cần chờ DOMContentLoaded nếu chỉ đọc localStorage + location)
        this.#check();

        // Vẫn giữ DOMContentLoaded nếu cần thao tác DOM sau này
        // window.addEventListener("DOMContentLoaded", () => this.#check());
    }

    #check() {
        const currentPage = this.#getCurrentPage();
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        const hasUserData = !!localStorage.getItem("userLogin");

        console.log("[CheckLogin] Trang hiện tại:", currentPage);
        console.log("[CheckLogin] isLoggedIn:", isLoggedIn);
        console.log("[CheckLogin] Có userLogin:", hasUserData);

        // Trường hợp 1: Chưa login + không phải trang public → đá về login
        if (!isLoggedIn && !this.#publicPages.includes(currentPage)) {
            console.log("→ Chưa đăng nhập → Chuyển về Login");
            window.location.replace("/Login.html"); // replace tốt hơn href (không lưu lịch sử)
            return;
        }

        // Trường hợp 2: Đã login (có isLoggedIn) nhưng đang ở trang Login/Register → đá về trang chủ
        if (isLoggedIn && this.#publicPages.includes(currentPage)) {
            console.log("→ Đã đăng nhập rồi → Không cho vào trang Login/Register");
            window.location.replace("/index.html"); // hoặc "/Profile.html", "/Dashboard.html"
            return;
        }

        // Bonus: Đồng bộ trạng thái (nếu có user nhưng isLoggedIn = false → sửa lại)
        if (hasUserData && !isLoggedIn) {
            console.warn("Dữ liệu user có nhưng isLoggedIn = false → Tự động sửa");
            localStorage.setItem("isLoggedIn", "true");
        }

        // Bonus: Nếu không có user nhưng isLoggedIn = true → sửa lỗi
        if (!hasUserData && isLoggedIn) {
            console.warn("isLoggedIn = true nhưng không có user → Đăng xuất buộc");
            localStorage.removeItem("isLoggedIn");
            if (!this.#publicPages.includes(currentPage)) {
                window.location.replace("/Login.html");
            }
        }
    }

    #getCurrentPage() {
        const path = window.location.pathname;
        const page = path.substring(path.lastIndexOf("/") + 1);
        return page || "index.html"; // phòng trường hợp là "/"
    }
}

// Khởi tạo ngay lập tức
new CheckLogin();