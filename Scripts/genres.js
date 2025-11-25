import { QuoteBanner } from './Genres/quote-banner.js';
import { FeaturedBooksSection } from './Genres/featured-books.js';
// Dữ liệu 5 câu trích dẫn (Bạn có thể thay đổi tùy ý)
const quotesData = [
    {
        text: "Nếu bạn chỉ đọc những cuốn sách mà mọi người đều đọc, bạn chỉ có thể nghĩ đến những điều mà mọi người đều nghĩ.",
        author: "Haruki Murakami"
    },
    {
        text: "Người đọc sách sống ngàn cuộc đời trước khi chết. Người không bao giờ đọc chỉ sống một cuộc đời.",
        author: "George R.R. Martin"
    },
    {
        text: "Sách là phép thuật duy nhất có thể mang theo bên mình.",
        author: "Stephen King"
    },
    {
        text: "Việc đọc sách rất quan trọng. Nếu bạn biết cách đọc, cả thế giới sẽ mở ra trước mắt bạn.",
        author: "Barack Obama"
    },
    {
        text: "Không có người bạn nào trung thành như một cuốn sách.",
        author: "Ernest Hemingway"
    }
];

const featuredBooksData = [
    // 0. VIỆT NAM
    [
        { id: "vn-01", title: "Mắt Biếc", author: "Nguyễn Nhật Ánh", img: "./Images/Book-Covers/b9.png", link: "./Details/book-vn-01.html" },
        { id: "vn-02", title: "Số Đỏ", author: "Vũ Trọng Phụng", img: "./Images/Book-Covers/b10.png" },
        { id: "vn-03", title: "Dế Mèn Phiêu Lưu Ký", author: "Tô Hoài", img: "./Images/Book-Covers/b11.png" },
        { id: "vn-04", title: "Đất Rừng Phương Nam", author: "Đoàn Giỏi", img: "./Images/Book-Covers/b12.png" },
        { id: "vn-05", title: "Cánh Đồng Bất Tận", author: "Nguyễn Ngọc Tư", img: "./Images/Book-Covers/b13.png" },
        { id: "vn-06", title: "Tuổi Thơ Dữ Dội", author: "Phùng Quán", img: "./Images/Book-Covers/b14.png" },
        { id: "vn-07", title: "Vợ Nhặt", author: "Kim Lân", img: "./Images/Book-Covers/b15.png" },
        { id: "vn-08", title: "Chí Phèo", author: "Nam Cao", img: "./Images/Book-Covers/b16.png" }
    ],
    // 1. NƯỚC NGOÀI
    [
        { id: "fr-01", title: "Harry Potter", author: "J.K. Rowling", img: "./Images/Book-Covers/b1.png" },
        { id: "fr-02", title: "The Great Gatsby", author: "F. Scott Fitzgerald", img: "./Images/Book-Covers/b2.png" },
        { id: "fr-03", title: "To Kill a Mockingbird", author: "Harper Lee", img: "./Images/Book-Covers/b3.png" },
        { id: "fr-04", title: "1984", author: "George Orwell", img: "./Images/Book-Covers/b4.png" },
        { id: "fr-05", title: "Don Quixote", author: "Cervantes", img: "./Images/Book-Covers/b5.png" },
        { id: "fr-06", title: "Sherlock Holmes", author: "Conan Doyle", img: "./Images/Book-Covers/b6.png" },
        { id: "fr-07", title: "Les Misérables", author: "Victor Hugo", img: "./Images/Book-Covers/b7.png" },
        { id: "fr-08", title: "Little Women", author: "Louisa May Alcott", img: "./Images/Book-Covers/b8.png" }
    ],
    // 2. ĐỜI SỐNG & XÃ HỘI
    [
        { id: "ls-01", title: "Đắc Nhân Tâm", author: "Dale Carnegie", img: "./Images/Book-Covers/b9.png" },
        { id: "ls-02", title: "Quẳng Gánh Lo Đi", author: "Dale Carnegie", img: "./Images/Book-Covers/b10.png" },
        { id: "ls-03", title: "Nhà Giả Kim", author: "Paulo Coelho", img: "./Images/Book-Covers/b11.png" },
        { id: "ls-04", title: "Hành Trình Về Phương Đông", author: "Baird T. Spalding", img: "./Images/Book-Covers/b12.png" },
        { id: "ls-05", title: "Sapiens", author: "Yuval Noah Harari", img: "./Images/Book-Covers/b13.png" },
        { id: "ls-06", title: "Tâm Lý Học Đám Đông", author: "Gustave Le Bon", img: "./Images/Book-Covers/b14.png" },
        { id: "ls-07", title: "Phi Lý Trí", author: "Dan Ariely", img: "./Images/Book-Covers/b15.png" },
        { id: "ls-08", title: "Đi Tìm Lẽ Sống", author: "Viktor Frankl", img: "./Images/Book-Covers/b16.png" }
    ],
    // 3. GIÁO DỤC
    [
        { id: "edu-01", title: "Khuyến Học", author: "Fukuzawa Yukichi", img: "./Images/Book-Covers/b1.png" },
        { id: "edu-02", title: "Em Phải Đến Harvard", author: "Lưu Vệ Hoa", img: "./Images/Book-Covers/b2.png" },
        { id: "edu-03", title: "Totto-chan", author: "Kuroyanagi Tetsuko", img: "./Images/Book-Covers/b3.png" },
        { id: "edu-04", title: "Người Thầy Đầu Tiên", author: "Chingiz Aitmatov", img: "./Images/Book-Covers/b4.png" },
        { id: "edu-05", title: "Chiến Binh Cầu Vồng", author: "Andrea Hirata", img: "./Images/Book-Covers/b5.png" },
        { id: "edu-06", title: "Tôi Tài Giỏi", author: "Adam Khoo", img: "./Images/Book-Covers/b6.png" },
        { id: "edu-07", title: "Dạy Con Làm Giàu", author: "Robert Kiyosaki", img: "./Images/Book-Covers/b7.png" },
        { id: "edu-08", title: "Trí Tuệ Do Thái", author: "Eran Katz", img: "./Images/Book-Covers/b8.png" }
    ],
    // 4. KHÁC
    [
        { id: "ot-01", title: "Nấu Ăn Cùng Mẹ", author: "Unknown", img: "./Images/Book-Covers/b9.png" },
        { id: "ot-02", title: "Mẹo Vặt Cuộc Sống", author: "Nhiều Tác Giả", img: "./Images/Book-Covers/b10.png" },
        { id: "ot-03", title: "Yoga Cơ Bản", author: "Master Yoga", img: "./Images/Book-Covers/b11.png" },
        { id: "ot-04", title: "Du Lịch Bụi", author: "Traveler", img: "./Images/Book-Covers/b12.png" },
        { id: "ot-05", title: "Thiền Định", author: "Monk", img: "./Images/Book-Covers/b13.png" },
        { id: "ot-06", title: "Làm Vườn", author: "Gardener", img: "./Images/Book-Covers/b14.png" },
        { id: "ot-07", title: "Nuôi Dạy Cún", author: "Pet Lover", img: "./Images/Book-Covers/b15.png" },
        { id: "ot-08", title: "Trà Đạo", author: "Tea Master", img: "./Images/Book-Covers/b16.png" }
    ]
];

document.addEventListener('DOMContentLoaded', () => {
    new QuoteBanner(quotesData);
    new FeaturedBooksSection(featuredBooksData);
});