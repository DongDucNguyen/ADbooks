import { ConfirmationModal } from "./confirmation.js";

const logoutModal = new ConfirmationModal();

export function setupLogout() {
    const logoutBtn = document.querySelector(".setting-command.logout");
    if (!logoutBtn) return;

    logoutBtn.addEventListener("click", () => {
        logoutModal.show(
            "Bạn có chắc muốn đăng xuất không?",
            async () => {
                const user = JSON.parse(localStorage.getItem("userLogin"));
                if (!user) {
                    alert("Không tìm thấy thông tin người dùng!");
                    return;
                }

                try {
                    // Gọi API logout
                    const response = await fetch(`http://localhost:8080/api/logout/${user.id}`, {
                        method: "POST", // hoặc DELETE tùy backend
                        headers: {
                            "Content-Type": "application/json",
                            // "Authorization": "Bearer " + token nếu backend dùng token
                        },
                        body: JSON.stringify({ userId: user.id })
                    });

                    const result = await response.json();

                    if (!response.ok) {
                        alert("Đăng xuất thất bại: " + (result.message || response.statusText));
                        return;
                    }

                } catch (err) {
                    alert("Lỗi kết nối API: " + err.message);
                    return;
                }

                // Xoá localStorage/sessionStorage sau khi logout thành công
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("userLogin");
                sessionStorage.removeItem("sessionActive");

                window.location.replace("/Login.html");
            }
        );
    });
}
