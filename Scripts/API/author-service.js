import { httpClient } from './httpClient.js';

class AuthorService {
    // 1. Lấy danh sách tác giả (Dùng cho trang Author-Page và User-Page)
    async getAuthors(params = {}) {
        const defaultParams = {
            page: 0,
            size: 12, // Lấy đủ số lượng để chia layout
            sortBy: 'id', // Sắp xếp theo ID để ổn định dữ liệu
            ...params
        };
        
        // Loại bỏ các param gây lỗi 500 ở backend hiện tại
        if (params.type === 'recent' || params.type === 'rising') {
            delete params.type;
        }

        const response = await httpClient.get('/v1/authors', defaultParams);
        
        // Theo Postman: Dữ liệu danh sách nằm trong key "content"
        return response.content || []; 
    }

    // 2. Lấy chi tiết tác giả (Dùng cho trang author.html)
    async getAuthorById(id) {
        // Theo Postman: Trả về trực tiếp object Author
        return await httpClient.get(`/v1/authors/${id}`);
    }
}

export const authorService = new AuthorService();