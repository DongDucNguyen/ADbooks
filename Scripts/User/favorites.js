export class UserFavoriteSection {
    #data;
    #container;

    constructor(data) {
        this.#data = data;
        this.#container = document.querySelector('.js-favorite-container');
        if (this.#container) this.init();
    }

    init() {
        this.#render();
    }

    #render() {
        const listHtml = this.#data.slice(0, 6).map(book => `
            <div class="favorite-card" 
                 data-book-id="${book.id}" 
                 onclick="window.location.href='${book.link}'">
                 
                <img src="${book.img}" alt="${book.title}">
                <div>${book.title}</div>
            </div>
        `).join('');

        this.#container.innerHTML = `
            <p class="favorite-title">Yêu thích</p>
            <div class="favorite-grid">
                ${listHtml}
            </div>
            <div class="line"></div>
            <div class="all-favorites">Tất cả</div>
        `;
    }
}