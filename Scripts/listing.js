let MOCK_LISTING_DATA;
if (localStorage.getItem('selectedGenre') === "TOP TRENDING"){
    MOCK_LISTING_DATA = [
    {
        id: 11,
        title: "Đời thừa",
        author: "Nam Cao",
        description: "Phản ánh bi kịch của người trí thức nghèo – nhân vật Hộ – khi bị giằng xé giữa lý tưởng nghệ thuật và hiện thực cơm áo.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/11_9.png"
    },
    {
        id: 12,
        title: "Số đỏ",
        author: "Vũ Trọng Phụng",
        description: "Tác phẩm trào phúng sắc bén về Xuân Tóc Đỏ, phơi bày xã hội tư sản thành thị lố lăng và giả tạo thời Pháp thuộc.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/12_10.png"
    },
    {
        id: 13,
        title: "Búp sen xanh",
        author: "Sơn Tùng",
        description: "Tiểu thuyết tiểu sử nổi tiếng viết về thời thơ ấu và tuổi trẻ của Chủ tịch Hồ Chí Minh, từ quê hương Kim Liên đến khi ra đi tìm đường cứu nước.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/13_11.png"
    },
    {
        id: 14,
        title: "Mưa đỏ",
        author: "Chu Lai",
        description: "Khắc họa sâu sắc số phận những người lính trong cuộc chiến ác liệt tại Thành cổ Quảng Trị, nơi họ đối mặt với mất mát nhưng vẫn giữ vững lòng dũng cảm.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/14_12.png"
    },
    {
        id: 25,
        title: "1984",
        author: "George Orwell",
        description: "Tiểu thuyết chính trị – viễn tưởng kinh điển miêu tả một xã hội toàn trị nơi mọi hành động, lời nói và ý nghĩ đều bị giám sát bởi “Đảng” và “Anh Cả”.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/25_21.png"
    },
    {
        id: 26,
        title: "Trại súc vật",
        author: "George Orwell",
        description: "Tiểu thuyết ngụ ngôn chính trị kể về cuộc nổi dậy của các loài vật, một ẩn dụ sâu sắc về sự tha hóa của quyền lực và các thể chế độc tài.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/26_21.png"
    },
    {
        id: 16,
        title: "Tắt đèn",
        author: "Ngô Tất Tố",
        description: "Tiểu thuyết hiện thực phê phán nổi bật, kể về cuộc đời khổ cực của chị Dậu – người phụ nữ nông dân bị dồn ép đến bước đường cùng bởi sưu thuế.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/16_13.png"
    },
    {
        id: 17,
        title: "Có 2 con mèo ngồi bên cửa sổ",
        author: "Nguyễn Nhật Ánh",
        description: "Câu chuyện ngụ ngôn nhẹ nhàng về tình bạn giữa hai chú mèo Gấu và Mun, gửi gắm thông điệp nhân văn: con người cần thấu hiểu và yêu thương nhau hơn.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/17_14.png"
    },
    {
        id: 20,
        title: "Lão Hạc",
        author: "Nam Cao",
        description: "Tác phẩm thể hiện nỗi đau thân phận con người bị bần cùng hoá, đồng thời ca ngợi phẩm giá và nhân cách cao đẹp của người nông dân nghèo.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/20_9.png"
    },
    {
        id: 22,
        title: "Người đua diều",
        author: "Khaled Hosseini",
        description: "Câu chuyện về tình bạn, sự phản bội và hành trình chuộc lỗi của Amir, đặt trong bối cảnh những biến động lịch sử đau thương của Afghanistan.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/22_18.png"
    }
];
} else if (localStorage.getItem('selectedGenre') === "SÁCH MỚI"){
    MOCK_LISTING_DATA = [
    {
        id: 27,
        title: "Nhà giả kim",
        author: "Paulo Coelho",
        description: "Nhà giả kim kể về hành trình của chàng chăn cừu Santiago đi tìm “kho báu” của đời mình. Trên đường đi, cậu nhận ra kho báu thật sự nằm trong chính bản thân và hành trình khám phá cuộc sống.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/27_22.png"
    },
    {
        id: 42,
        title: "Lược sử loài người",
        author: "Yuval Noah Harari",
        description: "Kể lại hành trình phát triển của Homo sapiens từ thuở săn bắt – hái lượm đến thời đại công nghệ. Tác phẩm đặt ra nhiều câu hỏi sâu sắc về trí tuệ, quyền lực, hạnh phúc và tương lai của nhân loại.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/42_35.png"
    },
    {
        id: 25,
        title: "1984",
        author: "George Orwell",
        description: "Tiểu thuyết chính trị – viễn tưởng kinh điển của George Orwell, miêu tả một xã hội toàn trị nơi mọi hành động, lời nói và ý nghĩ đều bị giám sát bởi “Đảng” và “Anh Cả”.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/25_21.png"
    },
    {
        id: 22,
        title: "Người đua diều",
        author: "Khaled Hosseini",
        description: "Người đua diều kể về tình bạn cảm động giữa Amir và Hassan – hai cậu bé lớn lên ở Afghanistan trước khi đất nước rơi vào chiến tranh. Tác phẩm là câu chuyện về tội lỗi, sự tha thứ và tình cha con.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/22_18.png"
    },
    {
        id: 17,
        title: "Có 2 con mèo ngồi bên cửa sổ",
        author: "Nguyễn Nhật Ánh",
        description: "Tác phẩm là câu chuyện ngụ ngôn nhẹ nhàng về tình bạn, tình yêu và lòng bao dung giữa hai chú mèo Gấu và Mun. Với giọng kể hài hước, hóm hỉnh, tác phẩm gửi gắm thông điệp nhân văn sâu sắc.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/17_14.png"
    },
    {
        id: 30,
        title: "Bố con cá gai",
        author: "Cho Chang-in",
        description: "Một câu chuyện xúc động về tình phụ tử, về những tổn thương, sự thấu hiểu và sức mạnh của tình yêu trong gia đình. Hành trình người cha cùng con trai mắc bệnh hiểm nghèo đi dọc đất nước Hàn Quốc.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/30_24.png"
    },
    {
        id: 10,
        title: "Đắc nhân tâm",
        author: "Dale Carnegie",
        description: "Tác phẩm trình bày những nguyên tắc giao tiếp, ứng xử và thuyết phục người khác dựa trên sự thấu hiểu, tôn trọng và thiện chí.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/10_8.png"
    },
    {
        id: 12,
        title: "Số đỏ",
        author: "Vũ Trọng Phụng",
        description: "Tác phẩm kể về Xuân Tóc Đỏ – kẻ vô học, tình cờ trở thành “anh hùng thời đại”, qua đó phơi bày xã hội tư sản thành thị lố lăng, giả tạo thời Pháp thuộc.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/12_10.png"
    },
    {
        id: 39,
        title: "Cha giàu cha nghèo - Tập 1",
        author: "Robert T. Kiyosaki",
        description: "Cuốn sách kinh điển về tài chính cá nhân, chỉ ra sự khác biệt trong tư duy về tiền bạc, đầu tư và cách xây dựng tự do tài chính giữa người giàu và người nghèo.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/39_32.png"
    },
    {
        id: 41,
        title: "Vũ trụ trong vỏ hạt dẻ",
        author: "Stephen Hawking",
        description: "Cuốn sách diễn giải những lý thuyết vật lý hiện đại như thuyết tương đối, cơ học lượng tử, lỗ đen và vũ trụ song song bằng ngôn ngữ dễ hiểu, kèm minh họa sinh động.",
        img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/41_34.png"
    }
];
}
else if (localStorage.getItem('selectedGenre') === "VIỆT NAM"){
    MOCK_LISTING_DATA = [
        {
            id: 11,
            title: "Đời thừa",
            author: "Nam Cao",
            description: "Phản ánh bi kịch của người trí thức nghèo – nhân vật Hộ – khi bị giằng xé giữa lý tưởng nghệ thuật và hiện thực cơm áo. Tác phẩm thể hiện nỗi đau tinh thần, sự bế tắc của con người trong xã hội cũ.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/11_9.png"
        },
        {
            id: 12,
            title: "Số đỏ",
            author: "Vũ Trọng Phụng",
            description: "Tác phẩm trào phúng sắc bén về Xuân Tóc Đỏ, phơi bày xã hội tư sản thành thị lố lăng và giả tạo thời Pháp thuộc. Một bức tranh trào lộng về sự đảo lộn giá trị đạo đức.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/12_10.png"
        },
        {
            id: 13,
            title: "Búp sen xanh",
            author: "Sơn Tùng",
            description: "Tiểu thuyết tiểu sử nổi tiếng viết về thời thơ ấu và tuổi trẻ của Chủ tịch Hồ Chí Minh. Tác phẩm thể hiện quá trình hình thành nhân cách, trí tuệ và lý tưởng lớn lao của Người.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/13_11.png"
        },
        {
            id: 14,
            title: "Mưa đỏ",
            author: "Chu Lai",
            description: "Khắc họa sâu sắc số phận những người lính trong cuộc chiến ác liệt tại Thành cổ Quảng Trị. Một bản hùng ca về lòng dũng cảm, tình đồng đội và sự hy sinh cao cả.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/14_12.png"
        },
        {
            id: 15,
            title: "Cơm thầy cơm cô",
            "author": "Vũ Trọng Phụng",
            "description": "Phản ánh mặt tối của xã hội qua câu chuyện cô gái nông thôn lên thành phố làm giúp việc. Tác phẩm tố cáo sự giả dối, bất công và thể hiện lòng cảm thương với người nghèo.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/15_10.png"
        },
        {
            id: 16,
            title: "Tắt đèn",
            author: "Ngô Tất Tố",
            description: "Tiểu thuyết hiện thực phê phán nổi bật về cuộc đời khổ cực của chị Dậu. Tác phẩm tố cáo xã hội phong kiến tàn bạo và ca ngợi phẩm chất kiên cường của người phụ nữ Việt Nam.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/16_13.png"
        },
        {
            id: 17,
            title: "Có 2 con mèo ngồi bên cửa sổ",
            author: "Nguyễn Nhật Ánh",
            description: "Câu chuyện ngụ ngôn nhẹ nhàng, hóm hỉnh về tình bạn giữa hai chú mèo Gấu và Mun. Tác phẩm gửi gắm thông điệp nhân văn sâu sắc về sự thấu hiểu và yêu thương.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/17_14.png"
        },
        {
            id: 18,
            title: "Đồng hào có ma",
            author: "Nguyễn Công Hoan",
            description: "Truyện ngắn trào phúng phản ánh sự ngu dốt, mê tín và lòng tham trong xã hội thực dân phong kiến, phơi bày thói hám lợi và sự tha hoá đạo đức con người.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/18_15.png"
        },
        {
            id: 19,
            title: "Nam Xương nữ tử truyện",
            author: "Nguyễn Dữ",
            description: "Câu chuyện về Vũ Nương, người vợ hiền bị nghi oan. Tác phẩm kết hợp kỳ ảo và hiện thực để bày tỏ niềm cảm thương với số phận người phụ nữ và phê phán xã hội trọng nam khinh nữ.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/19_16.png"
        },
        {
            id: 20,
            title: "Lão Hạc",
            author: "Nam Cao",
            description: "Tác phẩm kinh điển thể hiện nỗi đau thân phận con người bị bần cùng hoá, đồng thời ca ngợi phẩm giá, lòng tự trọng và nhân cách cao đẹp của người nông dân nghèo.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/20_9.png"
        }
    ];
}
else if (localStorage.getItem('selectedGenre') === "NƯỚC NGOÀI"){
    MOCK_LISTING_DATA = [
        {
            id: 21,
            title: "Chúa ruồi",
            author: "William Golding",
            description: "Câu chuyện về nhóm học sinh lạc trên đảo hoang, dần trở nên man rợ khi tách khỏi văn minh. Một ẩn dụ sâu sắc về bản năng hoang dã và sự suy đồi của con người.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/21_17.png"
        },
        {
            id: 22,
            title: "Người đua diều",
            author: "Khaled Hosseini",
            description: "Câu chuyện cảm động về tình bạn, sự phản bội và hành trình chuộc lỗi của Amir. Tác phẩm khắc họa bi kịch của Afghanistan qua những biến động lịch sử đau thương.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/22_18.png"
        },
        {
            id: 23,
            title: "Bên kia đường có đứa dở hơi",
            author: "Wendelin Van Draanen",
            description: "Tiểu thuyết tuổi teen nhẹ nhàng về mối quan hệ giữa Bryce và Juli. Tác phẩm mang thông điệp giản dị: yêu thương là biết nhìn thấy vẻ đẹp thật sự của người khác.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/23_19.png"
        },
        {
            id: 24,
            title: "Chú bé mang pyjama sọc",
            author: "John Boyne",
            description: "Tình bạn ngây thơ nhưng đầy bi kịch giữa con trai sĩ quan Đức Quốc xã và cậu bé Do Thái trong trại tập trung, hé lộ sự tàn khốc của chiến tranh Thế giới II.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/24_20.png"
        },
        {
            id: 25,
            title: "1984",
            author: "George Orwell",
            description: "Tiểu thuyết viễn tưởng chính trị kinh điển về xã hội toàn trị bị giám sát bởi 'Anh Cả'. Lời cảnh báo sâu sắc về nguy cơ mất tự do cá nhân và quyền con người.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/25_21.png"
        },
        {
            id: 26,
            title: "Trại súc vật",
            author: "George Orwell",
            description: "Tiểu thuyết ngụ ngôn chính trị về cuộc nổi dậy của các loài vật. Một ẩn dụ sâu sắc về sự tha hóa của quyền lực và các thể chế độc tài.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/26_21.png"
        },
        {
            id: 27,
            title: "Nhà giả kim",
            author: "Paulo Coelho",
            description: "Hành trình đi tìm kho báu của chàng chăn cừu Santiago. Một tác phẩm triết lý, biểu tượng về việc theo đuổi ước mơ, định mệnh và lắng nghe trái tim.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/27_22.png"
        },
        {
            id: 28,
            title: "Điều kỳ diệu của tiệm tạp hóa Namiya",
            author: "Higashino Keigo",
            description: "Câu chuyện về những bức thư tư vấn bí ẩn xuyên thời gian tại một tiệm tạp hóa cũ. Tác phẩm mang thông điệp nhân văn về sự kết nối và niềm tin trong cuộc sống.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/28_23.png"
        },
        {
            id: 29,
            title: "Ngàn mặt trời rực rỡ",
            author: "Khaled Hosseini",
            description: "Số phận đầy xúc động của hai người phụ nữ Afghanistan trước chiến tranh và định kiến. Tác phẩm ca ngợi nghị lực phi thường và tình mẫu tử thiêng liêng.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/29_18.png"
        },
        {
            id: 30,
            title: "Bố con cá gai",
            author: "Cho Chang-in",
            description: "Câu chuyện đẫm nước mắt về hành trình giành giật sự sống cho con của người cha. Một bài ca về tình phụ tử, sự hy sinh và sức mạnh của tình yêu gia đình.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/30_24.png"
        }
    ];
}
else if (localStorage.getItem('selectedGenre') === "ĐỜI SỐNG & XÃ HỘI"){
    MOCK_LISTING_DATA = [
        {
            id: 1,
            title: "Chính trị luận",
            author: "Aristotle",
            description: "Tác phẩm triết học chính trị kinh điển bàn về nguồn gốc, mục đích và các hình thức tổ chức nhà nước. Nền tảng của khoa học chính trị phương Tây.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/1_1.png"
        },
        {
            id: 2,
            title: "Cộng Hòa",
            author: "Plato",
            description: "Tác phẩm triết học nổi tiếng nhất của Plato về công lý và nhà nước lý tưởng. Nền tảng cho tư tưởng triết học, đạo đức và giáo dục phương Tây.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/2_2.png"
        },
        {
            id: 3,
            title: "Bàn về khế ước xã hội",
            author: "Jean-Jacques Rousseau",
            description: "Tuyên ngôn mạnh mẽ về quyền tự do và bình đẳng. Rousseau lập luận rằng quyền lực chính trị phải dựa trên sự thỏa thuận tự nguyện của toàn dân.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/3_3.png"
        },
        {
            id: 4,
            title: "Bàn về tự do",
            author: "John Stuart Mill",
            description: "Tác phẩm bảo vệ tự do cá nhân trước sự chuyên chế của đa số. Mill khẳng định tự do là điều kiện cần thiết cho sự phát triển toàn diện của con người.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/4_4.png"
        },
        {
            id: 5,
            title: "Đường về nô lệ",
            author: "Friedrich Hayek",
            description: "Lời cảnh báo về nguy cơ của chủ nghĩa tập thể và việc nhà nước kiểm soát kinh tế quá mức. Hayek bảo vệ tự do cá nhân và cơ chế thị trường.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/5_5.png"
        },
        {
            id: 6,
            title: "Ba người thầy vĩ đại",
            author: "Robin Sharma",
            description: "Câu chuyện đầy cảm hứng về hành trình tìm kiếm ý nghĩa cuộc sống. Cuốn sách giúp người đọc khám phá bản thân và sống trọn vẹn với đam mê.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/6_6.png"
        },
        {
            id: 7,
            title: "Đời ngắn đừng ngủ dài",
            author: "Robin Sharma",
            description: "Những lời khuyên súc tích, sâu sắc khuyến khích sống tích cực, trân trọng thời gian và dám thay đổi để đạt được thành công và hạnh phúc.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/7_6.png"
        },
        {
            id: 8,
            title: "Thức tỉnh mục đích sống",
            author: "Eckhart Tolle",
            description: "Hướng dẫn con người thoát khỏi cái tôi bản ngã để tìm thấy bình an nội tâm. Một tác phẩm tâm linh sâu sắc về sự tỉnh thức và hiện tại.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/8_7.png"
        },
        {
            id: 9,
            title: "Quẳng gánh lo đi mà vui sống",
            author: "Dale Carnegie",
            description: "Những nguyên tắc thực tiễn giúp kiểm soát lo lắng và tìm lại niềm vui sống. 'Liều thuốc tinh thần' kinh điển cho hàng triệu độc giả.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/9_8.png"
        },
        {
            id: 10,
            title: "Đắc nhân tâm",
            author: "Dale Carnegie",
            description: "Nghệ thuật giao tiếp và thu phục lòng người. Cuốn sách self-help bán chạy nhất mọi thời đại về cách ứng xử và xây dựng mối quan hệ.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/10_8.png"
        }
    ];
}
else if (localStorage.getItem('selectedGenre') === "GIÁO DỤC"){
    MOCK_LISTING_DATA = [
        {
            id: 31,
            title: "Được học",
            author: "Tara Westover",
            description: "Hồi ký chấn động về hành trình tự học để vươn lên từ một gia đình biệt lập. Minh chứng cho sức mạnh giải phóng của tri thức và giáo dục.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/31_25.png"
        },
        {
            id: 32,
            title: "Maria-montessori-Her life and work",
            author: "Maria Montessori",
            description: "Cuốn sách về cuộc đời và triết lý giáo dục của Maria Montessori. Khám phá phương pháp giáo dục tôn trọng sự phát triển tự nhiên và cá tính của trẻ.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/32_26.png"
        },
        {
            id: 33,
            title: "Khuyến học",
            author: "Yukichi Fukuzawa",
            description: "Tác phẩm khai sáng vĩ đại của Nhật Bản. Khẳng định vai trò của tri thức, tinh thần độc lập và bình đẳng trong việc xây dựng quốc gia hùng mạnh.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/33_27.png"
        },
        {
            id: 34,
            title: "Người thầy",
            author: "Frank McCourt",
            description: "Hồi ký về 30 năm dạy học tại New York. Câu chuyện chân thực, cảm động về nghề giáo và nghệ thuật thắp sáng niềm tin cho học trò.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/34_28.png"
        },
        {
            id: 35,
            title: "Phương pháp giáo dục con của người Do Thái",
            author: "Trần Hân",
            description: "Bí quyết nuôi dạy con thành tài của người Do Thái: rèn luyện tính tự lập, tư duy phản biện và niềm tin vào tri thức.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/35_29.png"
        },
        {
            id: 36,
            title: "Emile hay là về giáo dục",
            author: "Jean-Jacques Rousseau",
            description: "Kiệt tác triết học giáo dục đề cao phương pháp 'giáo dục tự nhiên'. Một cuộc cách mạng tư tưởng đặt nền móng cho giáo dục hiện đại.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/36_3.png"
        },
        {
            id: 37,
            title: "Thiên tài và sự giáo dục từ sớm",
            author: "Kyuichi Kimura",
            description: "Cuốn sách truyền cảm hứng về tiềm năng vô hạn của trẻ nhỏ và tầm quan trọng của việc giáo dục đúng cách trong những năm đầu đời.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/37_30.png"
        },
        {
            id: 38,
            title: "Những quy tắc để trẻ thông minh và hạnh phúc",
            author: "John Medina",
            description: "Áp dụng khoa học não bộ vào việc nuôi dạy trẻ. Những quy tắc thiết thực giúp cha mẹ nuôi dưỡng trí tuệ và cảm xúc cho con.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/38_31.png"
        },
        {
            id: 39,
            title: "Cha giàu cha nghèo - Tập 1",
            author: "Robert T. Kiyosaki",
            description: "Thay đổi tư duy về tiền bạc và tài chính cá nhân. Bài học từ 'hai người cha' về sự khác biệt giữa làm việc vì tiền và để tiền làm việc cho mình.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/39_32.png"
        },
        {
            id: 40,
            title: "Những tù nhân của địa lý",
            author: "Tim Marshall",
            description: "Góc nhìn địa-chính trị sắc sảo giải thích cách địa lý định hình vận mệnh các quốc gia và trật tự thế giới.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/40_33.png"
        }
    ];
}
else if (localStorage.getItem('selectedGenre') === "KHÁC"){
    MOCK_LISTING_DATA = [
        {
            id: 41,
            title: "Vũ trụ trong vỏ hạt dẻ",
            author: "Stephen Hawking",
            description: "Khám phá những bí ẩn lớn nhất của vũ trụ qua ngôn ngữ dễ hiểu. Từ thuyết tương đối đến cơ học lượng tử, cuốn sách mở ra chân trời tri thức mới.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/41_34.png"
        },
        {
            id: 42,
            title: "Lược sử loài người",
            author: "Yuval Noah Harari",
            description: "Hành trình của Homo sapiens từ loài vật vô danh đến kẻ thống trị Trái Đất. Một cái nhìn toàn diện, khiêu khích về lịch sử và tương lai nhân loại.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/42_35.png"
        },
        {
            id: 43,
            title: "Vũ trụ song song",
            author: "Brian Greene",
            description: "Chuyến du hành vào thế giới của đa vũ trụ và thuyết dây. Cuốn sách thách thức trí tưởng tượng về không gian, thời gian và thực tại.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/43_36.png"
        },
        {
            id: 44,
            title: "Từ tốt đến vĩ đại",
            author: "Jim Collins",
            description: "Nghiên cứu về những yếu tố giúp doanh nghiệp vươn tầm vĩ đại. Bài học về lãnh đạo, kỷ luật và chiến lược cho sự thành công bền vững.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/44_37.png"
        },
        {
            id: 45,
            title: "Vị tu sĩ bán chiếc Ferrari",
            author: "Robin Sharma",
            description: "Câu chuyện ngụ ngôn về việc tìm lại cân bằng cuộc sống. Từ bỏ danh vọng để tìm kiếm hạnh phúc đích thực và sự bình an trong tâm hồn.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/45_38.png"
        },
        {
            id: 46,
            title: "Ngày xưa có 1 con bò",
            author: "Camilo Cruz",
            description: "Câu chuyện ngụ ngôn hài hước về cách loại bỏ những lời biện minh (những con bò) để phá bỏ giới hạn bản thân và đạt được thành công.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/46_39.png"
        },
        {
            id: 47,
            title: "Ai và Ky ở xứ sở những con số tàng hình",
            author: "Ngô Bảo Châu",
            description: "Cuộc phiêu lưu kỳ thú vào thế giới toán học. Cuốn sách khơi dậy tình yêu với những con số và vẻ đẹp của tư duy logic qua lăng kính văn học.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/47_40.png"
        },
        {
            id: 48,
            title: "Con đường Hồi giáo",
            author: "Nguyễn Phương Mai",
            description: "Hành trình khám phá văn hóa và tôn giáo tại Trung Đông. Cái nhìn chân thực, khách quan và đầy nhân văn về thế giới Hồi giáo.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/48_41.png"
        },
        {
            id: 49,
            title: "Mình là cá, việc của mình là bơi",
            author: "Takeshi Furukawa",
            description: "Bài học về cách chấp nhận bản thân và tìm kiếm bình an. Sống đúng với chính mình, không so sánh và kiên định với con đường riêng.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/49_42.png"
        },
        {
            id: 50,
            title: "Nhật ký Đặng Thùy Trâm",
            author: "Đặng Thùy Trâm",
            description: "Những dòng nhật ký rực lửa của nữ bác sĩ trẻ tại chiến trường. Biểu tượng của lòng yêu nước, lý tưởng sống cao đẹp và đức hy sinh.",
            img: "https://raw.githubusercontent.com/Kaohtp/images-authors-books/refs/heads/main/book/50_43.png"
        }
    ];
}
// MOCK_LISTING_DATA = [
//     {
//         id : 1,
//         title: "Dế Mèn Phiêu Lưu Ký",
//         author: "Tô Hoài",
//         description: "Tác phẩm văn học thiếu nhi kinh điển của Việt Nam, kể về cuộc phiêu lưu của chú Dế Mèn qua thế giới loài vật.",
//         img: "../Images/Book-Covers/b11.png"
//     },
//     {   id : 1,
//         title: "Harry Potter",
//         author: "J.K. Rowling",
//         description: "Bộ truyện giả tưởng nổi tiếng thế giới về cậu bé phù thủy Harry Potter và cuộc chiến chống lại Chúa tể Hắc ám.",
//         img: "../Images/Book-Covers/b1.png"
//     },
//     {   id : 1,
//         title: "Đắc Nhân Tâm",
//         author: "Dale Carnegie",
//         description: "Quyển sách self-help bán chạy nhất mọi thời đại, đưa ra những lời khuyên về cách ứng xử và giao tiếp.",
//         img: "../Images/Book-Covers/b9.png"
//     },
//     {   id : 1,
//         title: "Nhà Giả Kim",
//         author: "Paulo Coelho",
//         description: "Câu chuyện về hành trình đi tìm kho báu của chàng chăn cừu Santiago, chứa đựng nhiều triết lý sâu sắc.",
//         img: "../Images/Book-Covers/b13.png"
//     },
//     {   id : 1,
//         title: "Sapiens",
//         author: "Yuval Noah Harari",
//         description: "Cuốn sách bao quát lịch sử tiến hóa của loài người từ thời tiền sử cho đến hiện đại.",
//         img: "../Images/Book-Covers/b15.png"
//     },
//     {   id : 1,
//         title: "Mắt Biếc",
//         author: "Nguyễn Nhật Ánh",
//         description: "Câu chuyện tình yêu đơn phương buồn man mác của Ngạn dành cho Hà Lan qua bao năm tháng.",
//         img: "../Images/Book-Covers/b9.png"
//     }
// ];

