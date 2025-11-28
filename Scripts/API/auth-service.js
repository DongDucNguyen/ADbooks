import { httpClient } from './httpClient.js';

class AuthService {
    // Gọi API: POST /api/auth/signin
    async login(email, password) {
        try {
            // SỬA 1: Gửi key là "email" thay vì "username" để khớp với Postman
            const response = await httpClient.post('/auth/signin', { 
                email: email, 
                password: password 
            });
            
            // SỬA 2: Lấy token từ key "token" (theo ảnh Postman) thay vì "accessToken"
            if (response.token) {
                localStorage.setItem('accessToken', response.token);
                
                // Lưu thông tin user
                localStorage.setItem('user', JSON.stringify({
                    id: response.id,
                    username: response.username,
                    email: response.email,
                    roles: response.roles
                }));
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Gọi API: POST /api/auth/signup
    async register(registerData) {
        // registerData gồm: { username, email, password, firstName, lastName }
        
        const payload = {
            username: registerData.username,
            email: registerData.email,
            password: registerData.password,
            firstName: registerData.firstName,
            lastName: registerData.lastName,
            role: ["user"] // Mặc định role là user
        };

        return await httpClient.post('/auth/signup', payload);
    }

    logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        window.location.href = 'Login.html'; 
    }

    getCurrentUser() {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }

    isAuthenticated() {
        return !!localStorage.getItem('accessToken');
    }
}

export const authService = new AuthService();