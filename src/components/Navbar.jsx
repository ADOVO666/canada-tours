// Navbar.jsx
import React from 'react';
import '../styles/Navbar.css';
import logo from "../images/logo.png";

const Navbar = ({ currentPage, onNavigate }) => {
    return (
        <nav className="navbar">
            <img src={logo} alt="Canada Logo" className="logo" />
            <button onClick={() => onNavigate('home')} className={currentPage === 'home' ? 'active' : ''}>
                Главная
            </button>
            <button onClick={() => onNavigate('popular')} className={currentPage === 'popular' ? 'active' : ''}>
                Популярное
            </button>

            <button onClick={() => onNavigate('about_us')} className={currentPage === 'about_us' ? 'active' : ''}>
                О нас
            </button>
        </nav>
    );
};

export default Navbar;
