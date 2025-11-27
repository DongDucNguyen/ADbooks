import { AuthorIntro } from './Author-Detail/author-intro.js';
import { AuthorTopBooks } from './Author-Detail/author-top-books.js';
import { AuthorInfo } from './Author-Detail/author-info.js';
import { AuthorRatingSection } from './Author-Detail/author-rating.js';

// --- MOCK DATA ---
const MOCK_AUTHOR_DATA = {
    id: "a1",
    name: "Anthony Doerr",
    dob: "27/10/1973",
    img: "../Images/Authors/a1.jpg",
    shortDesc: `Là một tác giả tiểu thuyết và truyện ngắn người Mỹ. Ông được công chúng biết đến rộng rãi với cuốn tiểu thuyết " All the Light We Cannot See" (Ánh Sáng Chúng Ta Không Thể Thấy) xuất bản năm 2014 , tác phẩm đã giành giải Pulitzer cho tiểu thuyết hư cấu .`,
    
    topBooks: [
        { id: "b1", title: "All The Light We Cannot See", img: "../Images/Book-Covers/b1.png" },
        { id: "b2", title: "Cloud Cuckoo Land", img: "../Images/Book-Covers/b2.png" },
        { id: "b3", title: "About Grace", img: "../Images/Book-Covers/b3.png" },
        { id: "b4", title: "Four Seasons in Rome", img: "../Images/Book-Covers/b4.png" },
        { id: "b5", title: "The Shell Collector", img: "../Images/Book-Covers/b5.png" },
        { id: "b6", title: "Memory Wall", img: "../Images/Book-Covers/b6.png" }
    ],

    fullDescription: `
        <p>Anthony Doerr sinh ra và lớn lên ở Cleveland, Ohio...</p>
    `,
    relatedInfo: `
        <p>Quốc tịch: Mỹ</p>
        <p>Giải thưởng: Pulitzer Prize (2015)</p>
    `,

    // [UPDATE] Thêm ID và Book Title vào reviews
    reviews: [
        {
            id: 201, // ID riêng
            bookTitle: "All The Light We Cannot See", // Tên sách được review
            name: "Độc giả A",
            date: "22/11/2024",
            score: 5.0,
            title: "Tác giả yêu thích",
            content: "Văn phong của Anthony Doerr thực sự rất đẹp, giàu hình ảnh và cảm xúc."
        },
        {
            id: 202,
            bookTitle: "Cloud Cuckoo Land",
            name: "Độc giả B",
            date: "10/11/2024",
            score: 4.5,
            title: "Tuyệt vời",
            content: "Cốt truyện đan xen quá khứ và hiện tại rất khéo léo."
        },
        {
            id: 203,
            bookTitle: "About Grace",
            name: "Độc giả C",
            date: "05/11/2024",
            score: 3.0,
            title: "Hơi khó đọc",
            content: "Mạch truyện chậm, cần kiên nhẫn."
        },
        {
            id: 204,
            bookTitle: "All The Light We Cannot See",
            name: "Độc giả D",
            date: "01/11/2024",
            score: 5.0,
            title: "Ánh sáng vô hình",
            content: "Cuốn sách hay nhất mình từng đọc trong năm nay."
        },
        {
            id: 205,
            bookTitle: "Memory Wall",
            name: "Độc giả E",
            date: "20/10/2024",
            score: 2.0,
            title: "Không hợp gu",
            content: "Quá nhiều miêu tả, ít đối thoại."
        }
    ]
};

// --- MAIN EXECUTION ---
document.addEventListener('DOMContentLoaded', () => {
    new AuthorIntro(MOCK_AUTHOR_DATA);
    new AuthorTopBooks(MOCK_AUTHOR_DATA.topBooks, MOCK_AUTHOR_DATA.name);
    new AuthorInfo(MOCK_AUTHOR_DATA);
    new AuthorRatingSection(MOCK_AUTHOR_DATA.reviews);
    document.querySelector('.all-ratings').addEventListener('click', function() {
        localStorage.setItem('selectedAuthorCategory', MOCK_AUTHOR_DATA.name);
    });
});
