document.addEventListener('click', function(e) {
    const targetButton = e.target.closest('.jstoBookDetailPage');

    if (targetButton) {
        e.preventDefault();

        const bookId = targetButton.dataset.bookId;
        console.log("Đang xem sách ID:", bookId);

        // Chuyển hướng, truyền ID sách qua query parameter
        if (bookId) {
            window.location.href = `/Details/book.html?id=${bookId}`;
        } else {
            console.error("Không tìm thấy bookId trên element.");
            window.location.href = "/Details/book.html";
        }
    }
});