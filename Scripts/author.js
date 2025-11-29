import { TopAuthorSlider } from './Author-Page/top-author.js';
import { RecentActivitiesSection } from './Author-Page/recent-activities.js'; // <--- Import mới
import { RisingAuthorsSection } from './Author-Page/rising-authors.js';
// 1. TOP AUTHORS (Đã sửa ảnh thành .png)
const topAuthorsData = [
    {
        id: 22,
        name: "Paulo Coelho",
        birthDate: "24/08/1947",
        description: "Nhà văn người Brazil, nổi tiếng với phong cách triết lý và truyền cảm hứng. 'Nhà giả kim' là tác phẩm đưa ông lên hàng nhà văn có sách bán chạy nhất thế giới.",
        link: './Details/author.html?id=22',
        img: 'https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/22.png',
        books: [
            { img: 'https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/27_22.png', id: 27 }
        ]
    },
    {
        id: 10,
        name: "Vũ Trọng Phụng",
        birthDate: "20/10/1912",
        description: "Ông vua phóng sự đất Bắc, nổi tiếng với giọng văn trào phúng sắc sảo. Các tác phẩm của ông phơi bày chân thực xã hội Việt Nam thời Pháp thuộc.",
        link: './Details/author.html?id=10',
        img: 'https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/10.png',
        books: [
            { img: 'https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/12_10.png', id: 12 },
            { img: 'https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/15_10.png', id: 15 }
        ]
    },
    {
        id: 17,
        name: "William Golding",
        birthDate: "19/09/1911",
        description: "Nhà văn, nhà thơ người Anh, đoạt giải Nobel Văn học năm 1983. Tác phẩm 'Chúa ruồi' của ông là một kiệt tác ẩn dụ về bản chất con người.",
        link: './Details/author.html?id=17',
        img: 'https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/17.png',
        books: [
            { img: 'https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/21_17.png', id: 21 }
        ]
    }
];

// 2. RECENT ACTIVITIES (Đã sửa ảnh thành .png)
const recentActivitiesData = [
    {
        id: 25,
        name: "Tara Westover",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/25.png",
        recentBooks: [
            { id: 31, date: "10/2023", title: "Được học", link: "./Details/book.html?id=31" }
        ]
    },
    {
        id: 12,
        name: "Chu Lai",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/12.png",
        recentBooks: [
            { id: 14, date: "09/2023", title: "Mưa đỏ", link: "./Details/book.html?id=14" }
        ]
    },
    {
        id: 28,
        name: "Frank McCourt",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/28.png",
        recentBooks: [
            { id: 34, date: "08/2023", title: "Người thầy", link: "./Details/book.html?id=34" }
        ]
    },
    {
        id: 42,
        name: "Takeshi Furukawa",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/42.png",
        recentBooks: [
            { id: 49, date: "07/2023", title: "Mình là cá, việc của mình là bơi", link: "./Details/book.html?id=49" }
        ]
    },
    {
        id: 16,
        name: "Nguyễn Dữ",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/16.png",
        recentBooks: [
            { id: 19, date: "05/2023", title: "Nam Xương nữ tử truyện", link: "./Details/book.html?id=19" }
        ]
    }
];

// 3. RISING AUTHORS (Đã sửa ảnh thành .png)
const risingAuthorsData = [
    {
        id: 40,
        name: "Ngô Bảo Châu",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/40.png",
        link: "./Details/author.html?id=40",
        bio: 'Nhà toán học người Việt Nam, nổi tiếng với công trình Bổ đề cơ bản. Cuốn sách "Ai và Ky ở xứ sở những con số tàng hình" là tác phẩm văn học đầu tay đầy ấn tượng.'
    },
    {
        id: 7,
        name: "Eckhart Tolle",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/7.png",
        link: "./Details/author.html?id=7",
        bio: 'Nhà tư tưởng tâm linh nổi tiếng thế giới. Tác phẩm của ông giúp hàng triệu người tìm thấy sự bình an nội tâm và thức tỉnh mục đích sống.'
    },
    {
        id: 31,
        name: "John Medina",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/31.png",
        link: "./Details/author.html?id=31",
        bio: 'Tiến sĩ sinh học phân tử và nhà nghiên cứu não bộ. Ông nổi tiếng với việc áp dụng khoa học thần kinh vào việc nuôi dạy trẻ và phát triển trí tuệ.'
    },
    {
        id: 30,
        name: "Kyuichi Kimura",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/30.png",
        link: "./Details/author.html?id=30",
        bio: 'Giáo viên, nhà tâm lý học tài ba. Ông có cái nhìn sâu sắc về giáo dục sớm và khơi dậy tiềm năng thiên tài trong mỗi đứa trẻ.'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Top Slider
    new TopAuthorSlider(topAuthorsData);

    // 2. Recent Activities
    new RecentActivitiesSection(recentActivitiesData);

    // 3. Rising Authors (Mới)
    new RisingAuthorsSection(risingAuthorsData);

    document.querySelector('.top-author-section-title').addEventListener('click', function() {
        localStorage.setItem('selectedAuthorCategory', "TÁC GIẢ NỔI BẬT");
    });
    document.querySelector('.recent-activities-title').addEventListener('click', function() {
        localStorage.setItem('selectedAuthorCategory', "HOẠT ĐỘNG GẦN ĐÂY");
    });
    document.querySelector('.rising-background-title').addEventListener('click', function() {
        localStorage.setItem('selectedAuthorCategory', "TÁC GIẢ TRẺ");
    });
});