document.addEventListener('click', function(e) {
    if (e.target.closest('.jstoBookDetailPage')) {
        return;
    }

    const targetButton = e.target.closest('.jstoAuthorPage');

    if (targetButton) {
        e.preventDefault();

        const authorId = targetButton.dataset.authorId;
        console.log("Đang xem tác giả ID:", authorId);

        // Chuyển hướng, truyền ID tác giả qua query parameter
        if (authorId) {
            window.location.href = `/Details/author.html?id=${authorId}`;
        } else {
            console.error("Không tìm thấy authorId trên element.");
            window.location.href = "/Details/author.html";
        }
    }
});