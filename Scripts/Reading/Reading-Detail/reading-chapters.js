// Scripts/Reading/Reading-Detail/reading-chapters.js
export class ReadingChapters {
    #chaptersData;
    #container;
    #audioEl;
    #playerInstance;
    #currentChapterId;

    constructor(chaptersData, audioElementId, playerInstance, initialChapterId) {
        this.#container = document.querySelector('.js-chapter-list');
        this.#audioEl = document.getElementById(audioElementId);
        this.#playerInstance = playerInstance;
        this.#chaptersData = this.#processData(chaptersData);

        // NEW: Sử dụng ID chapter ban đầu từ bookmark/first chapter
        this.#currentChapterId = initialChapterId;

        if (this.#container) {
            this.init();
        }
    }

    // NEW: Hàm xử lý raw data từ API
    #processData(rawChapters) {
        return rawChapters.map(chap => {
            const durationSec = parseInt(chap.duration) || 0; // Đảm bảo là số
            const m = Math.floor(durationSec / 60);
            const s = durationSec % 60;
            const timeStr = `${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;

            return {
                id: chap.id, // Lấy ID
                number: chap.number,
                title: chap.name,
                audioUrl: chap.audioUrl,
                duration: durationSec,
                durationDisplay: timeStr
            };
        });
    }

    init() {
        this.#render();
        // Không cần setupSyncWithAudio vì player đã tự xử lý currentTime
        // Ta chỉ cần update UI sau khi render
        this.#updateActiveUI(this.#currentChapterId);
    }

    #render() {
        this.#container.innerHTML = this.#chaptersData.map((chap, index) => {
            // Highlight chapter đang đọc ban đầu
            const isActive = chap.id === this.#currentChapterId;
            return `
            <li class="chapter-item ${isActive ? 'active' : ''}" data-chapter-id="${chap.id}" data-index="${index}">
                <span>Chương ${chap.number}: ${chap.title}</span>
                <span class="chapter-duration">${chap.durationDisplay}</span>
            </li>
        `}).join('');

        // Add Click Events
        this.#container.querySelectorAll('.chapter-item').forEach(item => {
            item.addEventListener('click', () => {
                const chapterId = parseInt(item.dataset.chapterId);
                this.#handleChapterClick(chapterId);
            });
        });
    }

    #handleChapterClick(chapterId) {
        if(!this.#playerInstance) return;

        const chap = this.#chaptersData.find(c => c.id === chapterId);

        if (chap) {
            // Cập nhật Player với chapter mới
            this.#playerInstance.setChapter(chap.id, chap.audioUrl, 0); // Bắt đầu từ 0
            this.#updateActiveUI(chap.id);
        }
    }

    // NEW: Cập nhật UI active
    #updateActiveUI(chapterId) {
        this.#currentChapterId = chapterId;
        const items = this.#container.querySelectorAll('.chapter-item');
        items.forEach(item => {
            item.classList.toggle('active', parseInt(item.dataset.chapterId) === chapterId);
        });
    }
}