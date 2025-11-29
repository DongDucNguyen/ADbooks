import {HeroSlider} from "./Explore-Page/hero-banner.js";
import { TrendingSection } from './Explore-Page/top-trending.js';
import { NewBooksSection } from './Explore-Page/new-books.js'; // <--- Import mới
const banners = [
    {
        id: "1",
        name: 'Chính trị luận',
        description: 'Chính trị luận (tiếng Hy Lạp: Politika) là một trong những tác phẩm triết học chính trị kinh điển của Aristotle, được viết khoảng năm 350 TCN...',
        link: '#',
        img: 'https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/1_1.png'
    },
    {
        id: "2",
        name: 'Cộng Hòa',
        description: 'Cộng hòa (tiếng Hy Lạp: Politeia) là tác phẩm triết học nổi tiếng nhất của Plato, được viết khoảng năm 380 TCN trong giai đoạn ông giảng dạy tại Học viện Plato ở Athens...',
        link: '#',
        img: 'https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/2_2.png'
    },
    {
        id: "3",
        name: 'Bàn về khế ước xã hội',
        description: 'Bàn về khế ước xã hội (tiếng Pháp: Du contrat social ou Principes du droit politique) là tác phẩm chính trị – triết học nổi tiếng của Jean-Jacques Rousseau, xuất bản năm 1762 tại Pháp, trong bối cảnh chế độ phong kiến...',
        link: '#',
        img: 'https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/3_3.png'
    }
];

const trendingData = [
    {
        id: 11,
        title: "Đời thừa",
        author: "Nam Cao",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/11_9.png",
        rating: 5.0, // Sẽ map thành rating-50.png
        reviewCount: "1,000,000"
    },
    {
        id: 12,
        title: "Số đỏ",
        author: "Vũ Trọng Phụng",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/12_10.png",
        rating: 4.5, // Sẽ map thành rating-45.png
        reviewCount: "850,000"
    },
    {
        id: 13,
        title: "Búp sen xanh",
        author: "Sơn Tùng",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/13_11.png",
        rating: 4.8, // Làm tròn map thành rating-50.png hoặc logic tùy chỉnh
        reviewCount: "2,000,000"
    },
    {
        id: 14,
        title: "Mưa đỏ",
        author: "Chu Lai",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/14_12.png",
        rating: 4.0, // Sẽ map thành rating-40.png
        reviewCount: "1,500,000"
    },
    {
        id: 25,
        title: "1984",
        author: "George Orwell",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/25_21.png",
        rating: 3.5, // Sẽ map thành rating-35.png
        reviewCount: "900,000"
    },
    {
        id: 26,
        title: "Trại súc vật",
        author: "George Orwell",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/26_21.png",
        rating: 4.5, // Sẽ map thành rating-45.png
        reviewCount: "120,000"
    }
];

const newBooksData = [
    {
        id: 27,
        title: "Nhà giả kim",
        author: "Paulo Coelho",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/27_22.png",
        rating: 4.8,
        reviewCount: "5,000,000",
        description: "Nhà giả kim kể về hành trình của chàng chăn cừu Santiago đi tìm “kho báu” của đời mình. Trên đường đi, cậu nhận ra kho báu thật sự nằm trong chính bản thân và hành trình khám phá cuộc sống."
    },
    {
        id: 42,
        title: "Lược sử loài người",
        author: "Yuval Noah Harari",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/42_35.png",
        rating: 4.9,
        reviewCount: "850,000",
        description: "Kể lại hành trình phát triển của Homo sapiens từ thuở săn bắt – hái lượm đến thời đại công nghệ. Tác phẩm đặt ra nhiều câu hỏi sâu sắc về trí tuệ, quyền lực, hạnh phúc và tương lai của nhân loại."
    },
    {
        id: 25,
        title: "1984",
        author: "George Orwell",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/25_21.png",
        rating: 4.7,
        reviewCount: "1,200,000",
        description: "Tiểu thuyết chính trị – viễn tưởng kinh điển của George Orwell, miêu tả một xã hội toàn trị nơi mọi hành động, lời nói và ý nghĩ đều bị giám sát bởi “Đảng” và “Anh Cả”."
    },
    {
        id: 22,
        title: "Người đua diều",
        author: "Khaled Hosseini",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/22_18.png",
        rating: 4.8,
        reviewCount: "920,000",
        description: "Người đua diều kể về tình bạn cảm động giữa Amir và Hassan – hai cậu bé lớn lên ở Afghanistan trước khi đất nước rơi vào chiến tranh. Tác phẩm là câu chuyện về tội lỗi, sự tha thứ và tình cha con."
    },
    {
        id: 17,
        title: "Có 2 con mèo ngồi bên cửa sổ",
        author: "Nguyễn Nhật Ánh",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/17_14.png",
        rating: 4.6,
        reviewCount: "350,000",
        description: "Tác phẩm là câu chuyện ngụ ngôn nhẹ nhàng về tình bạn, tình yêu và lòng bao dung giữa hai chú mèo Gấu và Mun. Với giọng kể hài hước, hóm hỉnh, tác phẩm gửi gắm thông điệp nhân văn sâu sắc."
    },
    {
        id: 30,
        title: "Bố con cá gai",
        author: "Cho Chang-in",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/30_24.png",
        rating: 4.9,
        reviewCount: "400,000",
        description: "Một câu chuyện xúc động về tình phụ tử, về những tổn thương, sự thấu hiểu và sức mạnh của tình yêu trong gia đình. Hành trình người cha cùng con trai mắc bệnh hiểm nghèo đi dọc đất nước Hàn Quốc."
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const slider = new HeroSlider(banners);
    const trendingSection = new TrendingSection(trendingData);
    const newBooksSection = new NewBooksSection(newBooksData);
    document.querySelector('.Top-Trending').addEventListener('click', function() {
        localStorage.setItem('selectedGenre', "TOP TRENDING");
    });
    document.querySelector('.background-text').addEventListener('click', function() {
        localStorage.setItem('selectedGenre', "SÁCH MỚI");
    });
});
