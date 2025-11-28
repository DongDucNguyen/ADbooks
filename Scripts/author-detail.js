import { authorService } from './API/author-service.js';
import { AuthorIntro } from './Author-Detail/author-intro.js';
import { AuthorTopBooks } from './Author-Detail/author-top-books.js';
import { AuthorInfo } from './Author-Detail/author-info.js';
import { AuthorRatingSection } from './Author-Detail/author-rating.js';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Lấy ID từ URL (ví dụ: author.html?id=1)
    const urlParams = new URLSearchParams(window.location.search);
    const authorId = urlParams.get('id');

    if (!authorId) {
        alert("Không tìm thấy ID tác giả!");
        window.location.href = '../Author-Page.html';
        return;
    }

    try {
        // 2. Gọi API lấy chi tiết
        const author = await authorService.getAuthorById(authorId);

        // 3. Map dữ liệu API sang cấu trúc UI
        const authorData = {
            id: author.id,
            name: author.fullName,
            dob: formatDate(author.birthday),
            img: getSafeImageUrl(author.imageUrl),
            
            // Xử lý mô tả
            shortDesc: author.description || "Đang cập nhật thông tin...",
            fullDescription: `<p>${author.description || "Chưa có tiểu sử chi tiết."}</p>`,
            
            // Thông tin liên quan
            relatedInfo: `
                <p><strong>Tổng số sách:</strong> ${author.totalBooks || 0}</p>
                <p><strong>Ngày sinh:</strong> ${formatDate(author.birthday)}</p>
            `,

            // Map danh sách sách (API: thumbnailUrl -> UI: img)
            topBooks: (author.books || []).map(book => ({
                id: book.id,
                title: book.name,
                img: getSafeImageUrl(book.thumbnailUrl, true)
            })),

            // Mock Reviews (API chưa có, tạo giả để không lỗi giao diện)
            reviews: [
                {
                    id: 1,
                    name: "Hệ thống",
                    date: "Hôm nay",
                    score: 5.0,
                    title: "Thông báo",
                    content: "Hiện tại chưa có đánh giá nào cho tác giả này.",
                    bookTitle: "N/A"
                }
            ]
        };

        // 4. Khởi tạo UI
        new AuthorIntro(authorData);
        new AuthorTopBooks(authorData.topBooks, authorData.name);
        new AuthorInfo(authorData);
        new AuthorRatingSection(authorData.reviews);

        // Event Listener cho nút xem tất cả đánh giá
        const ratingBtn = document.querySelector('.all-ratings');
        if(ratingBtn) {
            ratingBtn.addEventListener('click', () => {
                localStorage.setItem('selectedAuthorCategory', authorData.name);
            });
        }

    } catch (error) {
        console.error("Lỗi tải chi tiết tác giả:", error);
        document.querySelector('main').innerHTML = `<div style="text-align:center; padding: 50px; color: red;">Lỗi: ${error.message}</div>`;
    }
});

// --- Helper Functions ---
function getSafeImageUrl(url, isBook = false) {
    // Lưu ý: Đường dẫn lùi 1 cấp (..) vì đang ở trong thư mục Details
    if (!url || url === "string" || url.trim() === "") {
        return isBook ? '../Images/Book-Covers/default-book.png' : '../Images/Authors/default-author.png';
    }
    return url;
}

function formatDate(dateString) {
    if (!dateString) return "N/A";
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}
