export class BookContent {
    #data;
    #descContainer;
    #authorNoteContainer;
    #relatedInfoContainer;

    constructor(data) {
        this.#data = data;
        
        // Select các vùng chứa nội dung
        this.#descContainer = document.querySelector('.about-the-author-content');
        
        // Vì class .related-infor dùng chung cho 2 mục dưới, ta dùng querySelectorAll
        const relatedSections = document.querySelectorAll('.related-infor .related-infor-content');
        this.#authorNoteContainer = relatedSections[0]; // Mục Từ Tác Giả
        this.#relatedInfoContainer = relatedSections[1]; // Mục Thông Tin Liên Quan

        if (this.#descContainer) {
            this.init();
        }
    }

    init() {
        this.#render();
    }

    #render() {
        if (!this.#data) return;

        // Render HTML (cho phép xuống dòng bằng thẻ <br> hoặc <p>)
        if (this.#descContainer) this.#descContainer.innerHTML = this.#data.description;
        if (this.#authorNoteContainer) this.#authorNoteContainer.innerHTML = this.#data.authorNote;
        if (this.#relatedInfoContainer) this.#relatedInfoContainer.innerHTML = this.#data.relatedInfo;
    }
}