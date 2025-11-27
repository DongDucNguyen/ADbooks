document.addEventListener('click', function(e) {
    if (e.target.closest('.jstoBookDetailPage')) {
        return; 
    }
    // Tìm phần tử được click (hoặc cha của nó) có class 'jstoBookDetailPage' hay không
    const targetButton = e.target.closest('.jstoAuthorPage');

    // Nếu tìm thấy (tức là người dùng đã click vào đúng nút/ảnh sách)
    if (targetButton) {
        // Ngăn chặn hành vi mặc định (nếu là thẻ a)
        e.preventDefault(); 
        
        // Lấy ID sách nếu cần (để dùng sau này)
        const authorId = targetButton.dataset.authorId;
        console.log("Đang xem sách ID:", authorId);

        // Chuyển hướng
        
        window.location.href = "/Details/author.html";
    }
});