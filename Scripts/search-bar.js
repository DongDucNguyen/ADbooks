// Scripts/search-bar.js

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const searchIcon = document.querySelector('.search-icon');

    // Hàm xử lý tìm kiếm chung
    function handleSearch() {
        const query = searchInput.value.trim();

        if (query) {
            // 1. Lưu từ khóa vào localStorage
            localStorage.setItem('searchQuery', query);

            // 2. Chuyển hướng tới trang Search-Results-Page.html
            // Lưu ý: Kiểm tra đường dẫn file của bạn. 
            // Nếu bạn đang ở thư mục gốc thì dùng ./Search-Results-Page.html
            // Nếu file JS này dùng chung cho cả file trong thư mục con, có thể cần xử lý path kỹ hơn.
            // Ở đây tôi để đường dẫn tuyệt đối từ root (/) hoặc tương đối phổ quát.

            // Giả sử Search-Results-Page.html nằm cùng cấp với Explore-Page.html
            window.location.href = "../Search-Results-Page.html";
        }
    }

    // Sự kiện 1: Nhấn Enter trong ô input
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }

    // Sự kiện 2: Click vào icon kính lúp
    if (searchIcon) {
        searchIcon.addEventListener('click', () => {
            handleSearch();
        });
    }
});

/* --- THÊM ĐOẠN NÀY VÀO CUỐI FILE --- */

document.addEventListener('click', function(e) {
    // 1. Xử lý khi click vào thẻ Sách (class: jstoBookDetailPage)
    const bookCard = e.target.closest('.jstoBookDetailPage');
    if (bookCard) {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ a (nếu có)
        
        // Lấy ID từ data-book-id hoặc data-id
        const bookId = bookCard.dataset.bookId || bookCard.dataset.id;
        
        if (bookId) {
            console.log("Navigating to Book ID:", bookId);
            
            // Kiểm tra xem đang ở thư mục gốc hay thư mục Details để chỉnh đường dẫn
            // Nếu URL hiện tại chứa '/Details/', nghĩa là đang ở trong thư mục con
            const isInDetails = window.location.pathname.includes('/Details/');
            
            // Nếu đang ở trong Details thì link là ./book-detail.html
            // Nếu đang ở ngoài (Home) thì link là ./Details/book-detail.html
            const targetPath = isInDetails ? './book-detail.html' : './Details/book-detail.html';
            
            window.location.href = `${targetPath}?id=${bookId}`;
        }
    }

    // 2. Xử lý khi click vào thẻ Tác giả (class: jstoAuthorPage)
    const authorLink = e.target.closest('.jstoAuthorPage');
    if (authorLink) {
        e.preventDefault();
        
        const authorId = authorLink.dataset.authorId || authorLink.dataset.id;
        
        if (authorId) {
            console.log("Navigating to Author ID:", authorId);
            
            const isInDetails = window.location.pathname.includes('/Details/');
            const targetPath = isInDetails ? './author.html' : './Details/author.html';
            
            window.location.href = `${targetPath}?id=${authorId}`;
        }
    }
});