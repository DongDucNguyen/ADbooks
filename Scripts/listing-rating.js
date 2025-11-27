/* Scripts/listing-rating.js */

// [NEW] Import Modal từ thư mục Book-Detail
import { AddRatingModal } from './Book-Detail/add-rating-modal.js';

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
    #plusBtn; // [NEW] Biến nút cộng

    constructor(data) {
        this.#data = data;
        
        this.#container = document.querySelector('.rating'); 
        this.#headerTitle = document.querySelector('.rating-title');
        this.#headerStar = document.querySelector('.rating-star');
        this.#filterSelect = document.querySelector('.filter-select');
        this.#plusBtn = document.querySelector('.plus-btn'); // [NEW] Lấy element nút cộng

        if (this.#container && this.#headerTitle) {
            this.init();
        } else {
            console.warn('ListingRatingPage: Thiếu DOM');
        }
    }

    init() {
        this.#updateHeaderInfo(); 
        this.#renderList(this.#data); 
        this.#addEventListeners();

        // [NEW] Khởi tạo Modal thêm đánh giá
        this.#initAddRatingModal();
    }

    // [NEW] Logic xử lý Modal (Tái sử dụng hoàn toàn logic cũ)
    #initAddRatingModal() {
        if (!this.#plusBtn) return;

        // Tạo instance modal và truyền callback xử lý dữ liệu trả về
        const addModal = new AddRatingModal((newReview) => {
            // 1. Thêm vào đầu danh sách
            this.#data.unshift(newReview);

            // 2. Reset bộ lọc về 'all' để thấy ngay review mới
            if (this.#filterSelect) {
                this.#filterSelect.value = 'all';
            }

            // 3. Render lại danh sách
            this.#renderList(this.#data);

            // 4. Tính lại điểm trung bình trên Header
            this.#updateHeaderInfo();

            // 5. Scroll lên đầu danh sách để user thấy bài vừa đăng
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Gắn sự kiện click
        this.#plusBtn.addEventListener('click', () => {
            addModal.show();
        });
    }

    #updateHeaderInfo() {
        this.#headerTitle.innerText = "ĐỒI GIÓ HÚ"; 

        // 1. Tính điểm trung bình
        const totalScore = this.#data.reduce((sum, item) => sum + item.score, 0);
        // Tránh chia cho 0 nếu chưa có review nào
        const avgScore = this.#data.length ? (totalScore / this.#data.length) : 0; 
        const displayScore = avgScore.toFixed(1); 

        // 2. Lấy ảnh sao 
        const starImgSrc = this.#getStarImgPath(avgScore);

        // 3. Render
        this.#headerStar.innerHTML = `
            <img src="${starImgSrc}" alt="${displayScore}" style="height: 25px; vertical-align: middle;">
            <span style="font-size: 20px; vertical-align: middle; margin-left: 10px;">${displayScore} / 5.0</span>
            <span style="font-size: 14px; color: #666;">(${this.#data.length} đánh giá)</span>
        `;
    }

    #getStarImgPath(score) {
        const roundedScore = Math.round(score * 2) / 2;
        let scoreInt = roundedScore * 10; 
        
        let fileName = '';
        if (scoreInt === 0) {
            fileName = 'rating-0.png';
        } else if (scoreInt < 10) {
            fileName = `rating-0${scoreInt}.png`;
        } else {
            if (scoreInt > 50) scoreInt = 50; // Đề phòng lỗi data > 5.0
            fileName = `rating-${scoreInt}.png`;
        }
        
        return `../Images/ratings/${fileName}`;
    }

    #renderList(dataToRender) {
        this.#container.innerHTML = '';
        const topHtml = `<div class="line"></div>`;
        
        const cardsHtml = dataToRender.map(review => {
            const starImgSrc = this.#getStarImgPath(review.score);

            return `
            <div class="rating-card">
                <div class="main-inf">
                    <div class="name">${review.name}</div>
                    <div class="date">${review.date}</div>
                    <div class="star">
                        <img src="${starImgSrc}" alt="${review.score} sao" style="height: 20px;">
                    </div>
                </div>
                <div class="comment">
                    <div class="comment-title">${review.title}</div>
                    <div class="content">"${review.content}"</div>
                </div>
            </div>
            `;
        }).join('');

        const bottomHtml = `
            <div class="line"></div>
            <div class="all-ratings">Đang hiển thị (${dataToRender.length}) đánh giá</div>
        `;

        this.#container.innerHTML = topHtml + cardsHtml + bottomHtml;
    }

    #addEventListeners() {
        if (this.#filterSelect) {
            this.#filterSelect.addEventListener('change', (e) => {
                const value = e.target.value;
                let filteredData = [];

                switch(value) {
                    case "all": 
                        filteredData = this.#data;
                        break;
                    case "option1": // 5 sao
                        filteredData = this.#data.filter(item => item.score === 5.0);
                        break;
                    case "option2": // 4.0 - 4.5
                        filteredData = this.#data.filter(item => item.score >= 4.0 && item.score < 5.0);
                        break;
                    case "option3": // 3.0 - 3.5
                        filteredData = this.#data.filter(item => item.score >= 3.0 && item.score < 4.0);
                        break;
                    case "option4": // 2.0 - 2.5
                        filteredData = this.#data.filter(item => item.score >= 2.0 && item.score < 3.0);
                        break;
                    case "option5": // 1.0 - 1.5
                        filteredData = this.#data.filter(item => item.score >= 1.0 && item.score < 2.0);
                        break;
                    default:
                        filteredData = this.#data;
                        break;
                }
                this.#renderList(filteredData);
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ListingRatingPage(MOCK_REVIEWS_DATA);
});