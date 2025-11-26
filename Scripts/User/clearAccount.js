// DeleteAccount.js (version with API)
import { ConfirmationModal } from "./confirmation.js";

const deleteModal = new ConfirmationModal();

export function setupDeleteAccount() {
    const deleteBtn = document.querySelector(".setting-command.delete-account");
    if (!deleteBtn) return;

    deleteBtn.addEventListener("click", () => {
        deleteModal.show(
            "Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác!",
            async () => {

                const user = JSON.parse(localStorage.getItem("userLogin"));
                if (!user) return;

                try {
                    const response = await fetch("http://localhost:8080/api/users/delete", {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ userId: user.id }),
                    });

                    if (!response.ok) {
                        const msg = await response.text();
                        alert("Không thể xóa tài khoản: " + msg);
                        return;
                    }

                } catch (err) {
                    alert("Lỗi kết nối API: " + err.message);
                    return;
                }

                // Xóa local
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("userLogin");
                sessionStorage.removeItem("sessionActive");

                alert("Tài khoản của bạn đã được xóa.");

                window.location.replace("/Register.html");
            }
        );
    });
}
