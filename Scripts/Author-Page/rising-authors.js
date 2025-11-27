export class RisingAuthorsSection {
    #authors;
    #container;

    constructor(authors) {
        this.#authors = authors;
        // Select container chứa các thẻ card
        this.#container = document.querySelector('.rising-authors-container');

        if (this.#container) {
            this.init();
        } else {
            console.warn('RisingAuthorsSection: Không tìm thấy .rising-authors-container');
        }
    }

    init() {
        this.#render();
    }

    #render() {
        // Xóa nội dung tĩnh cũ
        this.#container.innerHTML = '';

        const html = this.#authors.map(author => {
            return `
                <div class="rising-author-card jstoAuthorPage" data-id="${author.id}" onclick="window.location.href='${author.link}'"">
                    <div class="rising-card-header">${author.name}</div>
                    <div class="rising-card-body">
                        <img src="${author.img}" alt="${author.name}">
                        <div class="rising-card-info">
                            <div class="lines">
                                ${author.bio}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        this.#container.innerHTML = html;
    }
}