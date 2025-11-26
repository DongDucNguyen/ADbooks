import { ConfirmationModal } from "./ConfirmationModal.js";

export class LogoutHandler {
    #confirmModal;

    constructor() {
        this.#confirmModal = new ConfirmationModal();
    }

    // Gọi hàm này khi user bấm "Đăng xuất"
    requestLogout() {
        this.#confirmModal.show(
            "Bạn có chắc chắn muốn đăng xuất không?",
            () => this.#performLogout()
        );
    }

    #performLogout() {
        // Xóa đăng nhập lâu dài
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userLogin");

        // Xóa phiên tab hiện tại
        sessionStorage.removeItem("sessionActive");

        // Chuyển về trang Login
        window.location.replace("/Login.html");
    }
}
