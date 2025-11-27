export class ReadingManager {
    #chapters;
    #currentChapterIndex;
    #isPlaying;
    #timerInterval;
    #autoScrollInterval; // Biến cho tính năng tự động cuộn
    #isAutoScrolling;

    // DOM Elements
    #chapterListEl;
    #playBtnEl;
    #playIconEl;
    #volumeSliderEl;
    #seekSliderEl;
    #currTimeEl;
    
    // Buttons Control
    #favBtnEl;
    #autoScrollBtnEl;
    #fullScreenBtnEl;
    #pdfFrameEl;

    constructor(chaptersData) {
        this.#chapters = chaptersData;
        this.#currentChapterIndex = 0;
        this.#isPlaying = false;
        this.#isAutoScrolling = false;

        // Select DOM Elements
        this.#chapterListEl = document.querySelector('.js-chapter-list');
        this.#playBtnEl = document.querySelector('.js-play-btn');
        this.#playIconEl = this.#playBtnEl ? this.#playBtnEl.querySelector('i') : null;
        this.#volumeSliderEl = document.querySelector('.volume-slider');
        
        this.#seekSliderEl = document.querySelector('.seek-slider');
        this.#currTimeEl = document.querySelector('.curr-time');
        
        // Select 3 nút chức năng mới
        this.#favBtnEl = document.querySelector('.js-fav-btn');
        this.#autoScrollBtnEl = document.querySelector('.js-autoscroll-btn');
        this.#fullScreenBtnEl = document.querySelector('.js-fullscreen-btn');
        this.#pdfFrameEl = document.querySelector('.js-pdf-frame');

        if (this.#chapterListEl) {
            this.init();
        }
    }

    init() {
        this.#renderChapters();
        this.#addEventListeners();
    }

    #renderChapters() {
        this.#chapterListEl.innerHTML = this.#chapters.map((chap, index) => `
            <li class="chapter-item ${index === this.#currentChapterIndex ? 'active' : ''}" data-index="${index}">
                <span>${chap.title}</span>
                <span class="chapter-duration">${chap.duration}</span>
            </li>
        `).join('');

        this.#chapterListEl.querySelectorAll('.chapter-item').forEach(item => {
            item.addEventListener('click', () => this.#handleChapterClick(parseInt(item.dataset.index)));
        });
    }

    #handleChapterClick(index) {
        this.#currentChapterIndex = index;
        this.#renderChapters();
        
        if(this.#seekSliderEl) this.#seekSliderEl.value = 0;
        if(this.#currTimeEl) this.#currTimeEl.textContent = "00:00";
        
        if (!this.#isPlaying) {
            this.#togglePlay();
        }
    }

    #togglePlay() {
        this.#isPlaying = !this.#isPlaying;
        
        if (this.#isPlaying) {
            this.#playIconEl.classList.replace('fa-play', 'fa-pause');
            this.#startTimer();
        } else {
            this.#playIconEl.classList.replace('fa-pause', 'fa-play');
            this.#stopTimer();
        }
    }

    #startTimer() {
        this.#stopTimer();
        this.#timerInterval = setInterval(() => {
            if (this.#seekSliderEl) {
                let val = parseInt(this.#seekSliderEl.value);
                if (val < 100) {
                    this.#seekSliderEl.value = val + 1;
                    let minutes = Math.floor(val / 60);
                    let seconds = val % 60;
                    if(this.#currTimeEl) {
                        this.#currTimeEl.textContent = 
                            `${minutes < 10 ? '0'+minutes : minutes}:${seconds < 10 ? '0'+seconds : seconds}`;
                    }
                } else {
                    this.#togglePlay();
                }
            }
        }, 1000);
    }

    #stopTimer() {
        if (this.#timerInterval) clearInterval(this.#timerInterval);
    }

    // --- LOGIC 3 NÚT CHỨC NĂNG MỚI ---
    
    // 1. Xử lý nút Yêu thích
    #toggleFavorite() {
        this.#favBtnEl.classList.toggle('active');
        if (this.#favBtnEl.classList.contains('active')) {
            this.#favBtnEl.textContent = "Đã thích";
        } else {
            this.#favBtnEl.textContent = "Yêu thích";
        }
    }

    // 2. Xử lý nút Tự động cuộn (Auto Scroll)
    #toggleAutoScroll() {
        this.#isAutoScrolling = !this.#isAutoScrolling;
        this.#autoScrollBtnEl.classList.toggle('active');

        if (this.#isAutoScrolling) {
            // Logic cuộn: Cố gắng cuộn iframe window (có thể bị chặn bởi chính sách bảo mật trình duyệt nếu khác domain)
            // Hoặc cuộn phần tử chứa PDF
            this.#autoScrollBtnEl.textContent = "Dừng cuộn";
            
            // Giả lập cuộn đơn giản (chỉ chạy tốt nếu PDF render bằng HTML hoặc Canvas, iframe PDF native khó can thiệp)
            console.log("Bắt đầu tự động cuộn...");
        } else {
            this.#autoScrollBtnEl.textContent = "Tự động cuộn";
            console.log("Dừng cuộn.");
        }
    }

    // 3. Xử lý nút Toàn màn hình
    #toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable full-screen mode: ${err.message}`);
            });
            this.#fullScreenBtnEl.textContent = "Thoát";
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                this.#fullScreenBtnEl.textContent = "Toàn màn hình";
            }
        }
    }

    #addEventListeners() {
        if (this.#playBtnEl) this.#playBtnEl.addEventListener('click', () => this.#togglePlay());
        if (this.#volumeSliderEl) {
            this.#volumeSliderEl.addEventListener('input', (e) => console.log('Volume:', e.target.value));
        }

        // --- SỰ KIỆN CHO 3 NÚT MỚI ---
        if (this.#favBtnEl) {
            this.#favBtnEl.addEventListener('click', () => this.#toggleFavorite());
        }

        if (this.#autoScrollBtnEl) {
            this.#autoScrollBtnEl.addEventListener('click', () => this.#toggleAutoScroll());
        }

        if (this.#fullScreenBtnEl) {
            this.#fullScreenBtnEl.addEventListener('click', () => this.#toggleFullScreen());
        }
    }
}

// Data giả lập
const mockChapters = [
    { title: "Chapter 1: The Beginning", duration: "12:05" },
    { title: "Chapter 2: Into the Wild", duration: "15:30" },
    { title: "Chapter 3: Survival", duration: "10:00" },
    { title: "Chapter 4: Discovery", duration: "08:45" },
    { title: "Chapter 5: The End", duration: "11:20" }
];

document.addEventListener('DOMContentLoaded', () => {
    new ReadingManager(mockChapters);
});