import { AuthService } from "../Auth/AuthService.js"; // Import AuthService

 export class UserFavoriteSection {
     #data;
     #container;

     // Xóa #token khỏi constructor
     constructor(data) {
         this.#data = data; // Vẫn dùng mock data ban đầu để giữ UI không vỡ nếu fetch fail
         this.#container = document.querySelector('.js-favorite-container');
         // Xóa this.#token = token;
         if (this.#container) this.init();
     }

     async init() {
         // Gọi fetch API ngay lập tức
         await this.#fetchFavorites();
         this.#render();
         this.#addEventListeners();
     }

     async #fetchFavorites(page = 0, size = 6) {
         const token = AuthService.getAccessToken(); // Lấy Token từ Auth Service

         if (!token) {
             console.warn('UserFavoriteSection: Không tìm thấy Token, không thể tải danh sách Yêu thích.');
             this.#data = [];
             return;
         }

         try {
             const res = await fetch(`http://localhost:8080/api/v1/books/favorites?page=${page}&size=${size}`, {
                 method: 'GET',
                 headers: {
                     'Content-Type': 'application/json',
                     'Authorization': `Bearer ${token}` // Gửi Token
                 }
             });

             if (!res.ok) {
                 // Nếu lỗi 401/403, có thể chuyển hướng về Login
                 if (res.status === 401 || res.status === 403) {
                      // AuthService.navigateToLogin(); // Có thể thực hiện nếu muốn nghiêm ngặt
                 }
                 throw new Error(`Failed to fetch favorites: ${res.statusText}`);
             }

             const result = await res.json();
             // Cần ánh xạ DTO từ Backend (BookSlimResponse) sang cấu trúc mock data Frontend
             this.#data = result.content.map(book => ({
                 id: book.id,
                 title: book.name,
                 img: book.thumbnailUrl || './Images/Book-Covers/default.png',
                 link: `./Details/book.html?id=${book.id}` // Link cần có ID để load chi tiết
             }));

         } catch (err) {
             console.error('Error fetching favorites:', err);
             // Giữ lại mock data ban đầu nếu thất bại
             // this.#data = this.#data;
         }
     }

    #render() {
        if (!this.#data.length) {
            this.#container.innerHTML = '<p>Không có sách yêu thích nào.</p>';
            return;
        }

        const listHtml = this.#data.slice(0, 6).map(book => `
            <div class="favorite-card jstoBookDetailPage" 
                 data-book-id="${book.id}">
                 
                <img src="${book.img}" alt="${book.title}" onerror="this.src='../Images/Book-Covers/default.png'">
                <div>${book.title}</div>
            </div>
        `).join('');

        this.#container.innerHTML = `
            <p class="favorite-title">YÊU THÍCH</p>
            <div class="favorite-grid">
                ${listHtml}
            </div>
            <div class="line"></div>
            <div class="all-favorites" style="cursor: pointer;">Tất cả</div>
        `;
    }

    // [NEW] Xử lý sự kiện click "Tất cả"
    #addEventListeners() {
        const viewAllBtn = this.#container.querySelector('.all-favorites');
        
        if (viewAllBtn) {
            viewAllBtn.addEventListener('click', () => {
                // 1. Lưu tiêu đề mong muốn cho trang Listing Book
                localStorage.setItem('selectedGenre', "YÊU THÍCH");
                
                // 2. Điều hướng tới trang danh sách sách
                window.location.href = "./Details/Listing-Book-Page.html";
            });
        }

        // [Optional] Thêm click từng sách để đi chi tiết
        this.#container.querySelectorAll('.jstoBookDetailPage').forEach(card => {
            card.addEventListener('click', () => {
                const bookId = card.dataset.bookId;
                localStorage.setItem('selectedBookId', bookId);
                window.location.href = "./Details/Book-Detail-Page.html";
            });
        });
    }
}