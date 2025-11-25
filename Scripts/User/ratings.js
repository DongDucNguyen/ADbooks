export class UserRatingSection {
    #data;
    #container;

    constructor(data) {
        this.#data = data;
        this.#container = document.querySelector('.js-rating-container');
        if (this.#container) this.init();
    }

    init() {
        this.#render();
    }

    #render() {
        const listHtml = this.#data.slice(0, 4).map(rating => {
            // 1. Lấy tên file ảnh dựa trên điểm số (ví dụ: 4.5 -> rating-45.png)
            const ratingImgName = this.#getRatingImageName(rating.star);
            
            return `
                <div class="your-rating-card" data-rating-id="${rating.id}">
                    <div class="main-inf">
                        <div class="date">${rating.date}</div>
                        <div class="star">
                            <img src="./Images/ratings/${ratingImgName}" alt="Rating ${rating.star}" style="height: 18px;">
                        </div>
                    </div>
                    <div class="comment">
                        <div class="comment-title">${rating.bookTitle}</div>
                        <div class="content">"${rating.content}"</div>
                    </div>
                </div>
            `;
        }).join('');

        this.#container.innerHTML = `
            <div class="rating-title">ĐÁNH GIÁ CỦA BẠN</div>
            <div class="your-rating">
                ${listHtml}
                <div class="all-ratings">Tất cả</div>
            </div>
        `;
    }

    // Hàm chuyển đổi điểm số thành tên file ảnh (Logic chuẩn theo folder ảnh của bạn)
    #getRatingImageName(score) {
        // Nhân 10 để lấy số nguyên (4.5 -> 45)
        let scoreInt = Math.round(score * 10); 
        
        // Làm tròn về bội số của 5 gần nhất (đề phòng dữ liệu lẻ như 4.3 -> 45)
        scoreInt = Math.round(scoreInt / 5) * 5;

        // Xử lý trường hợp 0
        if (scoreInt === 0) return 'rating-0.png';
        
        // Thêm số 0 đằng trước nếu nhỏ hơn 10 (ví dụ 5 -> 05)
        const scoreStr = scoreInt < 10 ? `0${scoreInt}` : `${scoreInt}`;
        return `rating-${scoreStr}.png`;
    }
}