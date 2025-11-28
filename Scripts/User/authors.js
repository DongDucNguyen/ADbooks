import { authorService } from '../API/author-service.js';

export class UserAuthorSection {
    #container;

    constructor() {
        this.#container = document.querySelector('.js-author-container');
        if (this.#container) {
            this.init();
        }
    }

    async init() {
        try {
            // Lấy 4 tác giả
            const authors = await authorService.getAuthors({ page: 0, size: 4 });
            this.#render(authors);
            this.#addEventListeners();
        } catch (error) {
            console.error('Lỗi tải User Authors:', error);
            this.#container.innerHTML = '<p style="text-align:center; color: #666;">Không thể tải danh sách.</p>';
        }
    }

    #render(authors) {
        if (!authors || authors.length === 0) {
            this.#container.innerHTML = '';
            return;
        }

        const listHtml = authors.map(author => {
            // Xử lý ảnh
            let imageUrl = author.imageUrl;
            if (!imageUrl || imageUrl === 'string' || imageUrl.trim() === '') {
                imageUrl = './Images/Authors/default-author.png';
            }

            // Xử lý sách
            const booksHtml = (author.books || []).slice(0, 3).map(book => 
                `<a href="./Details/book.html?id=${book.id}" 
                    class="author-book-link"
                    onclick="event.stopPropagation()"
                    style="color: #666; text-decoration: none; font-size: 0.9em;"> 
                    ${book.name}
                </a>`
            ).join(', ');

            return `
                <div class="your-author-card" 
                     onclick="window.location.href='./Details/author.html?id=${author.id}'"
                     style="cursor: pointer; display: flex; align-items: center; margin-bottom: 15px; gap: 15px;">
                    
                    <div class="your-author-image" 
                         style="width: 60px; height: 60px; flex-shrink: 0; border-radius: 50%; overflow: hidden; border: 1px solid #eee;">
                        <img src="${imageUrl}" alt="${author.fullName}" 
                             style="width: 100%; height: 100%; object-fit: cover; object-position: center;"
                             onerror="this.src='./Images/Authors/default-author.png'">
                    </div>
                    
                    <div class="your-author-infor" style="flex: 1;">
                        <div class="your-author-name" style="font-weight: bold; font-size: 1.1em; margin-bottom: 4px;">
                            ${author.fullName}
                        </div>
                        <div class="your-author-books" style="font-size: 0.9em; color: #888; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">
                            ${booksHtml ? `Sách: ${booksHtml}` : 'Chưa có sách'}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        this.#container.innerHTML = `
            <div class="your-authors-title" style="font-size: 1.2em; font-weight: bold; margin-bottom: 20px; color: #333;">TÁC GIẢ CỦA BẠN</div>
            ${listHtml}
            <div class="all-authors" style="cursor: pointer; text-align: center; margin-top: 15px; font-weight: bold; color: #555; padding: 10px; background: #f9f9f9; border-radius: 8px;">Xem tất cả</div>
        `;
    }

    #addEventListeners() {
        const viewAllBtn = this.#container.querySelector('.all-authors');
        if (viewAllBtn) {
            viewAllBtn.addEventListener('click', () => {
                localStorage.setItem('selectedAuthorCategory', "TÁC GIẢ CỦA BẠN");
                window.location.href = "./Details/Listing-Authors.html";
            });
        }
    }
}