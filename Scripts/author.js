import { authorService } from './API/author-service.js';
import { TopAuthorSlider } from './Author-Page/top-author.js';
import { RecentActivitiesSection } from './Author-Page/recent-activities.js';
import { RisingAuthorsSection } from './Author-Page/rising-authors.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 1. Gọi API lấy 12 tác giả
        const authors = await authorService.getAuthors({ page: 0, size: 12 });

        if (!authors || authors.length === 0) {
            console.warn("API trả về danh sách rỗng");
            return;
        }

        // 2. Chia dữ liệu giả lập (Slice array)
        const topAuthorsRaw = authors.slice(0, 3);       // 3 người đầu -> Slider
        const recentAuthorsRaw = authors.slice(3, 7);    // 4 người tiếp -> Recent
        const risingAuthorsRaw = authors.slice(7, 11);   // 4 người sau -> Rising

        // 3. Mapping dữ liệu & Render

        // --- SECTION 1: TOP AUTHORS (Slider) ---
        const topAuthorsData = topAuthorsRaw.map(a => ({
            id: a.id,
            name: a.fullName,
            birthDate: formatDate(a.birthday),
            description: a.description || "Chưa có mô tả.",
            link: `./Details/author.html?id=${a.id}`,
            img: getSafeImageUrl(a.imageUrl),
            // Map sách: API trả về 'thumbnailUrl', UI cần 'img'
            books: (a.books || []).slice(0, 3).map(b => ({
                id: b.id,
                img: getSafeImageUrl(b.thumbnailUrl, true)
            }))
        }));
        if (topAuthorsData.length > 0) new TopAuthorSlider(topAuthorsData);

        // --- SECTION 2: RECENT ACTIVITIES ---
        const recentActivitiesData = recentAuthorsRaw.map(a => ({
            id: a.id,
            name: a.fullName,
            img: getSafeImageUrl(a.imageUrl),
            recentBooks: (a.books || []).slice(0, 3).map(b => ({
                id: b.id,
                // API trả về YYYY-MM-DD -> Cắt lấy YYYY-MM
                date: b.releaseDate ? b.releaseDate.substring(0, 7) : "Mới nhất", 
                title: b.name,
                link: `./Details/book.html?id=${b.id}`
            }))
        }));
        if (recentActivitiesData.length > 0) new RecentActivitiesSection(recentActivitiesData);

        // --- SECTION 3: RISING AUTHORS ---
        const risingAuthorsData = risingAuthorsRaw.map(a => ({
            id: a.id,
            name: a.fullName,
            img: getSafeImageUrl(a.imageUrl),
            link: `./Details/author.html?id=${a.id}`,
            bio: a.description ? a.description.substring(0, 100) + "..." : "Tác giả trẻ đầy triển vọng."
        }));
        if (risingAuthorsData.length > 0) new RisingAuthorsSection(risingAuthorsData);

        setupCategoryLinks();

    } catch (error) {
        console.error("Lỗi tải trang Author:", error);
    }
});

// --- HELPER FUNCTIONS ---
function getSafeImageUrl(url, isBook = false) {
    // Xử lý trường hợp API trả về null, rỗng hoặc chuỗi "string" mặc định của Swagger
    if (!url || url === "string" || url.trim() === "") {
        return isBook ? './Images/Book-Covers/default-book.png' : './Images/Authors/default-author.png';
    }
    return url;
}

function formatDate(dateString) {
    if (!dateString) return "N/A";
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

function setupCategoryLinks() {
    const setCat = (name) => localStorage.setItem('selectedAuthorCategory', name);
    const topTitle = document.querySelector('.top-author-section-title');
    const recentTitle = document.querySelector('.recent-activities-title');
    const risingTitle = document.querySelector('.rising-background-title');

    if(topTitle) topTitle.addEventListener('click', () => setCat("TÁC GIẢ NỔI BẬT"));
    if(recentTitle) recentTitle.addEventListener('click', () => setCat("HOẠT ĐỘNG GẦN ĐÂY"));
    if(risingTitle) risingTitle.addEventListener('click', () => setCat("TÁC GIẢ TRẺ"));
}