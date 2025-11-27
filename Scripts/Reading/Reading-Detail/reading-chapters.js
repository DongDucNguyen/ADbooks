// Scripts/Reading/Reading-Detail/reading-chapters.js
export class ReadingChapters {
    #data;
    #container;
    #audioEl;
    #processedChapters;
    #currentChapterIndex;

    constructor(chaptersData, audioElementId) {
        this.#container = document.querySelector('.js-chapter-list');
        this.#audioEl = document.getElementById(audioElementId);
        this.#processedChapters = this.#processData(chaptersData);
        this.#currentChapterIndex = 0;

        if (this.#container) {
            this.init();
        }
    }

    init() {
        this.#render();
        this.#setupSyncWithAudio();
    }

    #processData(rawChapters) {
        let cumulativeTime = 0;
        return rawChapters.map(chap => {
            const start = cumulativeTime;
            const durationSec = chap.duration;
            cumulativeTime += durationSec;
            
            // Format time display
            const m = Math.floor(durationSec / 60);
            const s = durationSec % 60;
            const timeStr = `${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;

            return {
                title: chap.title,
                startTime: start,
                durationDisplay: timeStr
            };
        });
    }

    #render() {
        this.#container.innerHTML = this.#processedChapters.map((chap, index) => `
            <li class="chapter-item ${index === 0 ? 'active' : ''}" data-index="${index}">
                <span>${chap.title}</span>
                <span class="chapter-duration">${chap.durationDisplay}</span>
            </li>
        `).join('');

        // Add Click Events
        this.#container.querySelectorAll('.chapter-item').forEach(item => {
            item.addEventListener('click', () => {
                const idx = parseInt(item.dataset.index);
                this.#handleChapterClick(idx);
            });
        });
    }

    #handleChapterClick(index) {
        if(!this.#audioEl) return;
        const chap = this.#processedChapters[index];
        this.#audioEl.currentTime = chap.startTime;
        if (this.#audioEl.paused) this.#audioEl.play();
        
        // Update UI ngay lập tức
        this.#updateActiveUI(index);
    }

    #setupSyncWithAudio() {
        if(!this.#audioEl) return;
        this.#audioEl.addEventListener('timeupdate', () => {
            const currentTime = this.#audioEl.currentTime;
            this.#autoDetectChapter(currentTime);
        });
    }

    #autoDetectChapter(time) {
        let activeIndex = 0;
        for (let i = 0; i < this.#processedChapters.length; i++) {
            if (time >= this.#processedChapters[i].startTime) activeIndex = i;
            else break; 
        }
        
        if (activeIndex !== this.#currentChapterIndex) {
            this.#updateActiveUI(activeIndex);
        }
    }

    #updateActiveUI(index) {
        this.#currentChapterIndex = index;
        const items = this.#container.querySelectorAll('.chapter-item');
        items.forEach(item => item.classList.remove('active'));
        if(items[index]) items[index].classList.add('active');
    }
}