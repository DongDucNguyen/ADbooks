// Scripts/book-detail.js (Bản đã sửa lỗi Module Scope)

import { BookBanner } from './Book-Detail/book-banner.js';
import { BookContent } from './Book-Detail/book-content.js';
import { BookRatingSection } from './Book-Detail/book-rating.js';

// --- MAIN EXECUTION (ENTRY POINT) ---
document.addEventListener('DOMContentLoaded', async () => {

    // 1. Khai báo các hàm Service (Đưa vào phạm vi cục bộ của DOMContentLoaded)

    /**
     * Hàm fetch an toàn, xử lý lỗi chung (500, JSON Parsing)
     */
    async function safeFetch(url, options = {}) {
        try {
            // [TÍCH HỢP AUTH] Thêm Authorization header nếu có token
            const token = localStorage.getItem("token");
            const headers = {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            };

            const response = await fetch(url, { headers, ...options });

            if (!response.ok) {
                let errorMessage = `Lỗi Server (${response.status}): Vui lòng kiểm tra Server và DB.`;
                try {
                    const errorBody = await response.json();
                    errorMessage = errorBody.message || errorBody.error || errorMessage;
                } catch (e) {
                    // Nếu không phải JSON (thường 500 hoặc 401/403 Spring Security)
                    if (response.status === 401 || response.status === 403) {
                        errorMessage = "Phiên hết hạn hoặc truy cập bị từ chối.";
                    }
                }
                alert(errorMessage);
                throw new Error(errorMessage);
            }

            return await response.json();

        } catch (error) {
            console.error("LỖI KẾT NỐI:", error.message);
            return null; // Trả về null khi fetch thất bại
        }
    }

    /**
     * Tải chi tiết sách (Public)
     */
    async function fetchBookDetail(bookId) {
        const url = `http://localhost:8080/api/v1/books/${bookId}`;
        // Gọi safeFetch với options rỗng vì đây là GET public
        return await safeFetch(url, { method: 'GET' });
    }

    // --- Các hàm fetch khác (tối giản để giữ cấu trúc) ---
    async function fetchBookReviews(bookId) {
        const url = `http://localhost:8080/api/v1/books/${bookId}/reviews?page=0&size=5`;
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

    async function fetchAIAnalysis(bookTitle, authorName) {
        if (!bookTitle) return null;
        const payload = { bookTitle, authorName };
        return await safeFetch("http://localhost:8080/api/v1/books/ai/analyze", {
            method: 'POST',
            body: JSON.stringify(payload)
        });
    }

    async function fetchIsFavoriteStatus(bookId) { return false; } // Tạm thời bỏ qua Auth Status

    // 2. Bắt đầu luồng thực thi
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id') || "1";

    const bookData = await fetchBookDetail(bookId);
    if (!bookData) return; // Dừng nếu tải sách chính thất bại

    // 3. Chuẩn bị dữ liệu
    const authorNames = bookData.authors ? bookData.authors.map(a => `${a.firstName} ${a.lastName}`).join(', ') : 'N/A';
    const bookTitle = bookData.name || '';

    const [aiAnalysis, reviews] = await Promise.all([
        bookTitle ? fetchAIAnalysis(bookTitle, authorNames) : null,
        fetchBookReviews(bookData.id)
    ]);

    const mappedData = {
        id: bookData.id,
        title: bookTitle,
        author: authorNames,
        publishDate: bookData.releaseDate,
        img: bookData.thumbnailUrl,
        isFavorite: await fetchIsFavoriteStatus(bookData.id),

        // Content: Ưu tiên nội dung AI
        shortInfo: bookData.description ? bookData.description.substring(0, 150) + '...' : '',
        description: (aiAnalysis && aiAnalysis.description) ? aiAnalysis.description : bookData.description,
        authorNote: (aiAnalysis && aiAnalysis.authorNote) ? aiAnalysis.authorNote : `Tác giả: ${authorNames}`,
        relatedInfo: (aiAnalysis && aiAnalysis.relatedInfo) ? aiAnalysis.relatedInfo : `Quốc gia: ${bookData.country}, Ngôn ngữ: ${bookData.language}, NXB: ${bookData.publishingHouseName}`,
    };

    // 4. Khởi tạo Modules
    new BookBanner(mappedData);
    new BookContent(mappedData);
    new BookRatingSection(reviews);
});\