// Scripts/Reading/reading-detail.js
import { ReadingPlayer } from './Reading-Detail/reading-player.js';
import { ReadingPdfViewer } from './Reading-Detail/reading-pdf.js';
import { ReadingChapters } from './Reading-Detail/reading-chapters.js';
import { ReadingControls } from './Reading-Detail/reading-controls.js';
import { ReadingInfo } from './Reading-Detail/reading-info.js'; // <--- Import mới

// --- MOCK DATA (Mô phỏng dữ liệu đầy đủ từ Backend) ---
const BOOK_DATA_SOURCE = {
    id: "book-101",
    metadata: {
        title: "Người Thầy Vĩ Đại",
        author: "Robin Sharma",
        coverUrl: "./Images/Book-Covers/book.png",
    },
    userStatus: {
        isFavorite: true,  // <-- Thử đổi thành false để test
        lastReadChapter: 1
    },
    resources: {
        pdfUrl: "./1_Ba người thầy vĩ đại.pdf", // Đường dẫn PDF
        audioId: "main-audio" // ID của thẻ audio trong HTML (hoặc URL file mp3 nếu muốn load động)
    },
    chapters: [
        { title: "Mở đầu", duration: 310 },         
        { title: "Chương 1", duration: 920 },       
        { title: "Chương 2", duration: 600 },       
        { title: "Chương 3", duration: 525 },       
        { title: "Kết thúc", duration: 140 }        
    ]
};

// --- MAIN EXECUTION ---
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Render Thông tin sách (Bìa, Tên, Tác giả)
    new ReadingInfo(BOOK_DATA_SOURCE.metadata);

    // 2. Khởi tạo PDF Viewer (Truyền URL từ data)
    const pdfViewer = new ReadingPdfViewer(BOOK_DATA_SOURCE.resources.audioId);
    // Lưu ý: Cần sửa nhẹ ReadingPdfViewer để nhận URL từ hàm start thay vì hardcode,
    // hoặc gọi phương thức load công khai ở đây:
    pdfViewer.loadPdf(BOOK_DATA_SOURCE.resources.pdfUrl); 

    // 3. Khởi tạo Player (Thanh nhạc)
    new ReadingPlayer(BOOK_DATA_SOURCE.resources.audioId);

    // 4. Khởi tạo Chapter List (Danh sách chương)
    new ReadingChapters(BOOK_DATA_SOURCE.chapters, BOOK_DATA_SOURCE.resources.audioId);

    // 5. Khởi tạo Controls (Các nút chức năng)
    new ReadingControls(
        pdfViewer, 
        BOOK_DATA_SOURCE.userStatus.isFavorite // <-- Truyền vào đây
    );
});