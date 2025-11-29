// Scripts/listing.js
// Utility function to get URL parameter
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

export class ListingPage {
    #booksData = [];
    #container;
    #titleElement;
    #loadingTitle = "Đang tải...";
    #apiBase = "http://localhost:8080/api/v1/books";

    constructor() {
        this.#container = document.querySelector('.listing-container');
        this.#titleElement = document.querySelector('.listing-title-content');

        if (this.#container && this.#titleElement) {
            this.init();
        } else {
            console.warn('ListingPage: Không tìm thấy element cần thiết.');
        }
    }

    async init() {
        this.#titleElement.innerText = this.#loadingTitle;
        await this.#fetchBooks();
        this.#updateTitle();
        this.#renderList();
    }

    async #fetchBooks() {
        const savedGenre = localStorage.getItem('selectedGenre');
        const searchQuery = localStorage.getItem('searchQuery');
        const token = localStorage.getItem('token');
        let url = this.#apiBase;
        let authHeader = token ? { 'Authorization': `Bearer ${token}` } : {};

        try {
            if (searchQuery) {
                // Priority 1: Search Query (từ thanh search)
                url = `${this.#apiBase}?keyword=${encodeURIComponent(searchQuery)}&size=50`;
                localStorage.removeItem('searchQuery');
            } else if (savedGenre) {
                // Priority 2: Categorized List (từ Explore/User Page)
                if (savedGenre === "TOP TRENDING") {
                    url = `${this.#apiBase}?type=trending&size=50`;
                } else if (savedGenre === "SÁCH MỚI") {
                    url = `${this.#apiBase}?type=new&size=50`;
                } else if (savedGenre === "YÊU THÍCH") {
                    if (!token) throw new Error("Chưa đăng nhập");
                    url = `${this.#apiBase}/favorites?size=50`;
                } else if (savedGenre.toLowerCase().includes("lịch sử")) {
                    if (!token) throw new Error("Chưa đăng nhập");
                    url = `${this.#apiBase}/history?size=50`;
                } else {
                    // Default / Category
                    url = `${this.#apiBase}?size=50`;
                }
                localStorage.removeItem('selectedGenre'); // Xóa sau khi dùng
            } else {
                // Default: All books
                 url = `${this.#apiBase}?size=50`;
            }

            const response = await fetch(url, { headers: authHeader });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || response.statusText);
            }

            const data = await response.json();
            this.#booksData = data.content.map(book => ({
                id: book.id,
                title: book.name,
                author: book.authorNames || 'Đang cập nhật',
                description: "Đang cập nhật mô tả ngắn...", // Giả lập mô tả ngắn
                img: book.thumbnailUrl,
            }));

        } catch (error) {
            console.error("Lỗi khi fetch danh sách sách:", error.message);
            this.#booksData = [];
            this.#titleElement.innerText = "LỖI TẢI DỮ LIỆU";
        }
    }

    #updateTitle() {
        // Cập nhật tiêu đề từ nội dung đã lấy (nếu không phải lỗi)
        let currentTitle = this.#titleElement.innerText;
        if (currentTitle === this.#loadingTitle) {
             const originalTitle = localStorage.getItem('selectedGenre') || "Danh sách sách";
             this.#titleElement.innerText = originalTitle;
             document.title = `${originalTitle} - Listenary`;
        } else {
             return;
        }

        // Apply CSS color scheme (giữ lại logic màu cũ)
        const titleText = this.#titleElement.innerText;
        if (titleText === "TOP TRENDING" || titleText === "YÊU THÍCH") {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "../Styles/pink-color.css";
            document.head.appendChild(link);
        } else if (titleText === "SÁCH MỚI" || titleText.toLowerCase().includes("lịch sử")) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "../Styles/blue-color.css";
            document.head.appendChild(link);
        }
    }

    #renderList() {
        this.#container.innerHTML = '';
        if (this.#booksData.length === 0) {
            this.#container.innerHTML = '<p style="text-align:center;">Không tìm thấy sách phù hợp.</p>';
            return;
        }

        const html = this.#booksData.map((book, index) => {
            const variantClass = `element-card-${(index % 3) + 1}`;

            return `
            <div class="listed-element-card ${variantClass} jstoBookDetailPage" data-book-id="${book.id}">
                <div class="listing-grid">
                    <div class="listed-element-image">
                        <img src="${book.img}" alt="${book.title}" onerror="this.src='../Images/Book-Covers/default.png'">
                    </div>
                    <div class="listing-card-info">
                        <p class="listing-element-title">${book.title}</p>
                        <p class="listing-element-author">${book.author}</p>
                        <p class="listing-element-des">${book.description}</p>
                    </div>
                </div>
            </div>
            `;
        }).join('');

        this.#container.innerHTML = html;
    }
}

// Khởi tạo
document.addEventListener('DOMContentLoaded', () => {
    new ListingPage();
});