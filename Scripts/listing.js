// Dữ liệu giả lập dùng chung (Mock Data)
const MOCK_LISTING_DATA = [
    {
        id : 1,
        title: "Dế Mèn Phiêu Lưu Ký",
        author: "Tô Hoài",
        description: "Tác phẩm văn học thiếu nhi kinh điển của Việt Nam, kể về cuộc phiêu lưu của chú Dế Mèn qua thế giới loài vật.",
        img: "../Images/Book-Covers/b11.png"
    },
    {   id : 1,
        title: "Harry Potter",
        author: "J.K. Rowling",
        description: "Bộ truyện giả tưởng nổi tiếng thế giới về cậu bé phù thủy Harry Potter và cuộc chiến chống lại Chúa tể Hắc ám.",
        img: "../Images/Book-Covers/b1.png"
    },
    {   id : 1,
        title: "Đắc Nhân Tâm",
        author: "Dale Carnegie",
        description: "Quyển sách self-help bán chạy nhất mọi thời đại, đưa ra những lời khuyên về cách ứng xử và giao tiếp.",
        img: "../Images/Book-Covers/b9.png"
    },
    {   id : 1,
        title: "Nhà Giả Kim",
        author: "Paulo Coelho",
        description: "Câu chuyện về hành trình đi tìm kho báu của chàng chăn cừu Santiago, chứa đựng nhiều triết lý sâu sắc.",
        img: "../Images/Book-Covers/b13.png"
    },
    {   id : 1,
        title: "Sapiens",
        author: "Yuval Noah Harari",
        description: "Cuốn sách bao quát lịch sử tiến hóa của loài người từ thời tiền sử cho đến hiện đại.",
        img: "../Images/Book-Covers/b15.png"
    },
    {   id : 1,
        title: "Mắt Biếc",
        author: "Nguyễn Nhật Ánh",
        description: "Câu chuyện tình yêu đơn phương buồn man mác của Ngạn dành cho Hà Lan qua bao năm tháng.",
        img: "../Images/Book-Covers/b9.png"
    }
];

export class ListingPage {
    #booksData;
    #container;
    #titleElement;

    constructor(data) {
        this.#booksData = data;
        
        // DOM Elements
        this.#container = document.querySelector('.listing-container');
        this.#titleElement = document.querySelector('.listing-title-content');

        // Chỉ chạy nếu tìm thấy DOM
        if (this.#container && this.#titleElement) {
            this.init();
        } else {
            console.warn('ListingPage: Không tìm thấy element cần thiết.');
        }
    }

    init() {
        this.#updateTitle();
        this.#renderList();
    }

    #updateTitle() {
        // Lấy dữ liệu từ localStorage (được lưu bên genres.js)
        const savedGenre = localStorage.getItem('selectedGenre');
        if (savedGenre === "TOP TRENDING") {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "../Styles/pink-color.css";
            document.head.appendChild(link);
        }
        else if (savedGenre === "SÁCH MỚI") {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "../Styles/blue-color.css";
            document.head.appendChild(link);
        }
        if (savedGenre) {
            this.#titleElement.innerText = savedGenre;
            document.title = `${savedGenre} - Listenary`;
        } else {
            this.#titleElement.innerText = "Danh sách sách";
        }
        localStorage.removeItem('selectedGenre');
    }

    #renderList() {
        // Xóa nội dung cũ
        this.#container.innerHTML = '';

        const html = this.#booksData.map((book, index) => {
            // Logic xoay vòng class CSS: element-card-1 -> 2 -> 3 -> 1...
            // index % 3 trả về 0, 1, 2. Cộng thêm 1 để thành 1, 2, 3.
            const variantClass = `element-card-${(index % 3) + 1}`;

            return `
            <div class="listed-element-card ${variantClass}" data-book-id="${book.id}">
                <div class="listing-grid">
                    <div class="listed-element-image">
                        <img src="${book.img}" alt="${book.title}" onerror="this.src='../Images/Book-Covers/default.png'">
                    </div>
                    <div class="listing-card-info">
                        <p class="listing-element-title">${book.title}</p>
                        <p class="listing-element-author">${book.author}</p>
                        <p class="listing-element-des">${book.description}</p>
                    </div>
                </div>
            </div>
            `;
        }).join('');

        this.#container.innerHTML = html;
    }
}

// Khởi tạo
document.addEventListener('DOMContentLoaded', () => {
    new ListingPage(MOCK_LISTING_DATA);
});