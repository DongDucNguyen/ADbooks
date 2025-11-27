export class FeaturedBooksSection {
    #data;
    #tabs;
    #container;
    #currentIndex;

    constructor(data) {
        this.#data = data;
        this.#currentIndex = 0;

        this.#tabs = document.querySelectorAll('.selections div');
        this.#container = document.querySelector('.books-container');

        if (this.#tabs.length > 0 && this.#container) {
            this.init();
        } else {
            console.warn('FeaturedBooksSection: Thiếu DOM required');
        }
    }

    init() {
        this.#tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                this.#handleTabClick(index);
            });
        });
        
        // Render mặc định ban đầu nếu cần thiết
        this.#renderBooksHTML(this.#data[0]);
    }

    #handleTabClick(index) {
        if (index === this.#currentIndex) return;

        // Update Tabs UI
        this.#updateTabsUI(index);

        // Fade Out
        this.#container.style.opacity = '0';

        setTimeout(() => {
            this.#currentIndex = index;
            const booksForGenre = this.#data[index];
            this.#renderBooksHTML(booksForGenre);

            // Fade In
            this.#container.style.opacity = '1';
        }, 400);
    }

    #updateTabsUI(activeIndex) {
        this.#tabs.forEach((tab, index) => {
            if (index === activeIndex) {
                tab.classList.add('selected');
            } else {
                tab.classList.remove('selected');
            }
        });
    }

    #renderBooksHTML(books) {
        if (!books) return;

        const html = books.map(book => `
            <div class="book-card jstoBookDetailPage" data-book-id="${book.id}" style="cursor: pointer;">
                <img src="${book.img}" alt="${book.title}">
                <p class="title">${book.title}</p>
                <p class="author">${book.author}</p>
            </div>
        `).join('');

        this.#container.innerHTML = html;
    }
}