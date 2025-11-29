import { BookmarkSection } from './User/bookmarks.js';
import { UserAuthorSection } from './User/authors.js';
import { UserRatingSection } from './User/ratings.js';
import { UserFavoriteSection } from './User/favorites.js';
import { EditProfileModal } from './User/edit-profile.js';
import { SettingsManager } from './User/settings-manager.js';
import { setupLogout } from "./User/logout.js";
import { setupDeleteAccount } from "./User/clearAccount.js";
import { setupDeleteHistory } from "./User/clearHistory.js";

const bookmarkData = [
    { id: 1, img: './Images/Book-Covers/b1.png', title: "Life Of The Wild", author: "Unknown", lastView: "10:30 24/11/2025", progress: "45%", link: "#" },
    { id: 2, img: './Images/Book-Covers/b2.png', title: "Journey Time", author: "H.G. Wells", lastView: "22:15 23/11/2025", progress: "12%", link: "#" },
    { id: 3, img: './Images/Book-Covers/b3.png', title: "Mystery Ocean", author: "Jules Verne", lastView: "08:00 20/11/2025", progress: "88%", link: "#" },
    { id: 4, img: './Images/Book-Covers/b4.png', title: "Crawdads Sing", author: "Delia Owens", lastView: "14:20 19/11/2025", progress: "30%", link: "#" },
    { id: 5, img: './Images/Book-Covers/b5.png', title: "Rich Asians", author: "Kevin Kwan", lastView: "09:45 18/11/2025", progress: "99%", link: "#" }
];

const authorData = [
    {
        id: 14,
        name: "Nguyễn Nhật Ánh",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/14.png",
        link: "./Details/author.html?id=14",
        books: [
            { id: 17, title: "Có 2 con mèo ngồi bên cửa sổ", link: "./Details/book.html?id=17" }
        ]
    },
    {
        id: 10,
        name: "Vũ Trọng Phụng",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/10.png",
        link: "./Details/author.html?id=10",
        books: [
            { id: 12, title: "Số đỏ", link: "./Details/book.html?id=12" },
            { id: 15, title: "Cơm thầy cơm cô", link: "./Details/book.html?id=15" }
        ]
    },
    {
        id: 22,
        name: "Paulo Coelho",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/22.png",
        link: "./Details/author.html?id=22",
        books: [
            { id: 27, title: "Nhà giả kim", link: "./Details/book.html?id=27" }
        ]
    },
    {
        id: 25,
        name: "Tara Westover",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/25.png",
        link: "./Details/author.html?id=25",
        books: [
            { id: 31, title: "Được học", link: "./Details/book.html?id=31" }
        ]
    },
    {
        id: 12,
        name: "Chu Lai",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/12.png",
        link: "./Details/author.html?id=12",
        books: [
            { id: 14, title: "Mưa đỏ", link: "./Details/book.html?id=14" }
        ]
    },
    {
        id: 34,
        name: "Stephen Hawking",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/34.png",
        link: "./Details/author.html?id=34",
        books: [
            { id: 41, title: "Vũ trụ trong vỏ hạt dẻ", link: "./Details/book.html?id=41" }
        ]
    },
    {
        id: 21,
        name: "George Orwell",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/21.png",
        link: "./Details/author.html?id=21",
        books: [
            { id: 25, title: "1984", link: "./Details/book.html?id=25" },
            { id: 26, title: "Trại súc vật", link: "./Details/book.html?id=26" }
        ]
    },
    {
        id: 40,
        name: "Ngô Bảo Châu",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/40.png",
        link: "./Details/author.html?id=40",
        books: [
            { id: 47, title: "Ai và Ky ở xứ sở những con số tàng hình", link: "./Details/book.html?id=47" }
        ]
    }
];

const ratingData = [
    { 
        id: "rt-01", // ID của đánh giá
        bookTitle: "Đồi Gió Hú", 
        date: "24/11/2025", 
        star: 5.0, // Sẽ map ra rating-50.png
        Title: "Great",
        content: "Một tuyệt tác! Câu chuyện tình yêu quá mãnh liệt." 
    },
    { 
        id: "rt-02",
        bookTitle: "Nhà Giả Kim", 
        date: "20/11/2025", 
        star: 4.5, // Sẽ map ra rating-45.png
        Title: "Great",
        content: "Sách nhẹ nhàng, nhiều bài học triết lý." 
    },
    { 
        id: "rt-03",
        bookTitle: "Harry Potter", 
        date: "15/11/2025", 
        star: 5.0, // Sẽ map ra rating-50.png
        Title: "Great",
        content: "Tuổi thơ ùa về. Đọc lại vẫn thấy hay." 
    },
    { 
        id: "rt-04",
        bookTitle: "Mắt Biếc", 
        date: "10/11/2025", 
        star: 4.0, // Sẽ map ra rating-40.png
        Title: "Great",
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
    new EditProfileModal(currentUserData);
    new SettingsManager();
});

setupLogout();
setupDeleteAccount();
setupDeleteHistory();