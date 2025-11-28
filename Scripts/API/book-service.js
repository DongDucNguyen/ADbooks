import { httpClient } from './httpClient.js';

class BookService {
    // --- PUBLIC APIs (Không cần đăng nhập) ---

    /**
     * Lấy danh sách sách (Hỗ trợ lọc, tìm kiếm, phân trang)
     * @param {Object} params - { keyword, categoryId, type, page, size, sortBy, direction }
     * type: 'trending' | 'new' | 'all'
     */
    async getBooks(params = {}) {
        return await httpClient.get('/v1/books', params);
    }

    // Lấy chi tiết sách theo ID
    async getBookById(id) {
        return await httpClient.get(`/v1/books/${id}`);
    }

    // Lấy sách liên quan
    async getRelatedBooks(id, page = 0, size = 6) {
        return await httpClient.get(`/v1/books/${id}/related`, { page, size });
    }

    // Lấy danh sách review của sách
    async getBookReviews(id, page = 0, size = 5) {
        return await httpClient.get(`/v1/books/${id}/reviews`, { page, size });
    }

    // --- USER SPECIFIC APIs (Cần Token - httpClient tự xử lý) ---

    // Lấy danh sách yêu thích của user
    async getUserFavorites(page = 0, size = 10) {
        return await httpClient.get('/v1/books/favorites', { page, size });
    }

    // Lấy lịch sử nghe của user
    async getUserHistory(page = 0, size = 10) {
        return await httpClient.get('/v1/books/history', { page, size });
    }

    // Thêm review cho sách
    async addReview(bookId, reviewData) {
        // reviewData: { rating, comment }
        return await httpClient.post(`/v1/books/${bookId}/reviews`, reviewData);
    }

    // Thích / Bỏ thích sách
    async toggleFavorite(bookId) {
        return await httpClient.post(`/v1/books/${bookId}/favorite`);
    }

    // --- AI FEATURES ---
    
    // Phân tích sách bằng AI
    async analyzeBookAI(bookTitle, authorName) {
        return await httpClient.post('/v1/books/ai/analyze', { bookTitle, authorName });
    }
}

export const bookService = new BookService();