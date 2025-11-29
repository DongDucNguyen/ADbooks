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
    // 0. VIỆT NAM (Category ID: 1)
    [
        { id: 17, title: "Có 2 con mèo ngồi bên cửa sổ", author: "Nguyễn Nhật Ánh", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/17_14.png" },
        { id: 12, title: "Số đỏ", author: "Vũ Trọng Phụng", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/12_10.png" },
        { id: 13, title: "Búp sen xanh", author: "Sơn Tùng", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/13_11.png" },
        { id: 16, title: "Tắt đèn", author: "Ngô Tất Tố", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/16_13.png" },
        { id: 20, title: "Lão Hạc", author: "Nam Cao", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/20_9.png" },
        { id: 14, title: "Mưa đỏ", author: "Chu Lai", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/14_12.png" },
        { id: 11, title: "Đời thừa", author: "Nam Cao", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/11_9.png" },
        { id: 15, title: "Cơm thầy cơm cô", author: "Vũ Trọng Phụng", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/15_10.png" }
    ],
    // 1. NƯỚC NGOÀI (Category ID: 2)
    [
        { id: 27, title: "Nhà giả kim", author: "Paulo Coelho", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/27_22.png" },
        { id: 25, title: "1984", author: "George Orwell", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/25_21.png" },
        { id: 22, title: "Người đua diều", author: "Khaled Hosseini", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/22_18.png" },
        { id: 21, title: "Chúa ruồi", author: "William Golding", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/21_17.png" },
        { id: 24, title: "Chú bé mang pyjama sọc", author: "John Boyne", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/24_20.png" },
        { id: 26, title: "Trại súc vật", author: "George Orwell", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/26_21.png" },
        { id: 28, title: "Điều kỳ diệu của tiệm tạp hóa Namiya", author: "Higashino Keigo", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/28_23.png" },
        { id: 30, title: "Bố con cá gai", author: "Cho Chang-in", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/30_24.png" }
    ],
    // 2. ĐỜI SỐNG & XÃ HỘI (Category ID: 3)
    [
        { id: 10, title: "Đắc nhân tâm", author: "Dale Carnegie", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/10_8.png" },
        { id: 9, title: "Quẳng gánh lo đi mà vui sống", author: "Dale Carnegie", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/9_8.png" },
        { id: 7, title: "Đời ngắn đừng ngủ dài", author: "Robin Sharma", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/7_6.png" },
        { id: 8, title: "Thức tỉnh mục đích sống", author: "Eckhart Tolle", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/8_7.png" },
        { id: 6, title: "Ba người thầy vĩ đại", author: "Robin Sharma", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/6_6.png" },
        { id: 4, title: "Bàn về tự do", author: "John Stuart Mill", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/4_4.png" },
        { id: 5, title: "Đường về nô lệ", author: "Friedrich Hayek", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/5_5.png" },
        { id: 2, title: "Cộng Hòa", author: "Plato", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/2_2.png" }
    ],
    // 3. GIÁO DỤC (Category ID: 4)
    [
        { id: 33, title: "Khuyến học", author: "Yukichi Fukuzawa", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/33_27.png" },
        { id: 31, title: "Được học", author: "Tara Westover", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/31_25.png" },
        { id: 39, title: "Cha giàu cha nghèo - Tập 1", author: "Robert T. Kiyosaki", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/39_32.png" },
        { id: 35, title: "Phương pháp giáo dục con của người Do Thái", author: "Trần Hân", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/35_29.png" },
        { id: 34, title: "Người thầy", author: "Frank McCourt", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/34_28.png" },
        { id: 36, title: "Emile hay là về giáo dục", author: "Jean-Jacques Rousseau", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/36_3.png" },
        { id: 37, title: "Thiên tài và sự giáo dục từ sớm", author: "Kyuichi Kimura", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/37_30.png" },
        { id: 40, title: "Những tù nhân của địa lý", author: "Tim Marshall", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/40_33.png" }
    ],
    // 4. KHÁC (Category ID: 5 - Khoa học, Hồi ký, Kỹ năng...)
    [
        { id: 42, title: "Lược sử loài người", author: "Yuval Noah Harari", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/42_35.png" },
        { id: 50, title: "Nhật ký Đặng Thùy Trâm", author: "Đặng Thùy Trâm", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/50_43.png" },
        { id: 44, title: "Từ tốt đến vĩ đại", author: "Jim Collins", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/44_37.png" },
        { id: 41, title: "Vũ trụ trong vỏ hạt dẻ", author: "Stephen Hawking", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/41_34.png" },
        { id: 46, title: "Ngày xưa có 1 con bò", author: "Camilo Cruz", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/46_39.png" },
        { id: 47, title: "Ai và Ky ở xứ sở những con số tàng hình", author: "Ngô Bảo Châu", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/47_40.png" },
        { id: 45, title: "Vị tu sĩ bán chiếc Ferrari", author: "Robin Sharma", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/45_38.png" },
        { id: 49, title: "Mình là cá, việc của mình là bơi", author: "Takeshi Furukawa", img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/49_42.png" }
    ]
];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Khởi tạo các Class hiển thị cũ
    new QuoteBanner(quotesData);
    new FeaturedBooksSection(featuredBooksData);

    // 2. LOGIC MỚI: Xử lý click menu thể loại
    // Mục đích: Lưu tên thể loại vào bộ nhớ trình duyệt trước khi chuyển trang
    const genreLinks = document.querySelectorAll('.genres-navigation a');

    genreLinks.forEach(link => {
        link.addEventListener('click', function() {

            const genreName = this.innerText;
            localStorage.setItem('selectedGenre', genreName);
        });
    });
});