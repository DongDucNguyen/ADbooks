
let MOCK_AUTHORS_DATA = [
    {
        id: 14,
        name: "Nguyễn Nhật Ánh",
        birth: "1955",
        description: "Nhà văn viết cho tuổi trẻ nổi tiếng nhất Việt Nam. Với văn phong giản dị, dí dỏm và đầy cảm xúc, ông để lại nhiều tác phẩm được yêu thích như Kính Vạn Hoa, Mắt Biếc, Cho Tôi Xin Một Vé Đi Tuổi Thơ.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/14.png"
    },
    {
        id: 10,
        name: "Vũ Trọng Phụng",
        birth: "1912 - 1939",
        description: "Nhà văn hiện thực xuất sắc trước Cách mạng Tháng Tám. Cuộc đời ngắn ngủi nhưng ông để lại nhiều tác phẩm lớn như Giông tố, Vỡ đê, Làm đĩ, thể hiện ngòi bút trào phúng bậc thầy.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/10.png"
    },
    {
        id: 22,
        name: "Paulo Coelho",
        birth: "1947",
        description: "Nhà văn người Brazil, nổi tiếng với phong cách triết lý và truyền cảm hứng. Nhà giả kim là tác phẩm đưa ông lên hàng nhà văn có sách bán chạy nhất thế giới.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/22.png"
    },
    {
        id: 25,
        name: "Tara Westover",
        birth: "1986",
        description: "Là nhà văn và học giả trẻ, Tara được xem như biểu tượng của sức mạnh tri thức và giáo dục khai phóng. Được học là tác phẩm đầu tay và cũng là kiệt tác giúp cô nổi tiếng toàn cầu.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/25.png"
    },
    {
        id: 12,
        name: "Chu Lai",
        birth: "1946",
        description: "Nhà văn - cựu chiến binh nổi tiếng của văn học Việt Nam đương đại. Ông từng tham gia chiến đấu ở chiến trường miền Nam và có nhiều tác phẩm xuất sắc về người lính như Nắng đồng bằng, Mưa đỏ.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/12.png"
    },
    {
        id: 34,
        name: "Stephen Hawking",
        birth: "1942 - 2018",
        description: "Nhà vật lý lý thuyết, vũ trụ học và tác giả người Anh. Ông nổi tiếng với những nghiên cứu về hố đen và nguồn gốc vũ trụ, được xem là biểu tượng của trí tuệ nhân loại.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/34.png"
    },
    {
        id: 21,
        name: "George Orwell",
        birth: "1903 - 1950",
        description: "Nhà văn, nhà báo người Anh. Ông nổi tiếng với lối viết sắc sảo, phê phán chủ nghĩa toàn trị và tuyên truyền chính trị. 1984 và Trại súc vật là hai tác phẩm kinh điển của ông.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/21.png"
    },
    {
        id: 40,
        name: "Ngô Bảo Châu",
        birth: "1972",
        description: "Nhà toán học người Việt Nam, nổi tiếng trên toàn thế giới với chứng minh Bổ đề cơ bản. Ông là người Việt Nam đầu tiên giành huy chương Fields danh giá.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/40.png"
    },
    {
        id: 16,
        name: "Nguyễn Dữ",
        birth: "Unknown",
        description: "Nhà văn thời Lê sơ, được coi là “người mở đầu cho văn xuôi tự sự Việt Nam”. Ông nổi tiếng với Truyền kỳ mạn lục, tác phẩm được mệnh danh là 'thiên cổ kỳ bút'.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/16.png"
    },
    {
        id: 28,
        name: "Frank McCourt",
        birth: "1930 - 2009",
        description: "Nhà văn, nhà giáo người Ireland - Mỹ. Ông nổi tiếng với loạt hồi ký tự truyện giàu cảm xúc, phản ánh cuộc đời từ nghèo khó đến thành công nhờ tri thức và nghị lực.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/28.png"
    }
];
if (localStorage.getItem('selectedAuthorCategory') === "HOẠT ĐỘNG GẦN ĐÂY"){
    MOCK_AUTHORS_DATA = [
    {
        id: 10,
        name: "Vũ Trọng Phụng",
        birth: "1912 - 1939",
        description: "Nhà văn hiện thực xuất sắc trước Cách mạng Tháng Tám. Cuộc đời ngắn ngủi nhưng ông để lại nhiều tác phẩm lớn như Giông tố, Vỡ đê, Làm đĩ...",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/10.png"
    },
    {
        id: 4,
        name: "John Stuart Mill",
        birth: "1806 - 1873",
        description: "Triết gia, nhà kinh tế học và chính trị gia người Anh, một trong những đại diện tiêu biểu nhất của triết học khai sáng và chủ nghĩa tự do thế kỷ XIX.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/4.png"
    },
    {
        id: 11,
        name: "Sơn Tùng",
        birth: "1928 - 2021",
        description: "Nhà văn chuyên viết về Chủ tịch Hồ Chí Minh. Ông từng tham gia kháng chiến chống Pháp và sau đó cống hiến trọn đời cho văn học cách mạng.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/11.png"
    },
    {
        id: 27,
        name: "Yukichi Fukuzawa",
        birth: "1835 - 1901",
        description: "Nhà tư tưởng, nhà giáo dục, nhà cải cách xã hội người Nhật. Ông là người sáng lập Đại học Keio - một trong những đại học danh tiếng nhất Nhật Bản.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/27.png"
    },
    {
        id: 39,
        name: "Camilo Cruz",
        birth: "Unknown",
        description: "Tiến sĩ, diễn giả truyền cảm hứng và tác giả người Colombia. Ông nổi tiếng với các bài nói chuyện và sách kỹ năng sống.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/39.png"
    },
    {
        id: 19,
        name: "Wendelin Van Draanen",
        birth: "06/01/1965",
        description: "Nhà văn Mỹ chuyên viết cho lứa tuổi thiếu niên. Bà nổi tiếng với loạt truyện Sammy Keyes và tiểu thuyết Flipped.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/19.png"
    },
    {
        id: 43,
        name: "Đặng Thùy Trâm",
        birth: "1942 - 1970",
        description: "Nữ bác sĩ, liệt sĩ người Việt Nam. Bà tốt nghiệp Đại học Y Hà Nội, tình nguyện vào chiến trường miền Nam làm bác sĩ quân y.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/43.png"
    },
    {
        id: 26,
        name: "Maria Montessori",
        birth: "1870 - 1952",
        description: "Bác sĩ, nhà giáo dục người Ý, người sáng lập phương pháp giáo dục Montessori. Bà đề xuất việc dạy học lấy trẻ làm trung tâm.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/26.png"
    },
    {
        id: 5,
        name: "Friedrich Hayek",
        birth: "1899 - 1992",
        description: "Nhà kinh tế học và nhà khoa học chính trị người Anh gốc Áo nổi tiếng. Hayek được biết đến qua lập luận ủng hộ cho chủ nghĩa tư bản.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/5.png"
    },
    {
        id: 34,
        name: "Stephen Hawking",
        birth: "1942 - 2018",
        description: "Nhà vật lý lý thuyết, vũ trụ học và tác giả người Anh. Ông nổi tiếng với những nghiên cứu về hố đen và nguồn gốc vũ trụ.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/34.png"
    }
];
} 
else if (localStorage.getItem('selectedAuthorCategory') === "TÁC GIẢ NỔI BẬT"){
    MOCK_AUTHORS_DATA = [
    {
        id: 23,
        name: "Higashino Keigo",
        birth: "04/02/1958",
        description: "Nhà văn trinh thám hàng đầu Nhật Bản. Ông nổi tiếng với khả năng kết hợp yếu tố tội phạm, tâm lý và nhân văn sâu sắc.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/23.png"
    },
    {
        id: 12,
        name: "Chu Lai",
        birth: "05/02/1946",
        description: "Nhà văn - cựu chiến binh nổi tiếng của văn học Việt Nam đương đại. Ông từng tham gia chiến đấu ở chiến trường miền Nam.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/12.png"
    },
    {
        id: 30,
        name: "Kyuichi Kimura",
        birth: "Unknown",
        description: "Một giáo viên tiếng Anh, tâm lý học, logic học nổi tiếng. Ông được biết đến là một nhà tâm lý học giáo dục học về phương pháp giáo dục sớm.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/30.png"
    },
    {
        id: 22,
        name: "Paulo Coelho",
        birth: "24/08/1947",
        description: "Nhà văn người Brazil, nổi tiếng với phong cách triết lý và truyền cảm hứng. Nhà giả kim là tác phẩm đưa ông lên hàng nhà văn có sách bán chạy nhất thế giới.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/22.png"
    },
    {
        id: 13,
        name: "Ngô Tất Tố",
        birth: "1894 - 1954",
        description: "Nhà văn, nhà báo và dịch giả tiêu biểu của trào lưu hiện thực. Ông để lại nhiều tác phẩm giá trị như Việc làng, Lều chõng.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/13.png"
    },
    {
        id: 25,
        name: "Tara Westover",
        birth: "27/09/1986",
        description: "Nhà văn và học giả trẻ, biểu tượng của sức mạnh tri thức. 'Được học' là kiệt tác giúp cô nổi tiếng toàn cầu.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/25.png"
    },
    {
        id: 37,
        name: "Jim Collins",
        birth: "25/01/1958",
        description: "Nhà nghiên cứu, giảng viên và cố vấn doanh nghiệp người Mỹ. Ông nổi tiếng với các công trình về quản trị và phát triển tổ chức.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/37.png"
    },
    {
        id: 38,
        name: "Nhiều tác giả",
        birth: "Unknown",
        description: "Tuyển tập các tác phẩm từ nhiều cây bút khác nhau.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/38.png"
    },
    {
        id: 33,
        name: "Tim Marshall",
        birth: "01/05/1959",
        description: "Nhà báo, tác giả và chuyên gia phân tích địa - chính trị người Anh. Ông từng là phóng viên của BBC và Sky News.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/33.png"
    },
    {
        id: 14,
        name: "Nguyễn Nhật Ánh",
        birth: "07/05/1955",
        description: "Nhà văn viết cho tuổi trẻ nổi tiếng nhất Việt Nam. Với văn phong giản dị, dí dỏm và đầy cảm xúc, ông để lại nhiều tác phẩm được yêu thích.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/14.png"
    }
];
}
else if (localStorage.getItem('selectedAuthorCategory') === "TÁC GIẢ TRẺ"){
    MOCK_AUTHORS_DATA = [
        {
        id: 24,
        name: "Chang-in Cho",
        birth: "Unknown",
        description: "Nhà văn đương đại nổi tiếng của Hàn Quốc. Văn phong của ông được đánh giá là giản dị, chân thành, thường khai thác tình cảm gia đình.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/24.png"
    },
    {
        id: 21,
        name: "George Orwell",
        birth: "1903 - 1950",
        description: "Nhà văn, nhà báo người Anh. Ông nổi tiếng với lối viết sắc sảo, phê phán chủ nghĩa toàn trị và tuyên truyền chính trị.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/21.png"
    },
    {
        id: 29,
        name: "Trần Hân",
        birth: "Unknown",
        description: "Tác giả chuyên viết về kỹ năng sống và giáo dục gia đình. Nổi tiếng với cuốn 'Cha mẹ Do Thái dạy con như thế nào'.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/29.png"
    },
    {
        id: 40,
        name: "Ngô Bảo Châu",
        birth: "28/06/1972",
        description: "Nhà toán học người Việt Nam, giáo sư tại Đại học Chicago. Ông nổi tiếng toàn thế giới với chứng minh Bổ đề cơ bản.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/40.png"
    },
    {
        id: 31,
        name: "John Medina",
        birth: "Unknown",
        description: "Tiến sĩ sinh học phân tử và nhà nghiên cứu thần kinh học người Mỹ. Ông sáng lập Trung tâm Nghiên cứu Não bộ cho trẻ em.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/31.png"
    },
    {
        id: 20,
        name: "John Boyne",
        birth: "30/04/1971",
        description: "Nhà văn người Ireland, nổi tiếng với các tác phẩm mang đề tài lịch sử và chiến tranh như 'Chú bé mang pyjama sọc'.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/20.png"
    },
    {
        id: 17,
        name: "William Golding",
        birth: "1911 - 1993",
        description: "Nhà văn, nhà thơ người Anh, đoạt giải Nobel Văn học năm 1983. Trải nghiệm chiến tranh ảnh hưởng mạnh mẽ đến các tác phẩm của ông.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/17.png"
    },
    {
        id: 42,
        name: "Takeshi Furukawa",
        birth: "Unknown",
        description: "Nhà huấn luyện kỹ năng và tác giả người Nhật. Ông nổi tiếng với sách về phát triển bản thân và tìm kiếm sự cân bằng.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/42.png"
    },
    {
        id: 36,
        name: "Brian Greene",
        birth: "09/02/1963",
        description: "Nhà vật lý lý thuyết, nhà vũ trụ học và tác giả người Mỹ. Ông tiên phong trong việc phổ biến kiến thức về thuyết dây.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/36.png"
    },
    {
        id: 32,
        name: "Robert T. Kiyosaki",
        birth: "08/04/1947",
        description: "Doanh nhân, nhà đầu tư, diễn giả và tác giả người Mỹ gốc Nhật. Ông nổi tiếng với loạt sách 'Cha giàu cha nghèo' bán chạy toàn cầu.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/author/32.png"
    }
];}
export class ListingAuthorsPage {
    #data;
    #container;
    #titleElement;

