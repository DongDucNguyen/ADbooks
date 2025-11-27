export class BookmarkSection {
    #data;
    #container;

    constructor(data) {
        this.#data = data;
        this.#container = document.querySelector('.js-bookmark-container');

        if (this.#container) {
            this.init();
        }
    }

    init() {
        this.#render();
    }

    #render() {
        // 1. Tạo HTML cho danh sách bài viết
        const listHtml = this.#data.slice(0, 5).map(item => `
            <div class="bookmark-card">
                <div class="bookmark-card-grid">
                    <img src="${item.img}" alt="${item.title}" >
                    <div class="bookmark-card-info">
                        <p class="bookmark-card-title">${item.title}</p>
                        <p class="bookmark-card-author">${item.author}</p>
                        <p class="bookmark-card-last-view">${item.lastView}</p>
                    </div>
                </div>
                <div class="bookmark-time" onclick="window.location.href = 'Reading-Page.html';">${item.progress}</div>
            </div>
        `).join('');

        // 2. Gộp Tiêu đề + List + Nút Tất cả
        this.#container.innerHTML = `
            <div class="bookmark-title">BOOKMARKS</div>
            ${listHtml}
            <div class="all-bookmark"></div>
        `;
    }
}