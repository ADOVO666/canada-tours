// Navbar.jsx
import React from 'react';
import '../styles/Navbar.css';
import { HashLink as Link } from 'react-router-hash-link';
import logo from '../images/logo.png';

const Navbar = () => {
    return (
        <nav className="navbar">
            <img src={logo} alt="Canada Logo" className="logo" />
            {/* Переход на главную страницу */}
            <Link smooth to="/" className="navbar-link">
                Главная
            </Link>
            {/* Переход к секции Популярное */}
            <Link smooth to="/#popular" className="navbar-link">
                Популярное
            </Link>
            {/* Переход к секции О нас (вниз страницы) */}
            <Link smooth to="/#about-us" className="navbar-link">
                О нас
            </Link>
        </nav>
    );
};

export default Navbar;
