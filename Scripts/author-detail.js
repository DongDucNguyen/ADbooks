import { authorService } from './API/author-service.js';
import { AuthorIntro } from './Author-Detail/author-intro.js';
import { AuthorTopBooks } from './Author-Detail/author-top-books.js';
import { AuthorInfo } from './Author-Detail/author-info.js';
// import { AuthorRatingSection } from './Author-Detail/author-rating.js'; // Tạm thời comment vì API chưa có reviews

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Lấy ID từ URL (ví dụ: author.html?id=1)
    const urlParams = new URLSearchParams(window.location.search);
    const authorId = urlParams.get('id');

    if (!authorId) {
        console.error("Không tìm thấy ID tác giả trên URL");
        return;
    }

    try {
        // 2. Gọi API lấy dữ liệu chi tiết
        const response = await fetch(`http://localhost:8080/api/v1/authors/${authorId}`);
        
        if (!response.ok) {
            throw new Error(`Lỗi API: ${response.status}`);
        }
        
        const authorData = await response.json();
        console.log("Dữ liệu tác giả:", authorData); // Log để kiểm tra

        // 3. Khởi tạo các thành phần giao diện với dữ liệu từ API
        new AuthorIntro(authorData);
        new AuthorTopBooks(authorData.books, authorData.fullName);
        new AuthorInfo(authorData);
        
        // new AuthorRatingSection(authorData.reviews || []); 

    } catch (error) {
        console.error("Lỗi khi tải thông tin tác giả:", error);
        
        // Hiển thị thông báo lỗi lên giao diện nếu cần
        const nameEl = document.querySelector('.introduction-name');
        if(nameEl) nameEl
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
