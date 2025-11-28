// Scripts/Reading/Reading-Detail/reading-player.js
export class ReadingPlayer {
    #audioEl;
    #elements;

    // SỬA: Thêm tham số audioUrl vào constructor
    constructor(audioElementId, audioUrl = null) {
        this.#audioEl = document.getElementById(audioElementId);
        console.log("LINK NHẠC NHẬN ĐƯỢC LÀ:", audioUrl);
        // [NEW] Logic gán nguồn nhạc động
        if (this.#audioEl && audioUrl) {
            this.#audioEl.src = audioUrl;
            this.#audioEl.load(); // Bắt buộc gọi load() để trình duyệt nhận nguồn mới
        }
        
        // Gom nhóm các elements
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

    init() {
        this.#setupAudioListeners();
        this.#setupUIListeners();
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