/* Scripts/listing-author-rating.js */

// Mock Data có thêm trường 'bookTitle'
const MOCK_AUTHOR_REVIEWS = [
    {
        id: 201,
        bookTitle: "All The Light We Cannot See",
        name: "Nguyễn Văn A",
        date: "22/11/2024",
        score: 5.0,
        title: "Tác giả yêu thích",
        content: "Văn phong của Anthony Doerr thực sự rất đẹp, giàu hình ảnh và cảm xúc."
    },
    {
        id: 202,
        bookTitle: "Cloud Cuckoo Land",
        name: "Trần Thị B",
        date: "10/11/2024",
        score: 4.5,
        title: "Tuyệt vời",
        content: "Cốt truyện đan xen quá khứ và hiện tại rất khéo léo."
    },
    {
        id: 203,
        bookTitle: "About Grace",
        name: "Lê Hoàng C",
        date: "05/11/2024",
        score: 3.0,
        title: "Hơi khó đọc",
        content: "Mạch truyện chậm, cần kiên nhẫn mới cảm được."
    },
    {
        id: 204,
        bookTitle: "All The Light We Cannot See",
        name: "Phạm D",
        date: "01/11/2024",
        score: 5.0,
        title: "Ánh sáng vô hình",
        content: "Cuốn sách hay nhất mình từng đọc trong năm nay."
    },
    {
        id: 205,
        bookTitle: "Memory Wall",
        name: "Hoàng E",
        date: "20/10/2024",
        score: 2.0,
        title: "Không hợp gu",
        content: "Quá nhiều miêu tả, ít đối thoại, đọc buồn ngủ."
    },
    {
        id: 206,
        bookTitle: "Four Seasons in Rome",
        name: "Mai Phương Thúy",
        date: "15/10/2024",
        score: 4.0,
        title: "Nhẹ nhàng",
        content: "Một cuốn hồi ký rất thơ mộng về Rome."
    }
];

export class ListingAuthorRatingPage {
    #data;
    #container;
    #headerTitle;
    #headerStar;
    #filterSelect;

    constructor(data) {
        this.#data = data;
        
        this.#container = document.querySelector('.rating'); 
        this.#headerTitle = document.querySelector('.rating-title');
        this.#headerStar = document.querySelector('.rating-star');
        this.#filterSelect = document.querySelector('.filter-select');

        if (this.#container && this.#headerTitle) {
            this.init();
        } else {
            console.warn('ListingAuthorRatingPage: Thiếu DOM');
        }
    }

    init() {
        this.#updateHeaderInfo(); 
        this.#renderList(this.#data); 
        this.#addEventListeners();
    }

    // --- KHÁC BIỆT 1: Chỉ hiện tên tác giả, không tính sao trung bình ---
    #updateHeaderInfo() {
        // Tên tác giả (Có thể lấy từ localStorage hoặc Data tĩnh)
        this.#headerTitle.innerText = localStorage.getItem('selectedAuthorCategory');; //lấy từ localstorage
        
        // Ẩn phần sao đi hoặc để trống
        if (this.#headerStar) {
            this.#headerStar.style.display = 'none'; 
            // Hoặc nếu muốn hiện text phụ:
            // this.#headerStar.innerText = "Tổng hợp đánh giá từ độc giả";
        }
    }

    #getStarImgPath(score) {
        // Logic lấy ảnh sao (giữ nguyên)
        const roundedScore = Math.round(score * 2) / 2;
        let scoreInt = roundedScore * 10; 
        
        let fileName = '';
        if (scoreInt === 0) fileName = 'rating-0.png';
        else if (scoreInt < 10) fileName = `rating-0${scoreInt}.png`;
        else {
            if (scoreInt > 50) scoreInt = 50;
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
            <div class="rating-card" data-rating-id="${review.id}">
                <div class="main-inf">
                    <div class="name">${review.name}</div>
                    <div class="date">${review.date}</div>
                    <div class="star">
                        <img src="${starImgSrc}" alt="${review.score} sao" style="height: 20px;">
                    </div>
                </div>
                <div class="comment">
                    <div class="review-book-ref" style="font-size: 13px; color: #666; margin-bottom: 5px; font-weight: bold; font-style: italic;">
                        <i class="fa-solid fa-book"></i> ${review.bookTitle}
                    </div>

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
                    case "all": filteredData = this.#data; break;
                    case "option1": filteredData = this.#data.filter(item => item.score === 5.0); break;
                    case "option2": filteredData = this.#data.filter(item => item.score >= 4.0 && item.score < 5.0); break;
                    case "option3": filteredData = this.#data.filter(item => item.score >= 3.0 && item.score < 4.0); break;
                    case "option4": filteredData = this.#data.filter(item => item.score >= 2.0 && item.score < 3.0); break;
                    case "option5": filteredData = this.#data.filter(item => item.score >= 1.0 && item.score < 2.0); break;
                    default: filteredData = this.#data; break;
                }
                this.#renderList(filteredData);
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ListingAuthorRatingPage(MOCK_AUTHOR_REVIEWS);
});