    constructor(data) {
        this.#data = data;
        
        // Select DOM elements
        this.#container = document.querySelector('.listing-container');
        this.#titleElement = document.querySelector('.listing-title-content');

        // Kiểm tra an toàn
        if (this.#container && this.#titleElement) {
            this.init();
        } else {
            console.warn('ListingAuthorsPage: Thiếu DOM (.listing-container hoặc .listing-title-content)');
        }
    }

    init() {
        this.#updateTitle();
        this.#renderList();
    }

    #updateTitle() {
        const savedTitle = localStorage.getItem('selectedAuthorCategory');
        if (savedTitle === "TÁC GIẢ NỔI BẬT") {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "../Styles/pink-color.css";
            document.head.appendChild(link);
        }
        else if (savedTitle === "HOẠT ĐỘNG GẦN ĐÂY" || savedTitle === "TÁC GIẢ CỦA BẠN") {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "../Styles/blue-color.css";
            document.head.appendChild(link);
        }
        if (savedTitle) {
            this.#titleElement.innerText = savedTitle;
            document.title = `${savedTitle} - Listenary`;
        } else {
            this.#titleElement.innerText = "Tác Giả Nổi Bật";
        }
    }

    #renderList() {
        // Xóa nội dung cũ
        this.#container.innerHTML = '';

        const html = this.#data.map((author, index) => {
            // Logic xoay vòng class màu nền: element-card-1 -> 2 -> 3
            const variantClass = `element-card-${(index % 3) + 1}`;

            return `
            <div class="listed-element-card ${variantClass} jstoAuthorPage" data-author-id="${author.id}">
                <div class="listing-grid">
                    <div class="listed-element-image">
                        <img src="${author.img}" alt="${author.name}" onerror="this.src='../Images/Authors/default.jpg'">
                    </div>
                    <div class="listing-card-info">
                        <p class="listing-element-title">${author.name}</p>
                        <p class="listing-element-author">${author.birth}</p>
                        <p class="listing-element-des">${author.description}</p>
                    </div>
                </div>
            </div>
            `;
        }).join('');

        this.#container.innerHTML = html;
    }
}

// Khởi chạy khi DOM load xong
document.addEventListener('DOMContentLoaded', () => {
    new ListingAuthorsPage(MOCK_AUTHORS_DATA);
});