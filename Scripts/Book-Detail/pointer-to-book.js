// Scripts/Book-Detail/pointer-to-book.js

document.addEventListener('click', function(e) {
    // Tìm phần tử được click (hoặc cha của nó) có class 'jstoBookDetailPage'
    const targetButton = e.target.closest('.jstoBookDetailPage');

    if (targetButton) {
        e.preventDefault(); 
        
        // 1. Lấy ID sách từ data-book-id (Ví dụ: data-book-id="12")
        const bookId = targetButton.dataset.bookId;

        if (bookId) {
            console.log("Đang chuyển hướng đến sách ID:", bookId);
            // 2. Chuyển hướng kèm theo ID trên URL
            // Ví dụ kết quả: /Details/book.html?id=12
            window.location.href = `/Details/book.html?id=${bookId}`;
        } else {
            console.error("Lỗi: Không tìm thấy ID sách trên phần tử này.");
        }
    }
});