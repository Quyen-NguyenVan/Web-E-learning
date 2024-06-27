// src/components/SearchBar.js
import React from 'react';
import './App.scss';

const SearchBar = () => {
    return (
        <div className="search-bar">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Tìm kiếm" />
        </div>
    );
};

export default SearchBar;
