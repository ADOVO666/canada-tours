import React, { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import logo from '../images/logo.png';
import '../styles/Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const exitHandle = () => {
        sessionStorage.removeItem('authenticated');
        sessionStorage.removeItem('name');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isAuthenticated = () => {
        return sessionStorage.getItem("authenticated") === "true";
    };

    if(isAuthenticated())
    {
        const authenticatedName = sessionStorage.getItem('name');
        return (
            <nav className="navbar">
                <img src={logo} alt="Canada Logo" className="logo" />
                
                <div className="desktop-menu">
                    <Link smooth to="/" className="navbar-link">
                        Главная
                    </Link>
                    <Link smooth to="/#popular" className="navbar-link">
                        Популярное
                    </Link>
                    <Link smooth to="/#about-us" className="navbar-link">
                        О нас
                    </Link>
                    <Link smooth to="/" className="navbar-link">
                    {authenticatedName}
                    </Link>
                    <Link smooth to="/login" onClick={exitHandle} className="navbar-link">
                        Выход
                    </Link>
                </div>
    
                <div className="mobile-menu">
                    <button className="menu-toggle" onClick={toggleMenu}>
                        ⋯
                    </button>
                    {isMenuOpen && (
                        <div className="mobile-menu-items">
                            <Link smooth to="/" className="navbar-link" onClick={toggleMenu}>
                                Главная
                            </Link>
                            <Link smooth to="/#popular" className="navbar-link" onClick={toggleMenu}>
                                Популярное
                            </Link>
                            <Link smooth to="/#about-us" className="navbar-link" onClick={toggleMenu}>
                                О нас
                            </Link>
                            <Link smooth to="/" className="navbar-link" onClick={toggleMenu}>
                            {authenticatedName}
                            </Link>
                            <Link smooth to="/login" onClick={() => { exitHandle(); toggleMenu(); }} className="navbar-link">
                                Выход
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        );
    }
    else
    {
        return (
            <nav className="navbar">
                <img src={logo} alt="Canada Logo" className="logo" />
                
                <div className="desktop-menu">
                    <Link smooth to="/" className="navbar-link">
                        Главная
                    </Link>
                    <Link smooth to="/#popular" className="navbar-link">
                        Популярное
                    </Link>
                    <Link smooth to="/#about-us" className="navbar-link">
                        О нас
                    </Link>
                    <Link smooth to="/register" className="navbar-link">
                        Регистрация
                    </Link>
                    <Link smooth to="/login" className="navbar-link">
                        Логин
                    </Link>
                </div>
    
                <div className="mobile-menu">
                    <button className="menu-toggle" onClick={toggleMenu}>
                        ⋯
                    </button>
                    {isMenuOpen && (
                        <div className="mobile-menu-items">
                            <Link smooth to="/" className="navbar-link" onClick={toggleMenu}>
                                Главная
                            </Link>
                            <Link smooth to="/#popular" className="navbar-link" onClick={toggleMenu}>
                                Популярное
                            </Link>
                            <Link smooth to="/#about-us" className="navbar-link" onClick={toggleMenu}>
                                О нас
                            </Link>
                            <Link smooth to="/register" className="navbar-link" onClick={toggleMenu}>
                                Регистрация
                            </Link>
                            <Link smooth to="/login" className="navbar-link" onClick={toggleMenu}>
                                Логин
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        );
    }
    
};

export default Navbar;