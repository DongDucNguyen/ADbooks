// Scripts/Reading/reading-detail.js
import { ReadingPlayer } from './Reading-Detail/reading-player.js';
import { ReadingPdfViewer } from './Reading-Detail/reading-pdf.js';
import { ReadingChapters } from './Reading-Detail/reading-chapters.js';
import { ReadingControls } from './Reading-Detail/reading-controls.js';
import { ReadingInfo } from './Reading-Detail/reading-info.js';

// Utility functions
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

// API Call: Lấy chi tiết sách
async function fetchBookData(bookId) {
    const API_BASE = "http://localhost:8080/api/v1/books";
    try {
        const bookResp = await fetch(`${API_BASE}/${bookId}`);
        if (!bookResp.ok) throw new Error('Failed to fetch book details');
        const bookData = await bookResp.json();

        // Sắp xếp chapters theo thứ tự
        const sortedChapters = bookData.chapters.sort((a, b) => a.number - b.number);
        const firstChapter = sortedChapters[0];

        // Giả sử API để lấy trạng thái favorite và last read (cần API riêng hoặc gộp)
        let isFavorite = false;
        let lastReadChapter = null; // Mặc định là null

        const token = localStorage.getItem('token');
        if(token) {
            // Check Favorite (sử dụng endpoint toggle favorite để check trạng thái)
            const favCheck = await fetch(`${API_BASE}/${bookId}/favorite`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(res => res.json()).catch(() => ({}));

            isFavorite = favCheck.isFavorite || false;

            // Revert trạng thái sau khi check (vì nó là toggle, nên phải gọi lại lần nữa)
            await fetch(`${API_BASE}/${bookId}/favorite`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            // Check Last Read Chapter (sử dụng API /user/bookmarks)
            const bookmarkCheck = await fetch(`http://localhost:8080/api/v1/user/bookmarks?size=100`, {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(res => res.json()).catch(() => ({}));

            const lastBookmark = bookmarkCheck.content.find(b => b.bookId == bookId);
            if (lastBookmark) {
                lastReadChapter = {
                    chapterId: lastBookmark.chapterId,
                    audioTimeline: lastBookmark.audioTimeline,
                    audiobookUrl: sortedChapters.find(c => c.id === lastBookmark.chapterId)?.audioUrl || firstChapter.audioUrl
                };
            }
        }

        return {
            id: bookData.id,
            metadata: {
                title: bookData.name,
                author: bookData.authors.map(a => `${a.firstName} ${a.lastName}`).join(', '),
                coverUrl: bookData.thumbnailUrl,
            },
            userStatus: {
                isFavorite: isFavorite,
                // Nếu không có bookmark, trả về chapter đầu tiên
                lastRead: lastReadChapter || {
                    chapterId: firstChapter.id,
                    audioTimeline: 0,
                    audiobookUrl: firstChapter.audioUrl
                }
            },
            resources: {
                pdfUrl: bookData.ebookFileUrl,
                audioId: "main-audio",
            },
            chapters: sortedChapters
        };

    } catch (error) {
        console.error("Lỗi khi fetch chi tiết sách:", error);
        document.querySelector('main').innerHTML = '<h2 style="text-align:center;">Không tìm thấy sách hoặc lỗi kết nối.</h2>';
        return null;
    }
}


// --- MAIN EXECUTION ---
document.addEventListener('DOMContentLoaded', async () => {
    const bookId = getUrlParameter('id');
    const bookData = await fetchBookData(bookId);

    if (!bookData) return;

    // 1. Render Thông tin sách (Bìa, Tên, Tác giả)
    new ReadingInfo(bookData.metadata);

    // 2. Khởi tạo PDF Viewer
    const pdfViewer = new ReadingPdfViewer(bookData.resources.audioId);
    pdfViewer.loadPdf(bookData.resources.pdfUrl);

    // 3. Khởi tạo Player
    const readingPlayer = new ReadingPlayer(
        bookData.resources.audioId,
        bookId,
        bookData.userStatus.lastRead.chapterId,
        bookData.userStatus.lastRead.audiobookUrl,
        bookData.userStatus.lastRead.audioTimeline
    );

    // 4. Khởi tạo Chapter List
    const readingChapters = new ReadingChapters(
        bookData.chapters,
        bookData.resources.audioId,
        readingPlayer,
        bookData.userStatus.lastRead.chapterId // ID chapter đang đọc
    );

    // 5. Khởi tạo Controls
    new ReadingControls(
        pdfViewer,
        bookId,
        bookData.userStatus.isFavorite
    );
});