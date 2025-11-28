export class AuthorIntro {
    constructor(data) {
        this.data = data;
    }

    init() {
        // Cập nhật ảnh nền và ảnh đại diện
        const bgImg = document.querySelector('.introduction-grid-img');
        const avatarImg = document.querySelector('.author-image img');
        
        if (bgImg) bgImg.src = this.data.img;
        if (avatarImg) avatarImg.src = this.data.img;

        // Cập nhật text
        const nameEl = document.querySelector('.introduction-name');
        const dobEl = document.querySelector('.introduction-DoB');
        const desEl = document.querySelector('.introduction-des');

        if (nameEl) nameEl.textContent = this.data.name;
        if (dobEl) dobEl.textContent = this.data.dob;
        if (desEl) desEl.textContent = this.data.shortDesc;
    }
}