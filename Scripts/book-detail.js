// Scripts/book-detail.js
import { BookBanner } from './Book-Detail/book-banner.js';
import { BookContent } from './Book-Detail/book-content.js';
import { BookRatingSection } from './Book-Detail/book-rating.js';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Lấy ID từ URL (Ví dụ: book.html?id=12 -> lấy được "12")
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');

    if (!bookId) {
        alert("Không tìm thấy ID sách!");
        return;
    }

    try {
        // 2. Tải dữ liệu từ database-last.json
        // Lưu ý: File html ở trong thư mục Details, nên cần lùi lại 1 cấp (..) để tìm file json
        const response = await fetch('../database-last.json');
        if (!response.ok) throw new Error("Không thể tải dữ liệu.");
        
        const db = await response.json();

        // 3. Tìm sách theo ID
        // Lưu ý: ID trong JSON là số (12), trên URL là chuỗi ("12") nên dùng == để so sánh
        const book = db.books.find(b => b.id == bookId);

        if (!book) {
            document.body.innerHTML = "<h1 style='text-align:center; margin-top:50px;'>Không tìm thấy cuốn sách này!</h1>";
            return;
        }

        // 4. Tìm tên tác giả (Mapping)
        let authorName = "Unknown Author";
        if (db.authorsOfBooks && db.author) {
            const link = db.authorsOfBooks.find(l => l.BookId == bookId);
            if (link) {
                const authorObj = db.author.find(a => a.id == link.AuthorId);
                if (authorObj) {
                    authorName = getFullName(authorObj);
                }
            }
        }

        // 5. Chuẩn hóa dữ liệu để đưa vào các Class hiển thị
        const bookData = {
            id: book.id,
            title: book.name,
            author: authorName,
            publishDate: book.releaseDate || "Đang cập nhật",
            img: book.thumbnailUrl || "../Images/Book-Covers/default.png",
            
            // Tạo thông tin ngắn từ description (lấy 150 ký tự đầu)
            shortInfo: book.description ? book.description.substring(0, 150) + "..." : "Đang cập nhật...",
            
            isFavorite: false, // Mặc định chưa thích
            
            // Nội dung chi tiết
            description: book.description ? `<p>${book.description}</p>` : "<p>Chưa có mô tả.</p>",
            
            // Các thông tin phụ (có thể fix cứng hoặc lấy thêm từ JSON nếu có)
            authorNote: `<p>Tác giả: <strong>${authorName}</strong></p>`,
            relatedInfo: `<p>Số trang: ${book.pageNumber || 'N/A'}</p><p>Ngôn ngữ: ${book.language || 'Tiếng Việt'}</p>`,

            // Review giả lập (vì JSON chưa có bảng Review)
            reviewsList: [
                { id: 1, name: "Người đọc ẩn danh", date: "Hôm nay", score: 5, title: "Sách hay", content: "Nội dung rất ý nghĩa." }
            ]
        };

        // 6. Cập nhật Title của trang Web
        document.title = bookData.title + " - Listenary";

        // 7. Khởi tạo các thành phần giao diện
        new BookBanner(bookData);
        new BookContent(bookData);
        new BookRatingSection(bookData.reviewsList);

    } catch (error) {
        console.error("Lỗi:", error);
        alert("Có lỗi khi tải dữ liệu sách.");
    }
});

// Helper: Ghép tên tác giả
function getFullName(author) {
    const first = author.firstName || "";
    const last = author.lastName || "";
    const vnSurnames = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Huỳnh", "Phan", "Vũ", "Võ", "Đặng", "Bùi", "Đỗ", "Hồ", "Ngô", "Dương", "Lý", "Chu", "Sơn", "Tô", "Trương", "Phùng", "Kim", "Nam"];
    if (vnSurnames.includes(last)) return `${last} ${first}`.trim();
    return `${first} ${last}`.trim();
}