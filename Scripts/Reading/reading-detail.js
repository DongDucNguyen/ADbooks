// Scripts/Reading/reading-detail.js
import { ReadingPlayer } from './Reading-Detail/reading-player.js';
import { ReadingPdfViewer } from './Reading-Detail/reading-pdf.js';
import { ReadingChapters } from './Reading-Detail/reading-chapters.js';
import { ReadingControls } from './Reading-Detail/reading-controls.js';
import { ReadingInfo } from './Reading-Detail/reading-info.js';

// Hàm hỗ trợ lấy tên tác giả
function getFullName(author) {
    if (!author) return "Unknown Author";
    const first = author.firstName || "";
    const last = author.lastName || "";
    const vnSurnames = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Huỳnh", "Phan", "Vũ", "Võ", "Đặng", "Bùi", "Đỗ", "Hồ", "Ngô", "Dương", "Lý", "Chu", "Sơn", "Tô", "Trương", "Phùng", "Kim", "Nam"];
    if (vnSurnames.includes(last)) return `${last} ${first}`.trim();
    return `${first} ${last}`.trim();
}

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Lấy ID từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');

    if (!bookId) {
        alert("Không tìm thấy ID sách để đọc!");
        return;
    }

    try {
        // 2. Tải dữ liệu từ database-last.json
        // (Lưu ý đường dẫn file JSON phải chính xác so với vị trí file HTML)
        const response = await fetch('./database-last.json'); 
        if (!response.ok) throw new Error("Không thể tải dữ liệu.");
        const db = await response.json();

        // 3. Tìm sách
        const book = db.books.find(b => b.id == bookId);
        if (!book) {
            alert("Sách không tồn tại trong hệ thống.");
            return;
        }

        // 4. Tìm tác giả
        let authorName = "Tác giả ẩn danh";
        if (db.authorsOfBooks && db.author) {
            const link = db.authorsOfBooks.find(l => l.BookId == bookId);
            if (link) {
                const aObj = db.author.find(a => a.id == link.AuthorId);
                authorName = getFullName(aObj);
            }
        }

        // 5. Chuẩn hóa dữ liệu sách để dùng cho trang Reading
        const BOOK_DATA = {
            metadata: {
                title: book.name,
                author: authorName,
                coverUrl: book.thumbnailUrl || "./Images/Book-Covers/default.png",
            },
            resources: {
                // Nếu JSON của bạn có trường link PDF/Audio thì lấy ra, 
                // nếu chưa có thì dùng link mặc định hoặc link mẫu để test
                pdfUrl: book.ebookFileUrl || "./1_Ba người thầy vĩ đại.pdf", 
                audioId: "main-audio",
                audioMp3Url: book.audioUrl || "https://crimson-voice-0636.dongducnguyen05.workers.dev/?fileId=13yM_JdlEJjaHvtPMOZsZtbW4tdSKjf-E&version=fix_lan_cuoi"
            },
            chapters: [
                // Nếu JSON chưa có danh sách chương, tạo giả lập
                { title: "Phần 1: Khởi đầu", duration: 300 },
                { title: "Phần 2: Diễn biến", duration: 600 },
                { title: "Phần 3: Kết thúc", duration: 400 }
            ],
            userStatus: {
                isFavorite: false // Mặc định
            }
        };

        // 6. Cập nhật Title trang web
        document.title = `Đọc: ${BOOK_DATA.metadata.title}`;

        // 7. Khởi tạo các thành phần giao diện
        new ReadingInfo(BOOK_DATA.metadata);

        const pdfViewer = new ReadingPdfViewer(BOOK_DATA.resources.audioId);
        pdfViewer.loadPdf(BOOK_DATA.resources.pdfUrl);

        new ReadingPlayer(BOOK_DATA.resources.audioId, BOOK_DATA.resources.audioMp3Url);
        new ReadingChapters(BOOK_DATA.chapters, BOOK_DATA.resources.audioId);
        new ReadingControls(pdfViewer, BOOK_DATA.userStatus.isFavorite);

    } catch (error) {
        console.error("Lỗi Reading Page:", error);
        alert("Có lỗi khi tải nội dung sách.");
    }
});