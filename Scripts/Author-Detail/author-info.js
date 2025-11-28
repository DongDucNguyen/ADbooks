export class AuthorInfo {
    constructor(data) {
        this.data = data;
    }

    init() {
        const aboutContent = document.querySelector('.about-the-author-content');
        const relatedContent = document.querySelector('.related-infor-content');

        if (aboutContent) aboutContent.innerHTML = this.data.fullDescription;
        if (relatedContent) relatedContent.innerHTML = this.data.relatedInfo;
    }
}