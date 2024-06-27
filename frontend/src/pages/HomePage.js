// src/pages/HomePage.js
import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import LectureCard from '../components/LectureCard';
import Footer from '../components/Footer';
import './HomePage.scss';

const HomePage = () => {
    return (
        <div className="home-page">
            <Header />
            <div className="search-container"><SearchBar /></div>
            <div className="lecture-container">
                <LectureCard title="Bài giảng 1" />
                <LectureCard title="Bài giảng 2" />
                <LectureCard title="Bài giảng 3" />
                <LectureCard title="Bài giảng 4" />
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
