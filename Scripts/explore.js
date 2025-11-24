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

const trendingData = [
    {
        id: 1,
        title: "All The Light We Cannot See",
        author: "Anthony Doerr",
        img: "./Images/Book-Covers/b1.png",
        rating: 5.0, // Sẽ map thành rating-50.png
        reviewCount: "1,000,000"
    },
    {
        id: 2,
        title: "Rich People Problems",
        author: "Kevin Kwan",
        img: "./Images/Book-Covers/b2.png",
        rating: 4.5, // Sẽ map thành rating-45.png
        reviewCount: "850,000"
    },
    {
        id: 3,
        title: "Becoming",
        author: "Michelle Obama",
        img: "./Images/Book-Covers/b3.png",
        rating: 4.8, // Làm tròn map thành rating-50.png hoặc logic tùy chỉnh
        reviewCount: "2,000,000"
    },
    {
        id: 4,
        title: "Where The Crawdads Sing",
        author: "Delia Owens",
        img: "./Images/Book-Covers/b4.png",
        rating: 4.0, // Sẽ map thành rating-40.png
        reviewCount: "1,500,000"
    },
    {
        id: 5,
        title: "Crazy Rich Asians",
        author: "Kevin Kwan",
        img: "./Images/Book-Covers/b5.png",
        rating: 3.5, // Sẽ map thành rating-35.png
        reviewCount: "900,000"
    },
    {
        id: 6,
        title: "Konspirasi Alam Semesta",
        author: "Fiersa Besari",
        img: "./Images/Book-Covers/b6.png",
        rating: 4.5, // Sẽ map thành rating-45.png
        reviewCount: "120,000"
    }
];

const newBooksData = [
    {
        id: 101,
        title: "All The Light We Cannot See",
        author: "Anthony Doerr",
        img: "./Images/Book-Covers/b1.png",
        rating: 5.0,
        reviewCount: "1,000,000",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae enim eget, tempus."
    },
    {
        id: 102,
        title: "Journey Through Time",
        author: "H.G. Wells",
        img: "./Images/Book-Covers/b2.png",
        rating: 4.5,
        reviewCount: "500,000",
        description: "A breathtaking journey through the ages, exploring the mysteries of time travel."
    },
    {
        id: 103,
        title: "Mystery Of The Ocean",
        author: "Jules Verne",
        img: "./Images/Book-Covers/b3.png",
        rating: 4.8,
        reviewCount: "800,000",
        description: "Dive deep into the unknown depths of the ocean where strange creatures lurk."
    },
    {
        id: 104,
        title: "Where The Crawdads Sing",
        author: "Delia Owens",
        img: "./Images/Book-Covers/b4.png",
        rating: 4.7,
        reviewCount: "1,200,000",
        description: "A painfuly beautiful first novel that is at once a murder mystery and a coming-of-age narrative."
    },
    {
        id: 105,
        title: "Crazy Rich Asians",
        author: "Kevin Kwan",
        img: "./Images/Book-Covers/b5.png",
        rating: 4.2,
        reviewCount: "950,000",
        description: "The outrageously funny debut novel about three super-rich, pedigreed Chinese families."
    },
    {
        id: 106,
        title: "Konspirasi Alam Semesta",
        author: "Fiersa Besari",
        img: "./Images/Book-Covers/b6.png",
        rating: 4.6,
        reviewCount: "300,000",
        description: "A touching story about destiny, love, and the conspiracy of the universe."
    }
];
document.addEventListener('DOMContentLoaded', () => {
    const slider = new HeroSlider(banners);
    const trendingSection = new TrendingSection(trendingData);
    const newBooksSection = new NewBooksSection(newBooksData);
});
