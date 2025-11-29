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
        // 1. Render Mô tả chi tiết (About the author)
        if (this.#aboutContainer) {
            if (this.#data.description) {
                this.#aboutContainer.innerHTML = `<p>${this.#data.description}</p>`;
            } else {
                this.#aboutContainer.innerHTML = `<p>Chưa có mô tả về tác giả này.</p>`;
            }
        }
        
        // 2. Render Thông tin liên quan (Related Info)
        // Dựa vào JSON API: có totalBooks, fullName, birthday
        if (this.#relatedContainer) {
            this.#relatedContainer.innerHTML = `
                <div class="info-item">
                    <strong>Tên đầy đủ:</strong> <span>${this.#data.fullName}</span>
                </div>
                <div class="info-item">
                    <strong>Năm sinh:</strong> <span>${this.#data.birthday || 'N/A'}</span>
                </div>
                <div class="info-item">
                    <strong>Tổng số sách:</strong> <span>${this.#data.totalBooks}</span>
                </div>
            `;
        }
    }
}