import { TopAuthorSlider } from './Author-Page/top-author.js';
import { RecentActivitiesSection } from './Author-Page/recent-activities.js'; // <--- Import mới
import { RisingAuthorsSection } from './Author-Page/rising-authors.js';
const topAuthorsData = [
    {
        id: 1,
        name: "Anthony Doerr",
        birthDate: "27/10/1973",
        description: 'Tác giả người Mỹ nổi tiếng với lối viết giàu cảm xúc và nhân văn. Ông đạt giải Pulitzer năm 2015 với tác phẩm "All the Light We Cannot See".',
        link: './Details/author.html',
        img: './Images/Authors/a1.jpg',
                books: [{
                img : './Images/Book-Covers/b1.png',
                id : '1'
            },
            {
                img : './Images/Book-Covers/b7.png',
                id : '2'
            },
            {
                img : './Images/Book-Covers/b8.png',
                id : '3'
            }
        ]
    },
    {
        id: 2,
        name: "J.K. Rowling",
        birthDate: "31/07/1965",
        description: 'Tác giả người Anh, nổi tiếng toàn cầu với bộ truyện Harry Potter. Bà là một trong những nhà văn giàu nhất và có ảnh hưởng nhất thế giới.',
        link: './Details/author.html',
        img: './Images/Authors/a2.png', // Đảm bảo bạn có ảnh này
        books: [{
                img : './Images/Book-Covers/b2.png',
                id : '1'
            },
            {
                img : './Images/Book-Covers/b3.png',
                id : '2'
            },
            {
                img : './Images/Book-Covers/b4.png',
                id : '3'
            }
        ]
    },
    {
        id: 3,
        name: "Haruki Murakami",
        birthDate: "12/01/1949",
        description: 'Nhà văn Nhật Bản hiện đại nổi tiếng với phong cách siêu thực. Các tác phẩm của ông thường đề cập đến sự cô đơn và khao khát của con người.',
        link: './Details/author.html',
        img: './Images/Authors/a3.jpg', // Đảm bảo bạn có ảnh này
            books: [{
                img : './Images/Book-Covers/b6.png',
                id : '1'
            },
            {
                img : './Images/Book-Covers/b7.png',
                id : '2'
            },
            {
                img : './Images/Book-Covers/b1.png',
                id : '3'
            }
        ]
    }
];

const recentActivitiesData = [
    {
        id: 101,
        name: "Nguyễn Nhật Ánh",
        img: "./Images/Authors/a1.jpg",
        recentBooks: [
            { date: "10/2023", title: "Mùa Hè Không Tên", link: "./Details/book1.html" },
            { date: "05/2022", title: "Ra Bờ Suối Ngắm Hoa", link: "./Details/book2.html" },
            { date: "12/2021", title: "Con Chim Xanh Biếc", link: "#" },
        ]
    },
    {
        id: 102,
        name: "J.K. Rowling",
        img: "./Images/Authors/a2.png",
        recentBooks: [
            { date: "12/2023", title: "Harry Potter Illustrated", link: "#" },
            { date: "10/2022", title: "The Christmas Pig", link: "#" },
            { date: "08/2020", title: "The Ickabog", link: "#" }
        ]
    },
    {
        id: 103,
        name: "Haruki Murakami",
        img: "./Images/Authors/a3.jpg",
        recentBooks: [
            { date: "04/2023", title: "The City and Its Uncertain Walls", link: "#" },
            { date: "07/2021", title: "First Person Singular", link: "#" },
            { date: "10/2017", title: "Killing Commendatore", link: "#" },
            { date: "08/2014", title: "Men Without Women", link: "#" }
        ]
    },
    {
        id: 104,
        name: "Stephen King",
        img: "./Images/Authors/a4.jpg",
        recentBooks: [
            { date: "09/2023", title: "Holly", link: "#" },
            { date: "09/2022", title: "Fairy Tale", link: "#" },
            { date: "08/2021", title: "Billy Summers", link: "#" },
            { date: "04/2020", title: "If It Bleeds", link: "#" },
            { date: "09/2019", title: "The Institute", link: "#" }
        ]
    },
    {
        id: 105,
        name: "Dan Brown",
        img: "./Images/Authors/a5.jpg",
        recentBooks: [
            { date: "09/2020", title: "Wild Symphony", link: "#" },
            { date: "10/2017", title: "Origin", link: "#" }
        ]
    }
];
const risingAuthorsData = [
    {
        id: 201,
        name: "Ocean Vuong",
        img: "./Images/Authors/a1.jpg", // Thay bằng ảnh thật nếu có
        link: "./Details/author-ocean-vuong.html",
        bio: 'Nhà thơ, tiểu thuyết gia người Mỹ gốc Việt. Tác phẩm "On Earth We\'re Briefly Gorgeous" đã gây tiếng vang lớn trên văn đàn quốc tế.'
    },
    {
        id: 202,
        name: "Rupi Kaur",
        img: "./Images/Authors/a2.png",
        link: "#",
        bio: 'Nhà thơ, nghệ sĩ biểu diễn người Canada gốc Ấn. Nổi tiếng với tập thơ "Milk and Honey", cô là đại diện tiêu biểu cho dòng thơ Instapoetry.'
    },
    {
        id: 203,
        name: "Sally Rooney",
        img: "./Images/Authors/a3.jpg",
        link: "#",
        bio: 'Nữ nhà văn trẻ người Ireland, được mệnh danh là "tiếng nói của thế hệ millennials" với các tác phẩm như "Normal People".'
    },
    {
        id: 204,
        name: "Đinh Phương",
        img: "./Images/Authors/a4.jpg",
        link: "#",
        bio: 'Một cây bút trẻ đầy triển vọng của văn học Việt Nam với lối viết ma mị, khai thác sâu vào tâm lý và lịch sử.'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Top Slider
    new TopAuthorSlider(topAuthorsData);

    // 2. Recent Activities
    new RecentActivitiesSection(recentActivitiesData);

    // 3. Rising Authors (Mới)
    new RisingAuthorsSection(risingAuthorsData);
});