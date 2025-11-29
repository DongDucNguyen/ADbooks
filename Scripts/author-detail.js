// Scripts/author-detail.js
import { AuthorIntro } from './Author-Detail/author-intro.js';
import { AuthorTopBooks } from './Author-Detail/author-top-books.js';
import { AuthorInfo } from './Author-Detail/author-info.js';
import { AuthorRatingSection } from './Author-Detail/author-rating.js';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Lấy ID từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const authorId = urlParams.get('id');

    if (!authorId) {
        alert("Không tìm thấy ID tác giả!");
        return;
    }

    try {
        // 2. Tải dữ liệu JSON
        const response = await fetch('../database-last.json');
        if (!response.ok) throw new Error("Không thể tải dữ liệu.");
        const db = await response.json();

        // 3. Tìm tác giả theo ID
        // Lưu ý: ID trong JSON là số, authorId từ URL là chuỗi nên dùng ==
        const author = db.author.find(a => a.id == authorId);

        if (!author) {
            document.body.innerHTML = "<h1 style='text-align:center; margin-top:50px;'>Không tìm thấy tác giả này!</h1>";
            return;
        }

        // 4. Lấy danh sách sách của tác giả này
        // Dựa vào bảng liên kết authorsOfBooks
        const bookLinks = db.authorsOfBooks.filter(link => link.AuthorId == authorId);
        
        const topBooks = bookLinks.map(link => {
            const book = db.books.find(b => b.id === link.BookId);
            if (book) {
                return {
                    id: book.id,
                    title: book.name,
                    img: book.thumbnailUrl || "../Images/Book-Covers/default.png"
                };
            }
        }).filter(b => b); // Lọc bỏ các giá trị undefined nếu có lỗi

        // 5. Chuẩn hóa tên tác giả (Ghép họ + tên)
        const fullName = getFullName(author);

        // 6. Chuẩn bị dữ liệu hiển thị (Mapping)
        const authorData = {
            id: author.id,
            name: fullName,
            dob: author.birthday || "Đang cập nhật",
            img: author.imagineUrl || "../Images/Authors/default.png",
            
            // Mô tả ngắn
            shortDesc: author.description ? author.description.substring(0, 200) + "..." : "Đang cập nhật...",
            
            // Danh sách sách
            topBooks: topBooks,

            // Mô tả đầy đủ
            fullDescription: author.description ? `<p>${author.description}</p>` : "<p>Chưa có thông tin chi tiết.</p>",
            
            // Thông tin phụ
            relatedInfo: `
                <p><strong>Ngày sinh:</strong> ${author.birthday || 'N/A'}</p>
                <p><strong>Quốc tịch:</strong> ${author.nationality || 'N/A'}</p>
            `,

            // Review giả lập (vì JSON chưa có review tác giả)
            reviews: [
                {
                    id: 1,
                    bookTitle: topBooks.length > 0 ? topBooks[0].title : "Tác phẩm tiêu biểu",
                    name: "Người hâm mộ",
                    date: "Hôm nay",
                    score: 5,
                    title: "Tác giả tuyệt vời",
                    content: `Tôi rất thích văn phong của ${fullName}.`
                }
            ]
        };

        // 7. Cập nhật Title trang web
        document.title = authorData.name + " - Listenary";

        // 8. Khởi tạo các thành phần giao diện
        new AuthorIntro(authorData);
        new AuthorTopBooks(authorData.topBooks, authorData.name);
        new AuthorInfo(authorData);
        new AuthorRatingSection(authorData.reviews);

        // Sự kiện lưu category (nếu cần dùng cho trang khác)
        const allRatingsBtn = document.querySelector('.all-ratings');
        if (allRatingsBtn) {
            allRatingsBtn.addEventListener('click', function() {
                localStorage.setItem('selectedAuthorCategory', authorData.name);
            });
        }

    } catch (error) {
        console.error("Lỗi:", error);
        alert("Có lỗi khi tải dữ liệu tác giả.");
    }
});

// Helper: Ghép họ tên
function getFullName(author) {
    const first = author.firstName || "";
    const last = author.lastName || "";
    const vnSurnames = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Huỳnh", "Phan", "Vũ", "Võ", "Đặng", "Bùi", "Đỗ", "Hồ", "Ngô", "Dương", "Lý", "Chu", "Sơn", "Tô", "Trương", "Phùng", "Kim", "Nam"];
    
    if (vnSurnames.includes(last)) {
        return `${last} ${first}`.trim();
    }
    return `${first} ${last}`.trim();
}