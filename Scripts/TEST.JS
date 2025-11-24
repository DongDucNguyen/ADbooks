// 1. Import từ CDN (như chúng ta đã sửa)
        import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai";

        // 2. !!! THAY THẾ BẰNG API KEY CỦA BẠN !!!
        // CẢNH BÁO: Không bao giờ đưa file này lên mạng thật. 
        // Key của bạn sẽ bị lộ.
        const API_KEY = "AIzaSyBU-VLC9v__TdUGq8SOloFA1316Kb4p4rg";

        // 3. Khởi tạo
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash"});
        let text;
        try {
            // 6. Gọi API
            const result = await model.generateContent("Viết đoạn văn giới thiệu về tác giả Anthony Doerr ngôn ngữ học thuật trang trọng, chi tiết, đầu ra khoảng 350 từ (nếu xuống dòng hãy thêm 2 kí hiệu <br> vào cuối đoạn). Response chỉ trả về đoạn văn yêu cầu ở dạng dạng plaintext");
            const response = await result.response;
            text = response.text();
            document.querySelector(".about-the-author-content").innerHTML = text;
        } catch (error) {
            // Xử lý lỗi (ví dụ: API key sai)
            console.log("Đã xảy ra lỗi: ");
        }
        try {
            // 6. Gọi API
            const result = await model.generateContent(text+" Ngoại trừ những thông tin đã được mô tả ở trên, hãy viết đoạn văn về những thông tin liên quan đến tác giả Anthony Doerr ngôn ngữ học thuật trang trọng, chi tiết, đầu ra khoảng 350 từ (nếu xuống dòng hãy thêm 2 kí hiệu <br> vào cuối đoạn). Response chỉ trả về đoạn văn yêu cầu ở dạng dạng plaintext");
            const response = await result.response;
            text = response.text();
            document.querySelector(".related-infor-content").innerHTML = text;
        } catch (error) {
            // Xử lý lỗi (ví dụ: API key sai)
            console.log("Đã xảy ra lỗi: ");
        }

         console.log("done");