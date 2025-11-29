// Scripts/Author-Detail/pointer-to-author-page.js

document.addEventListener('click', function(e) {
    // Nếu click vào sách thì bỏ qua (để pointer-to-book xử lý)
    if (e.target.closest('.jstoBookDetailPage')) {
        return; 
    }

    // Tìm phần tử được click có class 'jstoAuthorPage'
    const targetButton = e.target.closest('.jstoAuthorPage');

    if (targetButton) {
        e.preventDefault(); 
        
        // 1. Lấy ID tác giả từ data-author-id
        const authorId = targetButton.dataset.authorId;

        if (authorId) {
            console.log("Đang chuyển hướng đến tác giả ID:", authorId);
            // 2. Chuyển hướng kèm ID trên URL
            // Ví dụ: /Details/author.html?id=14
            window.location.href = `../Details/author.html?id=${authorId}`;
        } else {
            console.error("Lỗi: Không tìm thấy ID tác giả.");
        }
    }
});