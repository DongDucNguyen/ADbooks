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
    #input;

    constructor(inputSelector, containerSelector, titleSelector) {
        this.#container = document.querySelector(containerSelector);
        this.#titleElement = document.querySelector(titleSelector);
        this.#input = document.querySelector(inputSelector);

        if (!this.#container || !this.#input) {
            console.warn('SearchResultsPage: Không tìm thấy container hoặc input');
            return;
        }

        this.#init();
    }

    #init() {
        this.#input.addEventListener('input', () => this.#search());
    }

    async #search() {
        const keyword = this.#input.value.trim();
        if (!keyword) {
            this.#container.innerHTML = '';
            return;
        }

        try {
            // Gọi API tác giả
            const authorsResp = await fetch(`http://localhost:8080/api/v1/authors?keyword=${encodeURIComponent(keyword)}`);
            const authorsJson = await authorsResp.json();
            const authors = authorsJson.content || [];

            // Gọi API sách
            const booksResp = await fetch(`http://localhost:8080/api/v1/books?keyword=${encodeURIComponent(keyword)}`);
            const booksJson = await booksResp.json();
            const books = booksJson.content || [];

            this.#data = [...books.map(b => ({...b, type: 'book'})), ...authors.map(a => ({...a, type: 'author'}))];
            this.#render();

        } catch (err) {
            console.error("Lỗi khi tìm kiếm:", err);
            this.#container.innerHTML = '<p>Có lỗi xảy ra. Vui lòng thử lại.</p>';
        }
    }

    #render() {
        this.#container.innerHTML = ''; // Xóa nội dung cũ

        if (!this.#data.length) {
            this.#container.innerHTML = '<p>Không tìm thấy kết quả.</p>';
            return;
        }

        const html = this.#data.map(item => {
            if (item.type === 'book') return this.#createBookCard(item);
            if (item.type === 'author') return this.#createAuthorCard(item);
            return '';
        }).join('');

        this.#container.innerHTML = html;
    }

    // Template HTML cho sách
    #createBookCard(book) {
        return `
            <div class="result-card book-card-type jstoBookDetailPage" data-book-id="${book.id}">
                <div class="card-background"></div>
                <div class="card-content-layout">
                    <img src="${book.img || './Images/Book-Covers/default.png'}" class="book-cover-img" alt="${book.title}">
                    <div class="info-area">
                        <h3 class="item-title">${book.title}</h3>
                        <p class="item-subtitle">${book.authorName || book.author}</p>
                        <p class="item-meta">Xuất bản: ${book.publishDate || ''}</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Template HTML cho tác giả
    #createAuthorCard(author) {
        return `
            <div class="result-card author-card-type jstoAuthorPage" data-author-id="${author.id}">
                <div class="card-background"></div>
                <div class="card-content-layout author-layout">
                    <img src="${author.img || './Images/elements/user-default.png'}" class="author-avatar-img" alt="${author.firstname || author.name}">
                    <div class="info-area author-info">
                        <h3 class="item-title">${author.firstname ? author.firstname + ' ' + author.lastname : author.name}</h3>
                        <p class="item-meta">Sinh ngày: ${author.birthday || author.birthDate || ''}</p>
                    </div>
                </div>
            </div>
        `;
    }
}

// main.js
import { SearchResultsPage } from "./search.js";

document.addEventListener('DOMContentLoaded', () => {
    new SearchResultsPage('#searchInput', '.search-results-container', '.search-title-content');
});


// // Khởi chạy
// document.addEventListener('DOMContentLoaded', () => {
//     new SearchResultsPage(MOCK_SEARCH_DATA);
// });