import { AuthService } from "./Auth/AuthService.js";

export class CheckLogin {
    // Chỉ chứa các trang không cần đăng nhập
    #publicPages = ["Login.html", "Register.html"];

    constructor() {
        this.#check();
    }

    #check() {
        const currentPage = this.#getCurrentPage();
        const isLoggedIn = AuthService.isLogedIn;
        const isPublic = this.#publicPages.includes(currentPage);

        // Cập nhật trạng thái Active session nếu đã đăng nhập
        if (isLoggedIn) {
            sessionStorage.setItem("sessionActive", "true");
        }

        // ❗ 1. Chưa đăng nhập & truy cập trang PRIVATE -> Chuyển đến Login
        if (!isLoggedIn && !isPublic) {
            console.log("-> Chưa đăng nhập, chặn truy cập trang riêng tư.");
            return AuthService.navigateToLogin();
        }

        // ❗ 2. Đã đăng nhập & truy cập trang PUBLIC (Login/Register) -> Chuyển đến Home
        if (isLoggedIn && isPublic) {
            console.log("-> Đã đăng nhập, chặn truy cập Login/Register.");
            return AuthService.navigateToHome();
        }

        // 3. Các trường hợp còn lại:
        // - Chưa login + trang public: OK
        // - Đã login + trang private: OK
    }

    #getCurrentPage() {
        const path = window.location.pathname;
        return path.substring(path.lastIndexOf("/") + 1) || "index.html";
    }
}

new CheckLogin();