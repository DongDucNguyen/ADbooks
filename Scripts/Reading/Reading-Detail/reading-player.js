// Scripts/Reading/Reading-Detail/reading-player.js
export class ReadingPlayer {
    #audioEl;
    #elements;
    #bookId; // NEW
    #chapterId; // NEW
    #token = localStorage.getItem('token'); // NEW

    // SỬA: Thêm bookId, chapterId, audioUrl và initialTime
    constructor(audioElementId, bookId, chapterId, audioUrl = null, initialTime = 0) {
        this.#audioEl = document.getElementById(audioElementId);
        this.#bookId = bookId;
        this.#chapterId = chapterId;

        // [NEW] Logic gán nguồn nhạc động và thời gian
        if (this.#audioEl && audioUrl) {
            this.#audioEl.src = audioUrl;
            this.#audioEl.load();
            // Chỉ set currentTime nếu lớn hơn 0
            this.#audioEl.currentTime = initialTime > 0 ? initialTime : 0;
        }

        this.#elements = {
            playBtn: document.querySelector('.js-play-btn'),
            playIcon: document.querySelector('.js-play-btn i'),
            seekSlider: document.querySelector('.seek-slider'),
            currTime: document.querySelector('.curr-time'),
            totalTime: document.querySelector('.total-time'),
            volSlider: document.querySelector('.vol-slider'),
            speedBtn: document.querySelector('.js-speed-btn'),
            speedDropdown: document.querySelector('.js-speed-dropdown')
        };

        if (this.#audioEl && this.#elements.playBtn) {
            this.init();
        }
    }

    // Public: Update Chapter ID (khi click vào mục lục)
    setChapter(chapterId, audioUrl, initialTime = 0) {
        this.#chapterId = chapterId;
        if (this.#audioEl) {
            this.#audioEl.src = audioUrl;
            this.#audioEl.load();
            this.#audioEl.currentTime = initialTime;
            this.#audioEl.play();
        }
    }

    // Public: Trả về chapter ID đang phát
    get currentChapterId() {
        return this.#chapterId;
    }

    init() {
        this.#setupAudioListeners();
        this.#setupUIListeners();
        this.#startProgressUpdater(); // NEW
    }

    // NEW: Gửi tiến độ lên API sau mỗi 5s
    #startProgressUpdater() {
        // Chỉ update nếu có token và bookId
        if (!this.#token || !this.#bookId) return;

        setInterval(() => {
            if (!this.#audioEl.paused && this.#chapterId) {
                // Đảm bảo timeline không vượt quá duration
                const timeline = Math.min(Math.floor(this.#audioEl.currentTime), Math.floor(this.#audioEl.duration));
                if (!isNaN(timeline)) {
                    this.#sendProgressUpdate(timeline);
                }
            }
        }, 5000); // Mỗi 5 giây
    }

    async #sendProgressUpdate(timeline) {
        try {
            await fetch("http://localhost:8080/api/v1/user/progress", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.#token}`
                },
                body: JSON.stringify({
                    bookId: this.#bookId,
                    chapterId: this.#chapterId,
                    timeline: timeline
                })
            });
        } catch (error) {
            console.error("Failed to update progress:", error);
        }
    }

    // --- AUDIO EVENT LISTENERS ---
    #setupAudioListeners() {
        this.#audioEl.addEventListener('loadedmetadata', () => this.#syncSliderMax());

        this.#audioEl.addEventListener('timeupdate', () => {
            const currentTime = this.#audioEl.currentTime;
            const duration = this.#audioEl.duration;

            if (!isNaN(duration)) {
                if (this.#elements.seekSlider.max != Math.floor(duration)) {
                    this.#syncSliderMax();
                }
                this.#elements.seekSlider.value = Math.floor(currentTime);
                this.#updateSliderColor(this.#elements.seekSlider, currentTime, duration);
            }
            if(this.#elements.currTime) {
                this.#elements.currTime.textContent = this.#formatTime(currentTime);
            }
        });

        this.#audioEl.addEventListener('ended', () => {
            this.#elements.playIcon.classList.replace('fa-pause', 'fa-play');
            this.#elements.seekSlider.value = 0;
            this.#updateSliderColor(this.#elements.seekSlider, 0, 100);

            // NEW: Gửi tiến độ hoàn thành chapter cuối
            if(this.#chapterId) this.#sendProgressUpdate(Math.floor(this.#audioEl.duration));
        });
    }

    // --- UI EVENT LISTENERS ---
    #setupUIListeners() {
        // Play/Pause
        this.#elements.playBtn.addEventListener('click', () => {
            if (this.#audioEl.paused) {
                this.#audioEl.play();
                this.#elements.playIcon.classList.replace('fa-play', 'fa-pause');
            } else {
                this.#audioEl.pause();
                this.#elements.playIcon.classList.replace('fa-pause', 'fa-play');
            }
        });

        // Seek Slider
        this.#elements.seekSlider.addEventListener('input', (e) => {
            const val = e.target.value;
            this.#audioEl.currentTime = val;
            this.#updateSliderColor(e.target, val, this.#audioEl.duration);
        });

        // Volume
        if(this.#elements.volSlider) {
            this.#elements.volSlider.addEventListener('input', (e) => {
                this.#audioEl.volume = e.target.value / 100;
            });
        }

        // Speed Control
        if(this.#elements.speedBtn) {
            this.#elements.speedBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.#elements.speedDropdown.classList.toggle('show');
            });

            this.#elements.speedDropdown.addEventListener('click', (e) => {
                const target = e.target.closest('li');
                if (!target) return;
                
                const speed = parseFloat(target.dataset.speed);
                this.#audioEl.playbackRate = speed;
                this.#elements.speedBtn.textContent = speed + 'x';
                
                this.#elements.speedDropdown.querySelectorAll('li').forEach(li => li.classList.remove('active'));
                target.classList.add('active');
                this.#elements.speedDropdown.classList.remove('show');
            });

            document.addEventListener('click', (e) => {
                if (!this.#elements.speedDropdown.contains(e.target) && e.target !== this.#elements.speedBtn) {
                    this.#elements.speedDropdown.classList.remove('show');
                }
            });
        }
    }

    // --- HELPERS ---
    #syncSliderMax() {
        const totalSeconds = this.#audioEl.duration;
        if (!isNaN(totalSeconds)) {
            this.#elements.seekSlider.max = Math.floor(totalSeconds);
            if(this.#elements.totalTime) {
                this.#elements.totalTime.textContent = this.#formatTime(totalSeconds);
            }
        }
    }

    #updateSliderColor(slider, current, total) {
        const percent = (current / total) * 100;
        slider.style.background = `linear-gradient(to right, #333 ${percent}%, #eee ${percent}%)`;
    }

    #formatTime(seconds) {
        if (!seconds && seconds !== 0) return "00:00";
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        if (h > 0) return `${h}:${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;
        return `${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;
    }
}