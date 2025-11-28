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