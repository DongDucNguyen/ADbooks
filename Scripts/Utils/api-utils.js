const BASE_URL = 'http://localhost:8080/api/v1';
const AUTH_URL = 'http://localhost:8080/api/auth';

/**
 * Lấy thông tin user (token, id) từ localStorage
 */
function getStoredUser() {
    const user = localStorage.getItem('userLogin');
    return user ? JSON.parse(user) : null;
}

/**
 * Hàm fetch tùy chỉnh có thêm Auth Header và xử lý lỗi chung.
 * @param {string} endpoint - Đường dẫn API, bắt đầu bằng /books, /user, /authors, hoặc full URL.
 * @param {object} options - Tùy chọn fetch (method, body,...)
 */
async function fetchAuthenticated(endpoint, options = {}) {
    const isPublic = endpoint.includes('/auth') || endpoint.includes('/books/ai/analyze');
    const user = getStoredUser();

    if (!isPublic && !user) {
        console.error('UNAUTHORIZED: Missing JWT Token. Redirecting to Login.');
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/Login.html';
        throw new Error("UNAUTHORIZED: Missing JWT Token");
    }

    const targetUrl = endpoint.startsWith('/') ? `${BASE_URL}${endpoint}` : endpoint;

    const defaultHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    if (user && user.token) {
        defaultHeaders['Authorization'] = `Bearer ${user.token}`;
    }

    const response = await fetch(targetUrl.replace(BASE_URL, ''), { // Thay thế BASE_URL bằng targetUrl.replace(BASE_URL, '')
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers
        }
    });

    if (response.status === 401) {
        localStorage.clear();
        sessionStorage.clear();
        alert("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
        window.location.href = '/Login.html';
    }

    return response;
}

export {
    BASE_URL,
    AUTH_URL,
    getStoredUser,
    fetchAuthenticated
};