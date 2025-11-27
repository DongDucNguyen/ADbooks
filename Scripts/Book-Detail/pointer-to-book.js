document.addEventListener('click', function(e) {
    // Tìm phần tử được click (hoặc cha của nó) có class 'jstoBookDetailPage' hay không
    const targetButton = e.target.closest('.jstoBookDetailPage');

    // Nếu tìm thấy (tức là người dùng đã click vào đúng nút/ảnh sách)
    if (targetButton) {
        // Ngăn chặn hành vi mặc định (nếu là thẻ a)
        e.preventDefault(); 
        
        // Lấy ID sách nếu cần (để dùng sau này)
        const bookId = targetButton.dataset.bookId;
        console.log("Đang xem sách ID:", bookId);

        // Chuyển hướng
        
        window.location.href = "/Details/book.html";
    }
});