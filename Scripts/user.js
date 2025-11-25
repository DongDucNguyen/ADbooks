import { BookmarkSection } from './User/bookmarks.js';
import { UserAuthorSection } from './User/authors.js';
import { UserRatingSection } from './User/ratings.js';
import { UserFavoriteSection } from './User/favorites.js';
import { EditProfileModal } from './User/edit-profile.js';
// --- DỮ LIỆU MẪU (Mock Data) ---

const bookmarkData = [
    { id: 1, img: './Images/Book-Covers/b1.png', title: "Life Of The Wild", author: "Unknown", lastView: "10:30 24/11/2025", progress: "45%", link: "#" },
    { id: 2, img: './Images/Book-Covers/b2.png', title: "Journey Time", author: "H.G. Wells", lastView: "22:15 23/11/2025", progress: "12%", link: "#" },
    { id: 3, img: './Images/Book-Covers/b3.png', title: "Mystery Ocean", author: "Jules Verne", lastView: "08:00 20/11/2025", progress: "88%", link: "#" },
    { id: 4, img: './Images/Book-Covers/b4.png', title: "Crawdads Sing", author: "Delia Owens", lastView: "14:20 19/11/2025", progress: "30%", link: "#" },
    { id: 5, img: './Images/Book-Covers/b5.png', title: "Rich Asians", author: "Kevin Kwan", lastView: "09:45 18/11/2025", progress: "99%", link: "#" }
];

const authorData = [
    { 
        id: "au-01", // ID Tác giả
        name: "Nguyễn Nhật Ánh", 
        img: "./Images/Authors/a1.jpg", 
        link: "./Details/author-01.html",
        books: [
            { id: "b-na-01", title: "Mắt Biếc", link: "./Details/book-mat-biec.html" },
            { id: "b-na-02", title: "Tôi thấy hoa vàng trên cỏ xanh", link: "./Details/book-hoa-vang.html" }
        ] 
    },
    { 
        id: "au-02",
        name: "J.K. Rowling", 
        img: "./Images/Authors/a2.png", 
        link: "./Details/author-02.html",
        books: [
            { id: "b-jk-01", title: "Harry Potter và Hòn đá Phù thủy", link: "#" },
            { id: "b-jk-02", title: "Harry Potter và Phòng chứa Bí mật", link: "#" },
            { id: "b-jk-03", title: "Harry Potter và Tên tù nhân ngục Azkaban", link: "#" }
        ]
    }, 
    { 
        id: "au-03",
        name: "Haruki Murakami", 
        img: "./Images/Authors/a3.jpg", 
        link: "./Details/author-03.html",
        books: [
            { id: "b-hm-01", title: "Rừng Na Uy", link: "#" },
            { id: "b-hm-02", title: "Kafka bên bờ biển", link: "#" }
        ]
    },
    { 
        id: "au-04",
        name: "Stephen King", 
        img: "./Images/Authors/a4.jpg", 
        link: "./Details/author-04.html",
        books: [
            { id: "b-sk-01", title: "It (Gã Hề Ma Quái)", link: "#" },
            { id: "b-sk-02", title: "The Shining", link: "#" }
        ]
    }
];

const ratingData = [
    { 
        id: "rt-01", // ID của đánh giá
        bookTitle: "Đồi Gió Hú", 
        date: "24/11/2025", 
        star: 5.0, // Sẽ map ra rating-50.png
        content: "Một tuyệt tác! Câu chuyện tình yêu quá mãnh liệt." 
    },
    { 
        id: "rt-02",
        bookTitle: "Nhà Giả Kim", 
        date: "20/11/2025", 
        star: 4.5, // Sẽ map ra rating-45.png
        content: "Sách nhẹ nhàng, nhiều bài học triết lý." 
    },
    { 
        id: "rt-03",
        bookTitle: "Harry Potter", 
        date: "15/11/2025", 
        star: 5.0, // Sẽ map ra rating-50.png
        content: "Tuổi thơ ùa về. Đọc lại vẫn thấy hay." 
    },
    { 
        id: "rt-04",
        bookTitle: "Mắt Biếc", 
        date: "10/11/2025", 
        star: 4.0, // Sẽ map ra rating-40.png
        content: "Buồn quá. Ngạn ơi là Ngạn." 
    }
];

const favoriteData = [
    { 
        id: "fav-01", 
        title: "Portrait photography", 
        img: "./Images/Book-Covers/b11.png", 
        link: "./Details/book-fav-01.html" 
    },
    { 
        id: "fav-02", 
        title: "Once upon a time", 
        img: "./Images/Book-Covers/b10.png", 
        link: "./Details/book-fav-02.html" 
    },
    { 
        id: "fav-03", 
        title: "Simple lifestyle", 
        img: "./Images/Book-Covers/b11.png", 
        link: "#" 
    },
    { 
        id: "fav-04", 
        title: "Felt from outside", 
        img: "./Images/Book-Covers/b12.png", 
        link: "#" 
    },
    { 
        id: "fav-05", 
        title: "Peaceful Enlightment", 
        img: "./Images/Book-Covers/b13.png", 
        link: "#" 
    },
    { 
        id: "fav-06", 
        title: "Travel at desert", 
        img: "./Images/Book-Covers/b14.png", 
        link: "#" 
    }
];

const currentUserData = {
    firstname: "Văn A",
    lastname: "Nguyễn",
    username: "listenary_fan",
    birthday: "2000-01-01",
    email: "nguyenana@gmail.com",
    phone: "0901234567",
    address: "123 Đường Sách, Quận 1, TP.HCM"
};

document.addEventListener('DOMContentLoaded', () => {
    new BookmarkSection(bookmarkData);
    new UserAuthorSection(authorData);
    new UserRatingSection(ratingData);
    new UserFavoriteSection(favoriteData);
    
    // [NEW] Khởi tạo Modal sửa thông tin
    new EditProfileModal(currentUserData);
});