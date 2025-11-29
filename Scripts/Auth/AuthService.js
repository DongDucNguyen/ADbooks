export class AuthService {
    static get isLogedIn() {
        // Kiểm tra token có tồn tại và còn hạn không (Giả định token không rỗng là còn hạn)
        return localStorage.getItem("token") !== null;
    }

    static getAccessToken() {
        return localStorage.getItem("token");
    }

    static getUserInfo() {
        const userInfo = localStorage.getItem("userInfo");
        return userInfo ? JSON.parse(userInfo) : null;
    }

    static logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        // Giữ lại sessionStorage.removeItem("sessionActive"); nếu vẫn muốn dùng
        sessionStorage.removeItem("sessionActive");
        window.location.replace("/Login.html");
    }

    static navigateToLogin() {
        window.location.replace("/Login.html");
    }

    static navigateToHome() {
        window.location.replace("/Explore-Page.html");
    }
}