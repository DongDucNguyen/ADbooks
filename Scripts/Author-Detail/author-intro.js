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
        }
    }

    init() {
        this.#render();
    }

    #render() {
        if (!this.#data) return;

        // Map API fields to UI
        if (this.#elements.bgImage) this.#elements.bgImage.src = this.#data.imageUrl || '../Images/Authors/default.jpg';
        if (this.#elements.avatar) this.#elements.avatar.src = this.#data.imageUrl || '../Images/Authors/default.jpg';
        
        if (this.#elements.name) this.#elements.name.textContent = this.#data.fullName;
        if (this.#elements.dob) this.#elements.dob.textContent = this.#data.birthday || 'N/A';
        
        // Use description from API
        if (this.#elements.description) {
            this.#elements.description.textContent = this.#data.description || '';
        }
    }
}