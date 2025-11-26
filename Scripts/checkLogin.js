export class CheckLogin {
    #publicPages;

    constructor(publicPages = ["Login.html", "Register.html"]) {
        this.#publicPages = publicPages;

        this.#check();
    }

    #check() {
        const currentPage = this.#getCurrentPage();

        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        const userData = localStorage.getItem("userLogin");
        const sessionActive = sessionStorage.getItem("sessionActive") === "true";

        const isPublic = this.#publicPages.includes(currentPage);

        // ❗ Nếu session không tồn tại → xem như tab mới mở → bắt login lại
        if (!sessionActive) {
            console.log("→ Tab mới mở, không có session → buộc logout");
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userLogin");
            return window.location.replace("/Login.html");
        }

        // ❗ Chưa đăng nhập → không được vào private page
        if (!isLoggedIn || !userData) {
            if (!isPublic) return window.location.replace("/Login.html");
            return;
        }

        // ❗ Đã đăng nhập mà vào login/register → chặn
        if (isLoggedIn && userData && isPublic) {
            return window.location.replace("/index.html");
        }
    }

    #getCurrentPage() {
        const path = window.location.pathname;
        return path.substring(path.lastIndexOf("/") + 1) || "index.html";
    }
}

new CheckLogin();
