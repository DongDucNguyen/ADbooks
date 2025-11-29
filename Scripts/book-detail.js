/ Scripts/book-detail.js

// Import các module cần thiết
import { BookBanner } from './Book-Detail/book-banner.js';
import { BookContent } from './Book-Detail/book-content.js';
import { BookRatingSection } from './Book-Detail/book-rating.js';

// --- HÀM XỬ LÝ API VÀ DỮ LIỆU (ĐƯA LÊN ĐẦU ĐỂ KHẮC PHỤC LỖI SCOPE) ---

/**
 * Hàm fetch an toàn, xử lý lỗi chung (500, JSON Parsing)
 */
async function safeFetch(url, options = {}) {
    try {
        const token = localStorage.getItem("token");
        const headers = {
            'Content-Type': 'application/json',
            // Chỉ thêm Authorization nếu có Token
            ...(token && { 'Authorization': `Bearer ${token}` })
        };

        const response = await fetch(url, { headers, ...options });

        if (!response.ok) {
            let errorMessage = `Lỗi Server (${response.status}): Vui lòng kiểm tra Server và DB.`;
            try {
                const errorBody = await response.json();
                errorMessage = errorBody.message || errorBody.error || errorMessage;
            } catch (e) {
                // Xử lý lỗi JSON Parsing khi body rỗng (thường 500 hoặc 401/403 Spring Security)
                if (response.status >= 500) {
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
 * Tải chi tiết sách (Public) - GET /api/v1/books/{id}
 */
async function fetchBookDetail(bookId) {
    const url = `http://localhost:8080/api/v1/books/${bookId}`;
    return await safeFetch(url, { method: 'GET' });
}


/**
 * Tải Reviews của sách (Public) - GET /api/v1/books/{id}/reviews
 */
async function fetchBookReviews(bookId) {
    const url = `http://localhost:8080/api/v1/books/${bookId}/reviews?page=0&size=5`; // Chỉ lấy 5 reviews đầu
    const responseData = await safeFetch(url, { method: 'GET' });

    if (!responseData || !responseData.content) return [];

    return responseData.content.map(review => ({
        id: review.id,
        name: review.userFullName || 'Độc giả',
        date: new Date(review.createdAt).toLocaleDateString('vi-VN'),
        score: review.stars,
        title: review.title,
        content: review.content,
    }));
}


/**
 * Tải dữ liệu AI phân tích - POST /api/v1/books/ai/analyze
 */
async function fetchAIAnalysis(bookTitle, authorName) {
    if (!bookTitle) return null; // Tránh lỗi 400 Bad Request

    const payload = { bookTitle, authorName };
    try {
        return await safeFetch("http://localhost:8080/api/v1/books/ai/analyze", {
            method: 'POST',
            body: JSON.stringify(payload)
        });
    } catch (e) {
        // Lỗi 400 do AI hoặc lỗi kết nối, chỉ cảnh báo, không chặn trang
        console.warn(`Lỗi phân tích AI: ${e.message}`);
        return null;
    }
}

/**
 * Tải trạng thái Yêu thích ban đầu (Tạm thời là false)
 */
async function fetchIsFavoriteStatus(bookId) {
    const token = localStorage.getItem("token");
    if (!token) return false;
    // Cần API GET /favorites/status/{bookId} (API này hiện chưa có, trả về false an toàn)
    return false;
}


// --- MAIN EXECUTION (ENTRY POINT) ---
document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id') || "1"; // Mặc định ID là 1

    // 1. Fetch Dữ liệu Sách Chính
    const bookData = await fetchBookDetail(bookId);
    if (!bookData) return;

    // 2. Chuẩn bị dữ liệu và thực thi song song
    const authorNames = bookData.authors ? bookData.authors.map(a => `${a.firstName} ${a.lastName}`).join(', ') : 'N/A';
    const bookTitle = bookData.name || '';

    const [aiAnalysis, reviews] = await Promise.all([
        bookTitle ? fetchAIAnalysis(bookTitle, authorNames) : null,
        fetchBookReviews(bookData.id)
    ]);

    // 3. Ánh xạ dữ liệu cuối cùng cho Frontend Modules
    const mappedData = {
        id: bookData.id,
        title: bookTitle,
        author: authorNames,
        publishDate: bookData.releaseDate,
        img: bookData.thumbnailUrl,

        // Status cho Banner
        isFavorite: await fetchIsFavoriteStatus(bookData.id),

        // Content: Ưu tiên nội dung AI nếu có
        shortInfo: bookData.description ? bookData.description : '',
        description: (aiAnalysis && aiAnalysis.description) ? aiAnalysis.description : bookData.description,
        authorNote: (aiAnalysis && aiAnalysis.authorNote) ? aiAnalysis.authorNote : `Tác giả: ${authorNames}`,
        // Lỗi PublishingHouse (EntityNotFound) đã được fix ở Backend, tên NXB sẽ nằm trong bookData
        relatedInfo: (aiAnalysis && aiAnalysis.relatedInfo) ? aiAnalysis.relatedInfo : `Quốc gia: ${bookData.country}, Ngôn ngữ: ${bookData.language}, NXB: ${bookData.publishingHouseName}`,
    };

    // --- 4. Khởi tạo Modules ---

    new BookBanner(mappedData);
    new BookContent(mappedData);
    new BookRatingSection(reviews);
});