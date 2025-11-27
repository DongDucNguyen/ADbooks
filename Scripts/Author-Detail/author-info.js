export class AuthorInfo {
    #data;
    #aboutContainer;
    #relatedContainer;

    constructor(data) {
        this.#data = data;
        this.#aboutContainer = document.querySelector('.about-the-author-content');
        this.#relatedContainer = document.querySelector('.related-infor-content');

        if (this.#aboutContainer || this.#relatedContainer) {
            this.init();
        }
    }

    init() {
        this.#render();
    }

    #render() {
        if (this.#aboutContainer && this.#data.fullDescription) {
            this.#aboutContainer.innerHTML = this.#data.fullDescription;
        }
        
        if (this.#relatedContainer && this.#data.relatedInfo) {
            this.#relatedContainer.innerHTML = this.#data.relatedInfo;
        }
    }
}