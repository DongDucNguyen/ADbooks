// Scripts/explore.js
import {HeroSlider} from "./Explore-Page/hero-banner.js";
import { TrendingSection } from './Explore-Page/top-trending.js';
import { NewBooksSection } from './Explore-Page/new-books.js'; // <--- Import mới
const banners = [
    {
        id: "1",
        name: 'Life Of The Wild',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet. Libero ipsum enim pharetra hac. Urna commodo, lectus ut magna sed aliquet. Amet, conubia sed.',
        link: '#',
        img: './Images/Book-Covers/book.png'
    },
    {
        id: "2",
        name: 'Journey Through Time',
        description: 'Aliquam erat volutpat. Duis ac orci vitae libero imperdiet varius. Pellentesque habitant morbi tristique senectus et netus.',
        link: '#',
        img: './Images/Book-Covers/b2.png'
    },
    {
        id: "3",
        name: 'Mystery Of The Ocean',
        description: 'Suspendisse potenti. Quisque sit amet accumsan tortor. Proin vel nulla vitae arcu convallis placerat.',
        link: '#',
        img: './Images/Book-Covers/b3.png'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Hero Slider (Giữ nguyên mock data/hardcode vì không có API lấy 3 banner ngẫu nhiên cụ thể)
    const slider = new HeroSlider(banners);
    
    // 2. Trending Section (Tự gọi API)
    const trendingSection = new TrendingSection();
    
    // 3. New Books Section (Tự gọi API)
    const newBooksSection = new NewBooksSection();
    
    // 4. Events cho nút xem thêm
    document.querySelector('.Top-Trending').addEventListener('click', function() {
        localStorage.setItem('selectedGenre', "TOP TRENDING");
    });
    document.querySelector('.background-text').addEventListener('click', function() {
        localStorage.setItem('selectedGenre', "SÁCH MỚI");
    });
});