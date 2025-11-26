import { ConfirmationModal } from "./confirmation.js";

const historyModal = new ConfirmationModal();

export function setupDeleteHistory() {
    const deleteHistoryBtn = document.querySelector(".setting-command.delete-history");
    if (!deleteHistoryBtn) return;

    deleteHistoryBtn.addEventListener("click", () => {
        historyModal.show(
            "Bạn có chắc muốn xóa toàn bộ lịch sử không?",
            async () => {
                const user = JSON.parse(localStorage.getItem("userLogin"));
                if (!user) {
                    alert("Không tìm thấy thông tin người dùng!");
                    return;
                }

                try {
                    const response = await fetch(`http://localhost:8080/api/history/${user.id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    const result = await response.json();

                    if (!response.ok) {
                        alert("Xóa lịch sử thất bại: " + (result.message || response.statusText));
                        return;
                    }

                    alert("Đã xóa toàn bộ lịch sử.");

                    // Xóa localStorage nếu bạn có lưu cache lịch sử
                    localStorage.removeItem("history");

                    // Cập nhật UI nếu có container hiển thị
                    const historyContainer = document.querySelector(".js-history-container");
                    if (historyContainer) {
                        historyContainer.innerHTML = "<p class='empty'>Không có lịch sử.</p>";
                    }

                } catch (err) {
                    alert("Lỗi kết nối API: " + err.message);
                }
            }
        );
    });
}
