import { httpClient } from './httpClient.js';

class UserService {
    // Lấy thông tin profile user hiện tại
    async getProfile() {
        return await httpClient.get('/v1/user/profile');
    }

    // Cập nhật thông tin profile
    async updateProfile(profileData) {
        // profileData: { fullName, email, ... }
        return await httpClient.put('/v1/user/profile', profileData);
    }

    // Xóa tài khoản
    async deleteAccount() {
        return await httpClient.delete('/v1/user/profile');
    }

    // Lấy danh sách bookmarks (đánh dấu trang)
    async getBookmarks(page = 0, size = 10) {
        return await httpClient.get('/v1/user/bookmarks', { page, size });
    }

    // Cập nhật tiến độ nghe (lưu vị trí giây đang nghe)
    async updateProgress(bookId, currentSecond) {
        return await httpClient.post('/v1/user/progress', { 
            bookId, 
            currentSecond 
        });
    }
}

export const userService = new UserService();