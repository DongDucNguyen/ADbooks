// Dữ liệu giả lập (Sau này sẽ thay bằng dữ liệu lấy từ API/Database)
const MOCK_SEARCH_DATA = [
    {
        type: 'book',
        id: 'b1',
        title: "All The Light We Cannot See",
        author: "Anthony Doerr",
        publishDate: "06/05/2014",
        img: "./Images/Book-Covers/b1.png"
    },
    {
        type: 'author',
        id: 'a1',
        name: "Anthony Doerr",
        birthDate: "27/10/1973",
        img: "./Images/Authors/a1.jpg"
    },
    {
        type: 'book',
        id: 'b4',
        title: "Where The Crawdads Sing",
        author: "Delia Owens",
        publishDate: "14/08/2018",
        img: "./Images/Book-Covers/b4.png"
    },
    {
        type: 'author',
        id: 'a2',
        name: "Delia Owens",
        birthDate: "04/04/1949",
        img: "./Images/Authors/a2.png" 
    },
    {
        type: 'book',
        id: 'b2',
        title: "Rich People Problems",
        author: "Kevin Kwan",
        publishDate: "23/05/2017",
        img: "./Images/Book-Covers/b2.png"
    },
    {
        type: 'book',
        id: 'b3',
        title: "Becoming",
        author: "Michelle Obama",
        publishDate: "13/11/2018",
        img: "./Images/Book-Covers/b3.png"
    }
];

export class SearchResultsPage {
    #data;
    #container;
    #titleElement;

    constructor(data) {
        this.#data = data;
        // Lấy container lưới
        this.#container = document.querySelector('.search-results-container');
        // Lấy tiêu đề để cập nhật (nếu cần hiển thị từ khóa tìm kiếm)
        this.#titleElement = document.querySelector('.search-title-content');

        if (this.#container) {
            this.init();
        } else {
            console.warn('SearchResultsPage: Không tìm thấy .search-results-container');
        }
    }

    init() {
        // Có thể thêm logic lấy từ khóa tìm kiếm từ URL tại đây
        // Ví dụ: const urlParams = new URLSearchParams(window.location.search);
        // const query = urlParams.get('q');
        
        this.#render();
    }

    #render() {
        this.#container.innerHTML = ''; // Xóa nội dung HTML tĩnh cũ

        const html = this.#data.map(item => {
            if (item.type === 'book') {
                return this.#createBookCard(item);
            } else if (item.type === 'author') {
                return this.#createAuthorCard(item);
            }
            return '';
        }).join('');

        this.#container.innerHTML = html;
    }

    // Template HTML cho Sách (Khớp với cấu trúc bạn đã sửa)
    #createBookCard(book) {
        // Thêm class 'jstoBookDetailPage' và 'data-book-id' vào thẻ cha
        return `
            <div class="result-card book-card-type jstoBookDetailPage" data-book-id="${book.id}">
                <div class="card-background"></div>
                <div class="card-content-layout">
                    <img src="${book.img}" class="book-cover-img" alt="${book.title}" onerror="this.src='./Images/Book-Covers/default.png'">
                    
                    <div class="info-area">
                        <h3 class="item-title">${book.title}</h3>
                        <p class="item-subtitle">${book.author}</p>
                        <p class="item-meta">Xuất bản: ${book.publishDate}</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Template HTML cho Tác giả (Khớp với cấu trúc bạn đã sửa)
    #createAuthorCard(author) {
        // Thêm class 'jstoAuthorPage' và 'data-author-id' vào thẻ cha
        return `
            <div class="result-card author-card-type jstoAuthorPage" data-author-id="${author.id}">
                <div class="card-background"></div>
                <div class="card-content-layout author-layout">
                    <img src="${author.img}" class="author-avatar-img" alt="${author.name}" onerror="this.src='./Images/elements/user-default.png'">
                    
                    <div class="info-area author-info">
                        <h3 class="item-title">${author.name}</h3>
                        <p class="item-meta">Sinh ngày: ${author.birthDate}</p>
                    </div>
                </div>
            </div>
        `;
    }
}

// Khởi chạy
document.addEventListener('DOMContentLoaded', () => {
    new SearchResultsPage(MOCK_SEARCH_DATA);
});