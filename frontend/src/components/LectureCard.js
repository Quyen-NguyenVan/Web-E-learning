// src/components/LectureCard.js
import React from 'react';
import './App.scss';

const LectureCard = ({ title }) => {
    return (
        <div className="lecture-card">
            <h3>{title}</h3>
            <button>Tiến độ</button>
            <button>Kiểm tra</button>
        </div>
    );
};

export default LectureCard;
