// Scripts/search-results.js

let DB_DATA = { books: [], authors: [], links: [] }; // Biến toàn cục chứa dữ liệu

document.addEventListener('DOMContentLoaded', async () => {
    const resultsContainer = document.querySelector('.search-results-container');
    const searchTitle = document.querySelector('.search-title-content'); // Sửa lại class cho đúng với HTML gốc

    // 1. Hiển thị trạng thái đang tải
    if (resultsContainer) resultsContainer.innerHTML = '<p style="text-align: center; font-size: 20px;">Loading data...</p>';

    try {
        // 2. ĐỌC FILE JSON TỪ SERVER
        const response = await fetch('./database-last.json'); 
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const rawData = await response.json();

        // 3. Chuẩn hóa dữ liệu
        processData(rawData);

        // 4. Bắt đầu tìm kiếm
        initSearchApp(resultsContainer, searchTitle);

    } catch (error) {
        console.error("Lỗi không đọc được file JSON:", error);
        if (resultsContainer) {
            resultsContainer.innerHTML = `
                <div style="text-align: center; width: 100%;">
                    <p style="color: red; font-weight: bold; font-size: 20px;">Không thể đọc dữ liệu!</p>
                    <p>Lưu ý: Bạn phải chạy web bằng <u>Live Server</u> (localhost) thì mới đọc được file JSON.</p>
                </div>
            `;
        }
    }
});

// --- HÀM XỬ LÝ DỮ LIỆU ---
function processData(rawData) {
    DB_DATA.books = rawData.books || [];
    DB_DATA.authors = rawData.author || []; // JSON gốc là 'author' (số ít)
    DB_DATA.links = rawData.authorsOfBooks || [];
}

// --- LOGIC TÌM KIẾM ---
function initSearchApp(resultsContainer, searchTitle) {
    const query = localStorage.getItem('searchQuery');

    if (searchTitle && query) {
        searchTitle.textContent = `Kết Quả: "${query}"`;
    }

    if (!query) {
        if(resultsContainer) resultsContainer.innerHTML = '<p style="text-align: center;">Vui lòng nhập từ khóa để tìm kiếm.</p>';
        return;
    }

    const results = performSearch(query);
    renderSearchResults(results, resultsContainer);
}

function performSearch(query) {
    const lowerQuery = query ? String(query).toLowerCase().trim() : "";
    if (!lowerQuery) return [];

    const results = [];

    // 1. Tìm SÁCH
    if (Array.isArray(DB_DATA.books)) {
        DB_DATA.books.forEach(book => {
            const bookName = book.name ? String(book.name).toLowerCase() : "";
            
            if (bookName.includes(lowerQuery)) {
                // Tìm tác giả
                const link = Array.isArray(DB_DATA.links) ? DB_DATA.links.find(l => l.BookId === book.id) : null;
                let authorName = "Unknown Author";
                
                if (link && Array.isArray(DB_DATA.authors)) {
                    const author = DB_DATA.authors.find(a => a.id === link.AuthorId);
                    if (author) authorName = getFullName(author);
                }

                results.push({
                    type: 'book',
                    id: book.id,
                    title: book.name || "No Title",
                    author: authorName,
                    publishDate: book.releaseDate || "Unknown",
                    img: book.thumbnailUrl || "./Images/Book-Covers/default.png"
                });
            }
        });
    }

    // 2. Tìm TÁC GIẢ
    if (Array.isArray(DB_DATA.authors)) {
        DB_DATA.authors.forEach(author => {
            const fullName = getFullName(author);
            const lowerName = fullName ? String(fullName).toLowerCase() : "";

            if (lowerName.includes(lowerQuery)) {
                results.push({
                    type: 'author',
                    id: author.id,
                    name: fullName || "No Name",
                    birthDate: author.birthday || "Unknown",
                    img: author.imagineUrl || author.image || "./Images/Authors/default.png"
                });
            }
        });
    }

    return results;
}

function getFullName(author) {
    const first = author.firstName || "";
    const last = author.lastName || "";
    const vnSurnames = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Huỳnh", "Phan", "Vũ", "Võ", "Đặng", "Bùi", "Đỗ", "Hồ", "Ngô", "Dương", "Lý", "Chu", "Sơn", "Tô", "Trương", "Phùng", "Kim", "Nam"];
    
    if (vnSurnames.includes(last)) {
        return `${last} ${first}`.trim();
    }
    return `${first} ${last}`.trim();
}

// --- HÀM RENDER (QUAN TRỌNG: Đã chỉnh đúng HTML Structure của bạn) ---
function renderSearchResults(data, container) {
    if (!container) return;
    container.innerHTML = '';

    if (data.length === 0) {
        container.innerHTML = '<p style="text-align: center; width: 100%; grid-column: span 3; font-size: 18px;">Không tìm thấy kết quả nào.</p>';
        return;
    }

    data.forEach(item => {
        const card = document.createElement('div');
        
        // SÁCH: Render đúng cấu trúc Book Card
        if (item.type === 'book') {
            card.className = 'result-card book-card-type';
            // Khi click vào card sẽ chuyển trang
            card.onclick = () => window.location.href = `./Details/book.html?id=${item.id}`;
            
            card.innerHTML = `
                <div class="card-background"></div>
                <div class="card-content-layout">
                    <img src="${item.img}" class="book-cover-img" alt="${item.title}" onerror="this.src='./Images/Book-Covers/default.png'">
                    
                    <div class="info-area">
                        <h3 class="item-title">${item.title}</h3>
                        <p class="item-subtitle">${item.author}</p>
                        <p class="item-meta">Xuất bản: ${item.publishDate}</p>
                    </div>
                </div>
            `;
        } 
        // TÁC GIẢ: Render đúng cấu trúc Author Card
        else if (item.type === 'author') {
            card.className = 'result-card author-card-type';
            card.onclick = () => window.location.href = `./Details/author.html?id=${item.id}`;

            card.innerHTML = `
                <div class="card-background"></div>
                <div class="card-content-layout author-layout">
                    <img src="${item.img}" class="author-avatar-img" alt="${item.name}" onerror="this.src='./Images/Authors/default.png'">
                    
                    <div class="info-area author-info">
                        <h3 class="item-title">${item.name}</h3>
                        <p class="item-meta">Sinh ngày: ${item.birthDate}</p>
                    </div>
                </div>
            `;
        }
        
        container.appendChild(card);
    });
}