export class ListingPage {
    #booksData;
    #container;
    #titleElement;

    constructor(data) {
        this.#booksData = data;
        
        // DOM Elements
        this.#container = document.querySelector('.listing-container');
        this.#titleElement = document.querySelector('.listing-title-content');

        // Chỉ chạy nếu tìm thấy DOM
        if (this.#container && this.#titleElement) {
            this.init();
        } else {
            console.warn('ListingPage: Không tìm thấy element cần thiết.');
        }
    }

    init() {
        this.#updateTitle();
        this.#renderList();
    }

    #updateTitle() {
        // Lấy dữ liệu từ localStorage (được lưu bên genres.js)
        const savedGenre = localStorage.getItem('selectedGenre');
        if (savedGenre === "TOP TRENDING" || savedGenre === "YÊU THÍCH") {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "../Styles/pink-color.css";
            document.head.appendChild(link);
        }
        else if (savedGenre === "SÁCH MỚI") {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "../Styles/blue-color.css";
            document.head.appendChild(link);
        }
        if (savedGenre) {
            this.#titleElement.innerText = savedGenre;
            document.title = `${savedGenre} - Listenary`;
        } else {
            this.#titleElement.innerText = "Danh sách sách";
        }
        localStorage.removeItem('selectedGenre');
    }

    #renderList() {
        // Xóa nội dung cũ
        this.#container.innerHTML = '';

        const html = this.#booksData.map((book, index) => {
            // Logic xoay vòng class CSS: element-card-1 -> 2 -> 3 -> 1...
            // index % 3 trả về 0, 1, 2. Cộng thêm 1 để thành 1, 2, 3.
            const variantClass = `element-card-${(index % 3) + 1}`;

            return `
            <div class="listed-element-card ${variantClass} jstoBookDetailPage" data-book-id="${book.id}">
                <div class="listing-grid">
                    <div class="listed-element-image">
                        <img src="${book.img}" alt="${book.title}" onerror="this.src='../Images/Book-Covers/default.png'">
                    </div>
                    <div class="listing-card-info">
                        <p class="listing-element-title">${book.title}</p>
                        <p class="listing-element-author">${book.author}</p>
                        <p class="listing-element-des">${book.description}</p>
                    </div>
                </div>
            </div>
            `;
        }).join('');

        this.#container.innerHTML = html;
    }
}

// Khởi tạo
document.addEventListener('DOMContentLoaded', () => {
    new ListingPage(MOCK_LISTING_DATA);
});