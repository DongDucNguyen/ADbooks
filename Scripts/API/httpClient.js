import API_CONFIG from './config.js';

class HttpClient {
    /**
     * Hàm xử lý chính cho mọi request
     * @param {string} endpoint - Đường dẫn API (vd: '/v1/books')
     * @param {object} options - Cấu hình fetch (method, body, headers...)
     */
    async request(endpoint, options = {}) {
        const url = `${API_CONFIG.BASE_URL}${endpoint}`;
        
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        // 1. Tự động lấy Token từ LocalStorage đính kèm vào Header
        const token = localStorage.getItem('accessToken');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const config = {
            ...options,
            headers,
        };

        try {
            const response = await fetch(url, config);

            // 2. Xử lý khi Token hết hạn hoặc không hợp lệ (401)
            if (response.status === 401) {
                console.warn('Unauthorized! Clearing session...');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
                // Tùy chọn: Redirect về trang login
                // window.location.href = '/ADbooks/Login.html';
                throw new Error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
            }

            // 3. Xử lý lỗi từ Server trả về
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Lỗi ${response.status}: ${response.statusText}`);
            }

            // 4. Xử lý response không có body (ví dụ 204)
            if (response.status === 204) {
                return null;
            }

            return await response.json();
        } catch (error) {
            console.error('API Request Failed:', error);
            throw error;
        }
    }

    // Helper methods cho các method phổ biến
    get(endpoint, params = {}) {
        // Chuyển object params thành query string (vd: ?page=1&size=10)
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `${endpoint}?${queryString}` : endpoint;
        return this.request(url, { method: 'GET' });
    }

    post(endpoint, body) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
        });
    }

    put(endpoint, body) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body),
        });
    }

    delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
}

export const httpClient = new HttpClient();