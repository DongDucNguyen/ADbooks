import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai";

// Hàm hỗ trợ lấy tên đầy đủ (giống các file trước)
function getFullName(author) {
    const first = author.firstName || "";
    const last = author.lastName || "";
    const vnSurnames = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Huỳnh", "Phan", "Vũ", "Võ", "Đặng", "Bùi", "Đỗ", "Hồ", "Ngô", "Dương", "Lý", "Chu", "Sơn", "Tô", "Trương", "Phùng", "Kim", "Nam"];
    
    if (vnSurnames.includes(last)) return `${last} ${first}`.trim();
    return `${first} ${last}`.trim();
}

async function generateAuthorContent() {
    // 1. Lấy ID tác giả từ URL (Ví dụ: author.html?id=12)
    const urlParams = new URLSearchParams(window.location.search);
    const authorId = urlParams.get('id');

    if (!authorId) {
        console.log("Không tìm thấy ID tác giả trên URL, không thể tạo nội dung AI.");
        return;
    }

    try {
        // 2. Tải dữ liệu DB để lấy tên tác giả
        const dbResponse = await fetch('../database-last.json');
        if (!dbResponse.ok) throw new Error("Không tải được database");
        const db = await dbResponse.json();

        // Tìm tác giả
        const authorObj = db.author.find(a => a.id == authorId);
        if (!authorObj) {
            console.log("Không tìm thấy tác giả trong database.");
            return;
        }

        const authorName = getFullName(authorObj);
        console.log("Đang tạo nội dung AI cho tác giả:", authorName);

        // 3. Cấu hình Gemini AI
        // !!! THAY API KEY CỦA BẠN VÀO ĐÂY !!!
        const API_KEY = "AIzaSyA28oTvYcVvBaSivElNtrNWoOdfWXt-WDE"; 
        
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash"});

        let previousText = ""; // Biến lưu nội dung đoạn 1 để đoạn 2 loại trừ

        // --- ĐOẠN 1: GIỚI THIỆU TÁC GIẢ ---
        try {
            const prompt1 = `Viết đoạn văn giới thiệu về tác giả "${authorName}" ngôn ngữ học thuật trang trọng, chi tiết, đầu ra khoảng 350 từ (nếu xuống dòng hãy thêm 2 kí hiệu <br> vào cuối đoạn). Response chỉ trả về đoạn văn yêu cầu ở dạng plaintext`;
            
            const result1 = await model.generateContent(prompt1);
            const response1 = await result1.response;
            previousText = response1.text();
            
            // Hiển thị ra màn hình
            const container1 = document.querySelector(".about-the-author-content");
            if (container1) container1.innerHTML = previousText;

        } catch (err) {
            console.error("Lỗi tạo đoạn giới thiệu:", err);
        }

        // --- ĐOẠN 2: THÔNG TIN LIÊN QUAN (Loại trừ thông tin đã viết ở trên) ---
        try {
            const prompt2 = `Dựa trên nội dung sau: "${previousText}". Ngoại trừ những thông tin đã được mô tả ở trên, hãy viết đoạn văn về những thông tin liên quan khác (ví dụ: phong cách sáng tác, giải thưởng, ảnh hưởng...) đến tác giả "${authorName}" ngôn ngữ học thuật trang trọng, chi tiết, đầu ra khoảng 350 từ (nếu xuống dòng hãy thêm 2 kí hiệu <br> vào cuối đoạn). Response chỉ trả về đoạn văn yêu cầu ở dạng plaintext`;

            const result2 = await model.generateContent(prompt2);
            const response2 = await result2.response;
            const text2 = response2.text();

            // Hiển thị ra màn hình
            const container2 = document.querySelector(".related-infor-content");
            if (container2) container2.innerHTML = text2;

        } catch (err) {
            console.error("Lỗi tạo thông tin liên quan:", err);
        }

        console.log("Hoàn thành tạo nội dung AI.");

    } catch (error) {
        console.error("Lỗi chung:", error);
    }
}

// Chạy hàm

document.addEventListener('DOMContentLoaded', () => {
    generateAuthorContent();
});