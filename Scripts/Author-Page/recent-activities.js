export class RecentActivitiesSection {
    #authorsData;
    #container;

    constructor(data) {
        this.#authorsData = data;
        // Chọn container chứa các thẻ tác giả
        this.#container = document.querySelector('.recent-activities-section .authors-container');

        if (this.#container) {
            this.init();
        } else {
            console.warn('RecentActivitiesSection: Không tìm thấy .authors-container');
        }
    }

    init() {
        this.#render();
    }

    #render() {
        // Xóa nội dung tĩnh trong HTML (nếu có) để thay bằng nội dung động
        this.#container.innerHTML = '';

        const html = this.#authorsData.map((author, index) => {
            // Logic xếp so le: Chẵn là 'up', Lẻ là 'down'
            const positionClass = index % 2 === 0 ? 'up' : 'down';
            
            // Tạo danh sách sách (tối đa 5 cuốn)
            const activitiesList = this.#createActivitiesList(author.recentBooks);

            return `
                <div class="author-card ${positionClass}">
                    <div class="author-image jstoAuthorPage" data-author-id="${author.id}">
                        <img src="${author.img}" alt="${author.name}">
                    </div> 
                    <div class="author-box">
                        <p>Hoạt động</p>
                        <div class="recent-activities">
                            ${activitiesList}
                        </div>
                    </div>
                    <div class="author-name">${author.name}</div>
                </div>
            `;
        }).join('');

        this.#container.innerHTML = html;
    }

    #createActivitiesList(books) {
        if (!books || books.length === 0) return 'Chưa có hoạt động mới';

        // Lấy tối đa 5 phần tử đầu tiên
        const limitedBooks = books.slice(0, 5);

        // Map từng cuốn sách thành dòng HTML: Ngày - <a href>Tên sách</a>
        return limitedBooks.map(book => {
            return `
                <div class="activity-line jstoBookDetailPage" data-book-id="${book.id}">
                    <span class="activity-date">${book.date}</span> - 
                    <a href="${book.link}" class="activity-link">${book.title}</a>
                </div>
            `;
        }).join(''); 
        // Lưu ý: Tôi dùng div/span thay vì <br> để dễ style CSS hơn, 
        // nhưng nếu CSS cũ của bạn bắt buộc dùng <br> thì có thể đổi lại.
    }
}