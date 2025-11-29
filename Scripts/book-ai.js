import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai";

// 1. Hàm làm sạch văn bản (Xử lý Markdown đơn giản)
function cleanText(text) {
    if (!text) return "";
    // Xóa dấu # đầu dòng (tiêu đề)
    text = text.replace(/^#+\s+/gm, '');
    // Chuyển **chữ** thành <b>chữ</b>
    text = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    // Chuyển * đầu dòng thành gạch đầu dòng
    text = text.replace(/^\*\s+/gm, '• ');
    return text;
}

// 2. Hàm lấy tên tác giả (giữ nguyên)
function getFullName(author) {
    if (!author) return "Không rõ tác giả";
    const first = author.firstName || "";
    const last = author.lastName || "";
    const vnSurnames = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Huỳnh", "Phan", "Vũ", "Võ", "Đặng", "Bùi", "Đỗ", "Hồ", "Ngô", "Dương", "Lý", "Chu", "Sơn", "Tô", "Trương", "Phùng", "Kim", "Nam"];
    if (vnSurnames.includes(last)) return `${last} ${first}`.trim();
    return `${first} ${last}`.trim();
}

async function generateBookContent() {
    console.log("📚 AI đang khởi động...");

    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');

    if (!bookId) return;

    try {
        // --- LOAD DATA ---
        const dbResponse = await fetch('../database-last.json');
        if (!dbResponse.ok) throw new Error("Lỗi tải DB");
        const db = await dbResponse.json();

        const bookObj = db.books.find(b => b.id == bookId);
        if (!bookObj) return;

        let authorName = "Tác giả ẩn danh";
        if (db.authorsOfBooks && db.author) {
            const link = db.authorsOfBooks.find(l => l.BookId == bookId);
            if (link) {
                const aObj = db.author.find(a => a.id == link.AuthorId);
                authorName = getFullName(aObj);
            }
        }
        const bookTitle = bookObj.name;

        // --- SELECT DOM ELEMENTS ---
        const descriptionContainer = document.querySelector(".about-the-author-content"); 
        const relatedContainers = document.querySelectorAll(".related-infor-content");
        
        // Kiểm tra kỹ xem có đủ element không
        const authorMsgContainer = relatedContainers.length > 0 ? relatedContainers[0] : null; 
        const contextContainer = relatedContainers.length > 1 ? relatedContainers[1] : null;

        // Loading Effect
        const loadingHTML = `<p style="color: #666; font-style: italic; animation: blink 1s infinite;">✨ AI đang viết bài...</p>`;
        if (descriptionContainer) descriptionContainer.innerHTML = loadingHTML;
        if (authorMsgContainer) authorMsgContainer.innerHTML = loadingHTML;
        if (contextContainer) contextContainer.innerHTML = loadingHTML;

        // --- CONFIG AI ---
        const API_KEY = "AIzaSyA28oTvYcVvBaSivElNtrNWoOdfWXt-WDE"; 
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash"});

        // --- GENERATE CONTENT ---

        // 1. MÔ TẢ (Giới thiệu)
        if (descriptionContainer) {
            try {
                const prompt = `Viết đoạn giới thiệu hấp dẫn về sách "${bookTitle}" của "${authorName}". Tiếng Việt, khoảng 150 từ. Dùng thẻ <br> để xuống dòng.`;
                const res = await model.generateContent(prompt);
                descriptionContainer.innerHTML = res.response.text();
            } catch (e) { descriptionContainer.innerHTML = "Không thể tải mô tả."; }
        }

        // 2. TỪ TÁC GIẢ (Thông điệp)
        if (authorMsgContainer) {
            try {
                const prompt = `Phân tích thông điệp chính của sách "${bookTitle}". Viết sâu sắc, khoảng 150 từ. Dùng thẻ <br> để xuống dòng.`;
                const res = await model.generateContent(prompt);
                authorMsgContainer.innerHTML = res.response.text();
            } catch (e) { authorMsgContainer.innerHTML = "Không thể tải thông tin."; }
        }

        // 3. THÔNG TIN LIÊN QUAN (Bối cảnh/Review)
        if (contextContainer) {
            try {
                const prompt = `Viết về bối cảnh sáng tác, giải thưởng hoặc điều thú vị về sách "${bookTitle}". Khoảng 100 từ. Dùng thẻ <br> để xuống dòng.`;
                const res = await model.generateContent(prompt);
                contextContainer.innerHTML = res.response.text();
            } catch (e) { contextContainer.innerHTML = "Không thể tải thông tin liên quan."; }
        }

    } catch (err) {
        console.error("Lỗi Book AI:", err);
    }
}

// Thêm animation nhấp nháy cho text loading
const style = document.createElement('style');
style.innerHTML = `@keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', generateBookContent);