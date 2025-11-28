import { HeroSlider } from './Explore-Page/hero-banner.js';
import { TrendingSection } from './Explore-Page/top-trending.js';
import { NewBooksSection } from './Explore-Page/new-books.js';

// Cấu hình API (Đã xác nhận chạy ở port 8080 qua Postman)
const API_BASE_URL = 'http://localhost:8080/api/v1';

// Dữ liệu cứng cho Banner (Giữ nguyên)
const STATIC_BANNERS = [
    {
        id: 1,
        name: "Dune",
        description: "Hành trình của Paul Atreides...",
        img: "./Images/Book-Covers/b1.png",
        link: "./Details/book.html?id=1"
    },
    {
        id: 2,
        name: "Nhà Giả Kim",
        description: "Tiểu thuyết kể về hành trình đi tìm kho báu của chàng chăn cừu Santiago.",
        img: "./Images/Book-Covers/b2.png",
        link: "./Details/book.html?id=2"
    },
    {
        id: 3,
        name: "Đắc Nhân Tâm",
        description: "Cuốn sách nổi tiếng nhất về nghệ thuật giao tiếp và thu phục lòng người.",
        img: "./Images/Book-Covers/b3.png",
        link: "./Details/book.html?id=3"
    }
];

// Hàm gọi API chung
async function fetchFromAPI(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) {
            console.warn(`API ${endpoint} lỗi: ${response.status}`);
            return [];
        }
        const data = await response.json();
        // Spring Boot trả về Page, dữ liệu nằm trong 'content'
        return data.content || []; 
    } catch (error) {
        console.error(`Lỗi kết nối API ${endpoint}:`, error);
        return [];
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Hiển thị Banner tĩnh
    new HeroSlider(STATIC_BANNERS);

    console.log('Đang tải dữ liệu từ Server...');
    
    // 2. Gọi API
    const [trendingBooks, newBooks] = await Promise.all([
        // TRENDING: Sắp xếp theo viewCount giảm dần (desc) để lấy sách xem nhiều nhất
        fetchFromAPI('/books?page=0&size=6&sort=viewCount,desc'),
        
        // NEW BOOKS: Sắp xếp theo ngày phát hành hoặc ID mới nhất
        fetchFromAPI('/books?page=0&size=6&sort=id,desc')
    ]);

    // 3. Hàm Map dữ liệu (Cập nhật theo JSON Postman)
    const mapBookData = (book) => {
        // Lấy tên tác giả đầu tiên từ mảng authors
        const authorName = (book.authors && book.authors.length > 0) 
            ? book.authors[0].fullName 
            : 'Unknown Author';

        return {
            id: book.id,
            title: book.name, // JSON trả về 'name', không phải 'title'
            author: authorName,
            img: book.thumbnailUrl || './Images/Book-Covers/book.png', // JSON trả về 'thumbnailUrl'
            rating: book.averageRating || 0,
            reviewCount: book.totalReviews || 0,
            description: book.description || '',
            link: `./Details/book.html?id=${book.id}`
        };
    };

    // 4. Render giao diện
    if (trendingBooks.length > 0) {
        new TrendingSection(trendingBooks.map(mapBookData));
    }

    if (newBooks.length > 0) {
        new NewBooksSection(newBooks.map(mapBookData));
    }
});
