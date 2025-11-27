/* Scripts/listing-rating.js */

// [NEW] Import Modal từ thư mục Book-Detail
import { AddRatingModal } from './Book-Detail/add-rating-modal.js';
import { ViewRatingModal } from './Book-Detail/view-rating-modal.js';
// ... (Phần MOCK_REVIEWS_DATA giữ nguyên như cũ) ...
const MOCK_REVIEWS_DATA = [
    { id: 1, name: "Nguyễn Văn A", date: "20/11/2024", score: 5.0, title: "Tuyệt phẩm!", content: "Một tuyệt tác!" },
    { id: 2, name: "Trần Thị B", date: "18/11/2024", score: 4.5, title: "Rất đáng đọc", content: "Sách rất hay." },
    { id: 3, name: "Le Hoang C", date: "15/11/2024", score: 3.5, title: "Tạm ổn", content: "Nội dung hơi khó hiểu." },
    { id: 4, name: "Phạm D", date: "10/11/2024", score: 5.0, title: "Kinh điển", content: "Không có gì để chê." },
    { id: 5, name: "Hoàng E", date: "05/11/2024", score: 2.0, title: "Không hợp gu", content: "Đọc khá mệt." },
    { id: 6, name: "Mai Phương Thúy", date: "01/11/2024", score: 5.0, title: "Sách quá đẹp", content: "10 điểm." },
    { id: 7, name: "Đỗ Hùng Dũng", date: "28/10/2024", score: 4.0, title: "Dịch thuật tốt", content: "Khá mượt." },
    { id: 8, name: "Ngô Kiến Huy", date: "25/10/2024", score: 3.0, title: "Bình thường", content: "Cũng bình thường." },
    { id: 9, name: "Sơn Tùng MTP", date: "20/10/2024", score: 5.0, title: "Must read!", content: "Rất recommend." },
    { id: 10, name: "Đen Vâu", date: "15/10/2024", score: 4.5, title: "Chill phết", content: "Rất sâu lắng." },
    { id: 11, name: "Binz", date: "10/10/2024", score: 1.0, title: "Sách bị rách", content: "Thất vọng." },
    { id: 12, name: "Karik", date: "05/10/2024", score: 2.5, title: "Khó đọc", content: "Triết lý quá." },
    { id: 13, name: "Rhymastic", date: "01/10/2024", score: 5.0, title: "Đỉnh cao", content: "Plot twist bất ngờ." },
    { id: 14, name: "Justatee", date: "28/09/2024", score: 4.0, title: "Khá ổn", content: "Bạn gái rất thích." },
    { id: 15, name: "Suboi", date: "25/09/2024", score: 3.5, title: "Đọc giải trí được", content: "Nhẹ nhàng." }
];

export class ListingRatingPage {
    #data;
    #container;
    #headerTitle;
    #headerStar;
    #filterSelect;
    #plusBtn;
    #viewModal;

    constructor(data) {
        this.#data = data;
        this.#container = document.querySelector('.rating'); 
        this.#headerTitle = document.querySelector('.rating-title');
        this.#headerStar = document.querySelector('.rating-star');
        this.#filterSelect = document.querySelector('.filter-select');
        this.#plusBtn = document.querySelector('.plus-btn');
        
        this.#viewModal = new ViewRatingModal();

        if (this.#container) this.init();
    }

    init() {
        this.#updateHeaderInfo(); 
        this.#renderList(this.#data); 
        this.#addEventListeners();
        this.#initAddRatingModal();
    }

    #initAddRatingModal() {
        if (!this.#plusBtn) return;
        const addModal = new AddRatingModal((newReview) => {
            this.#data.unshift(newReview);
            if (this.#filterSelect) this.#filterSelect.value = 'all';
            this.#renderList(this.#data);
            this.#updateHeaderInfo();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        this.#plusBtn.addEventListener('click', () => addModal.show());
    }

    #updateHeaderInfo() {
        this.#headerTitle.innerText = "ĐỒI GIÓ HÚ"; 
        const totalScore = this.#data.reduce((sum, item) => sum + item.score, 0);
        const avgScore = this.#data.length ? (totalScore / this.#data.length) : 0; 
        const starImgSrc = this.#getStarImgPath(avgScore);

        this.#headerStar.innerHTML = `
            <img src="${starImgSrc}" alt="${avgScore.toFixed(1)}" style="height: 25px; vertical-align: middle;">
            <span style="font-size: 20px; vertical-align: middle; margin-left: 10px;">${avgScore.toFixed(1)} / 5.0</span>
            <span style="font-size: 14px; color: #666;">(${this.#data.length} đánh giá)</span>
        `;
    }

    #getStarImgPath(score) {
        const roundedScore = Math.round(score * 2) / 2;
        let scoreInt = roundedScore * 10; 
        if(scoreInt > 50) scoreInt = 50;
        const fileName = (scoreInt === 0) ? 'rating-0.png' : (scoreInt < 10 ? `rating-0${scoreInt}.png` : `rating-${scoreInt}.png`);
        return `../Images/ratings/${fileName}`;
    }

    #renderList(dataToRender) {
        this.#container.innerHTML = '';
        const topHtml = `<div class="line"></div>`;
        const cardsHtml = dataToRender.map(review => {
            const starImgSrc = this.#getStarImgPath(review.score);
            return `
            <div class="rating-card" data-rating-id="${review.id}" style="cursor: pointer;">
                <div class="main-inf">
                    <div class="name">${review.name}</div>
                    <div class="date">${review.date}</div>
                    <div class="star"><img src="${starImgSrc}" style="height: 20px;"></div>
                </div>
                <div class="comment">
                    <div class="comment-title">${review.title}</div>
                    <div class="content" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">"${review.content}"</div>
                </div>
            </div>`;
        }).join('');
        
        const bottomHtml = `<div class="line"></div><div class="all-ratings">Đang hiển thị (${dataToRender.length}) đánh giá</div>`;
        this.#container.innerHTML = topHtml + cardsHtml + bottomHtml;

        // Gắn sự kiện Click xem chi tiết
        this.#container.querySelectorAll('.rating-card').forEach(card => {
            card.addEventListener('click', () => {
                const item = this.#data.find(r => r.id == card.dataset.ratingId);
                if (item) this.#viewModal.show(item);
            });
        });
    }

    #addEventListeners() {
        if (this.#filterSelect) {
            this.#filterSelect.addEventListener('change', (e) => {
                const value = e.target.value;
                // Logic lọc giống file trước...
                let filteredData = this.#data; // (Giản lược code lọc để ngắn gọn)
                 if (value === 'option1') filteredData = this.#data.filter(i => i.score === 5.0);
                else if (value === 'option2') filteredData = this.#data.filter(i => i.score >= 4.0 && i.score < 5.0);
                else if (value === 'option3') filteredData = this.#data.filter(i => i.score >= 3.0 && i.score < 4.0);
                // ...
                this.#renderList(filteredData);
            });
        }
    }
}
document.addEventListener('DOMContentLoaded', () => { new ListingRatingPage(MOCK_REVIEWS_DATA); });