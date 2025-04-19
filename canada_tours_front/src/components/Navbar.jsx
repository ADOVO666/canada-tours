// Navbar.jsx
import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';
import { HashLink as Link } from 'react-router-hash-link';
import logo from '../images/logo.png';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUserId(null);
  };

  const handleLoginSuccess = (id) => {
    localStorage.setItem('userId', id);
    setUserId(id);
    setShowAuthModal(false);
  };

  return (
    <>
      <nav className="navbar">
        <img src={logo} alt="Canada Logo" className="logo" />
        <Link smooth to="/" className="navbar-link">
          Главная
        </Link>
        <Link smooth to="/#popular" className="navbar-link">
          Популярное
        </Link>
        <Link smooth to="/#about-us" className="navbar-link">
          О нас
        </Link>

        {userId ? (
          <button onClick={handleLogout} className="navbar-button">
            Выйти из аккаунта
          </button>
        ) : (
          <button onClick={() => setShowAuthModal(true)} className="navbar-button">
            Войти / Регистрация
          </button>
        )}
      </nav>

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
};

export default Navbar;
