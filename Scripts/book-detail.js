import { BookBanner } from './Book-Detail/book-banner.js';
import { BookContent } from './Book-Detail/book-content.js';
import { BookRatingSection } from './Book-Detail/book-rating.js';

// --- MOCK DATA ---
const MOCK_BOOK_DETAIL = {
    id: "b9",
    title: "Đồi Gió Hú",
    author: "Emily Brontë",
    publishDate: "20/11/2024",
    img: "../Images/Book-Covers/b9.png",
    shortInfo: "Một tác phẩm kinh điển về tình yêu và hận thù...",
    
    // [UPDATE 1] Trạng thái yêu thích ban đầu
    isFavorite: false, 

    description: `<p>"Đồi gió hú" là tiểu thuyết duy nhất của Emily Brontë...</p>`,
    authorNote: `<p>Emily Brontë (1818–1848) là một nhà thơ và tiểu thuyết gia...</p>`,
    relatedInfo: `<p>Thể loại: Văn học cổ điển, Lãng mạn.</p>`,

    // [UPDATE 2] Thêm ID cho từng review
    reviewsList: [
        {
            id: 101, // ID riêng biệt
            name: "Nguyễn Văn A",
            date: "20/11/2024",
            score: 5.0,
            title: "Tuyệt phẩm!",
            content: "Một tuyệt tác! Câu chuyện tình yêu quá mãnh liệt."
        },
        {
            id: 102,
            name: "Trần Thị B",
            date: "18/11/2024",
            score: 4.5,
            title: "Rất hay",
            content: "Sách in đẹp, giao hàng nhanh."
        },
        {
            id: 103,
            name: "User C",
            date: "15/11/2024",
            score: 3.0,
            title: "Tạm ổn",
            content: "Nội dung hơi kén người đọc."
        },
        {
            id: 104,
            name: "User D",
            date: "10/11/2024",
            score: 5.0,
            title: "Kinh điển",
            content: "Không có gì để chê. Phải đọc 1 lần trong đời."
        },
        {
            id: 105,
            name: "User E",
            date: "05/11/2024",
            score: 2.0,
            title: "Khó hiểu",
            content: "Văn phong cổ quá đọc thấy mệt."
        },
        {
            id: 106,
            name: "User F",
            date: "01/11/2024",
            score: 5.0,
            title: "Xuất sắc",
            content: "Bìa đẹp, nội dung sâu sắc."
        }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    new BookBanner(MOCK_BOOK_DETAIL);
    new BookContent(MOCK_BOOK_DETAIL);
    new BookRatingSection(MOCK_BOOK_DETAIL.reviewsList);
});