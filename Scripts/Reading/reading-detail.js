// Scripts/Reading/reading-detail.js (Đã sửa lỗi NoResourceFoundException bằng cách sử dụng dữ liệu từ BookDetail)
import { ReadingPlayer } from './Reading-Detail/reading-player.js';
import { ReadingPdfViewer } from './Reading-Detail/reading-pdf.js';
import { ReadingChapters } from './Reading-Detail/reading-chapters.js';
import { ReadingControls } from './Reading-Detail/reading-controls.js';
import { ReadingInfo } from './Reading-Detail/reading-info.js';

// --- HÀM TẢI DỮ LIỆU ---

/**
 * Hàm fetch an toàn, xử lý lỗi chung (500, JSON Parsing)
 */
async function safeFetch(url, options = {}) {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            let errorMessage = `Lỗi Server (${response.status}): Vui lòng kiểm tra Server và DB.`;
            try {
                const errorBody = await response.json();
                errorMessage = errorBody.message || errorBody.error || errorMessage;
            } catch (e) {
                if (response.status >= 500) {
                     // Nếu Server Java crash, thông báo lỗi DB
                     throw new Error(`Lỗi Server (${response.status}): Lỗi Cấu hình Database.`);
                }
            }
            alert(errorMessage);
            throw new Error(errorMessage);
        }

        return await response.json();

    } catch (error) {
        console.error("LỖI KẾT NỐI:", error.message);
        return null;
    }
}

/**
 * Tải trạng thái Yêu thích ban đầu
 */
async function fetchIsFavoriteStatus(bookId) {
    // API này cần Token và logic kiểm tra trạng thái
    return false;
}

/**
 * Hàm LẤY TOÀN BỘ DỮ LIỆU TRANG ĐỌC
 */
async function fetchBookData(bookId) {
    const detailUrl = `http://localhost:8080/api/v1/books/${bookId}`;
    const lastReadUrl = `http://localhost:8080/api/v1/history/${bookId}`; // Lấy tiến độ đọc

    const favoriteStatus = await fetchIsFavoriteStatus(bookId);

    // [FIX CHÍNH] CHỈ GỌI API Book Detail và API Lịch sử. API Chapters bị loại bỏ.
    const [bookDetail, lastReadData] = await Promise.all([
        safeFetch(detailUrl, { method: 'GET' }).catch(e => { console.error(e.message); return null; }),
        safeFetch(lastReadUrl, { method: 'GET' }).catch(e => { return { chapterNumber: 1, audioTimeline: 0 }; })
    ]);

    if (!bookDetail) {
        document.querySelector('main').innerHTML = '<h2 style="text-align:center; padding-top: 50px;">Không thể tải dữ liệu sách.</h2>';
        return null;
    }

    // SỬ DỤNG CHAPTERS CÓ SẴN TRONG BOOK DETAIL RESPONSE
    const validChapters = bookDetail.chapters ? bookDetail.chapters.filter(c => c.duration > 0 && c.name) : [];

    return {
        id: bookId,
        metadata: {
            title: bookDetail.name,
            author: bookDetail.authors.map(a => `${a.firstName} ${a.lastName}`).join(', '),
            coverUrl: bookDetail.thumbnailUrl,
        },
        userStatus: {
            isFavorite: favoriteStatus,
            lastReadChapter: lastReadData.chapterNumber || 1,
            audioTimeline: lastReadData.audioTimeline || 0
        },
        resources: {
            // [API STREAM] Sử dụng URL chính xác
            pdfUrl: `http://localhost:8080/api/v1/stream/pdf/${bookId}`,
            audioId: "main-audio",
            audioMp3Url: `http://localhost:8080/api/v1/stream/audio/${bookId}`
        },
        chapters: validChapters.map(c => ({
            title: c.name,
            duration: c.duration,
            chapterNumber: c.chapterNumber
        }))
    };
}


/**
 * Hàm gửi cập nhật tiến độ đọc (history)
 */
function setupProgressUpdater(bookId, playerInstance, chaptersInstance) {
    const UPDATE_INTERVAL_MS = 10000; // Gửi cập nhật mỗi 10 giây

    setInterval(async () => {
        const token = localStorage.getItem("token");
        if (!token) return; // Không cập nhật nếu chưa đăng nhập

        const currentTime = playerInstance.getCurrentTime();
        const currentChapter = chaptersInstance.getCurrentChapter();

        if (currentTime === 0) return; // Không update nếu chưa play

        const url = `http://localhost:8080/api/v1/history/update`;
        const payload = {
            bookId: parseInt(bookId),
            chapterNumber: currentChapter.chapterNumber, // Từ module chapters
            audioTimeline: Math.floor(currentTime)
        };

        try {
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
        } catch (error) {
            console.warn('Không thể cập nhật tiến độ:', error.message);
        }
    }, UPDATE_INTERVAL_MS);
}


// --- MAIN EXECUTION ---
document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id') || "1";

    const BOOK_DATA_SOURCE = await fetchBookData(bookId);
    if (!BOOK_DATA_SOURCE) return;

    // 1. Render Thông tin sách
    new ReadingInfo(BOOK_DATA_SOURCE.metadata);

    // 2. Khởi tạo PDF Viewer
    const pdfViewer = new ReadingPdfViewer(BOOK_DATA_SOURCE.resources.audioId);
    pdfViewer.loadPdf(BOOK_DATA_SOURCE.resources.pdfUrl);

    // 3. Khởi tạo Player (Truyền cả tiến độ đọc)
    const player = new ReadingPlayer(
        BOOK_DATA_SOURCE.resources.audioId,
        BOOK_DATA_SOURCE.resources.audioMp3Url,
        BOOK_DATA_SOURCE.userStatus.audioTimeline
    );

    // 4. Khởi tạo Chapter List
    const chapters = new ReadingChapters(BOOK_DATA_SOURCE.chapters, BOOK_DATA_SOURCE.resources.audioId);

    // 5. Khởi tạo Controls
    new ReadingControls(
        pdfViewer,
        BOOK_DATA_SOURCE.userStatus.isFavorite
    );

    // 6. Bắt đầu cập nhật tiến độ đọc
    setupProgressUpdater(BOOK_DATA_SOURCE.id, player, chapters);
});