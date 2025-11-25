// Dữ liệu giả lập cho Tác Giả (Mock Data)
const MOCK_AUTHORS_DATA = [
    {
        name: "Nam Cao",
        birth: "1917 - 1951", // Hiển thị ở dòng thứ 2 (class .listing-element-author)
        description: "Là một nhà văn hiện thực lớn, một nhà nhân đạo chủ nghĩa lớn, có đóng góp to lớn vào việc cách tân truyện ngắn và tiểu thuyết Việt Nam.",
        img: "../Images/Authors/a1.jpg"
    },
    {
        name: "J.K. Rowling",
        birth: "31/07/1965",
        description: "Tác giả người Anh, nổi tiếng với bộ truyện Harry Potter. Bà là một trong những nhà văn giàu có và có ảnh hưởng nhất thế giới.",
        img: "../Images/Authors/a2.png" // Đảm bảo bạn có ảnh hoặc dùng ảnh placeholder
    },
    {
        name: "Tô Hoài",
        birth: "1920 - 2014",
        description: "Nhà văn nổi tiếng với tác phẩm Dế Mèn Phiêu Lưu Ký. Ông viết nhiều thể loại từ truyện ngắn, truyện dài đến hồi ký.",
        img: "../Images/Authors/a3.jpg"
    },
    {
        name: "Ernest Hemingway",
        birth: "1899 - 1961",
        description: "Nhà văn người Mỹ, đoạt giải Nobel Văn học năm 1954. Ông nổi tiếng với nguyên lý 'Tảng băng trôi' trong văn chương.",
        img: "../Images/Authors/a4.jpg"
    },
    {
        name: "Nguyễn Nhật Ánh",
        birth: "07/05/1955",
        description: "Nhà văn chuyên viết cho tuổi mới lớn. Các tác phẩm của ông rất được yêu thích vì sự trong sáng và hoài niệm.",
        img: "../Images/Authors/a5.jpg"
    },
    {
        name: "Victor Hugo",
        birth: "1802 - 1885",
        description: "Nhà văn, thi sĩ, nhà viết kịch thuộc chủ nghĩa lãng mạn nổi tiếng của Pháp. Tác giả của 'Những người khốn khổ'.",
        img: "../Images/Authors/a2.png"
    }
];

export class ListingAuthorsPage {
    #data;
    #container;
    #titleElement;

    constructor(data) {
        this.#data = data;
        
        // Select DOM elements
        this.#container = document.querySelector('.listing-container');
        this.#titleElement = document.querySelector('.listing-title-content');

        // Kiểm tra an toàn
        if (this.#container && this.#titleElement) {
            this.init();
        } else {
            console.warn('ListingAuthorsPage: Thiếu DOM (.listing-container hoặc .listing-title-content)');
        }
    }

    init() {
        this.#updateTitle();
        this.#renderList();
    }

    #updateTitle() {
        const savedTitle = localStorage.getItem('selectedAuthorCategory');
        if (savedTitle === "TÁC GIẢ NỔI BẬT") {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "../Styles/pink-color.css";
            document.head.appendChild(link);
        }
        else if (savedTitle === "HOẠT ĐỘNG GẦN ĐÂY") {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "../Styles/blue-color.css";
            document.head.appendChild(link);
        }
        if (savedTitle) {
            this.#titleElement.innerText = savedTitle;
            document.title = `${savedTitle} - Listenary`;
        } else {
            this.#titleElement.innerText = "Tác Giả Nổi Bật";
        }
    }

    #renderList() {
        // Xóa nội dung cũ
        this.#container.innerHTML = '';

        const html = this.#data.map((author, index) => {
            // Logic xoay vòng class màu nền: element-card-1 -> 2 -> 3
            const variantClass = `element-card-${(index % 3) + 1}`;

            return `
            <div class="listed-element-card ${variantClass}">
                <div class="listing-grid">
                    <div class="listed-element-image">
                        <img src="${author.img}" alt="${author.name}" onerror="this.src='../Images/Authors/default.jpg'">
                    </div>
                    <div class="listing-card-info">
                        <p class="listing-element-title">${author.name}</p>
                        <p class="listing-element-author">${author.birth}</p>
                        <p class="listing-element-des">${author.description}</p>
                    </div>
                </div>
            </div>
            `;
        }).join('');

        this.#container.innerHTML = html;
    }
}

// Khởi chạy khi DOM load xong
document.addEventListener('DOMContentLoaded', () => {
    new ListingAuthorsPage(MOCK_AUTHORS_DATA);
});