export class AuthorIntro {
    #data;
    #container;
    #elements;

    constructor(data) {
        this.#data = data;
        this.#container = document.querySelector('.introduction-section');

        if (this.#container) {
            this.#elements = {
                bgImage: this.#container.querySelector('.introduction-grid-img'),
                avatar: this.#container.querySelector('.author-image img'),
                name: this.#container.querySelector('.introduction-name'),
                dob: this.#container.querySelector('.introduction-DoB'),
                description: this.#container.querySelector('.introduction-des')
            };
            this.init();
        } else {
            console.warn('AuthorIntro: Không tìm thấy DOM (.introduction-section)');
        }
    }

    init() {
        this.#render();
    }

    #render() {
        if (!this.#data) return;

        // Cập nhật dữ liệu
        if (this.#elements.bgImage) this.#elements.bgImage.src = this.#data.img;
        if (this.#elements.avatar) this.#elements.avatar.src = this.#data.img;
        if (this.#elements.name) this.#elements.name.textContent = this.#data.name;
        if (this.#elements.dob) this.#elements.dob.textContent = this.#data.dob;
        if (this.#elements.description) this.#elements.description.textContent = this.#data.shortDesc;
    }
}