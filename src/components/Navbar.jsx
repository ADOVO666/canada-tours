import React from "react";
//import { Link } from 'react-scroll';
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { onNavigate } from "react-router-dom";
import { currentPage } from "react-router-dom";

const Navbar = ({currentPage, onNavigate}) => {
  return (
    <nav>
      <img src={logo} alt="Canada Logo" className="logo" />
      <button
        onClick={() => onNavigate("home")}
        className={currentPage === "home" ? "active" : ""}
      >
        Главная
      </button>
      <button
        onClick={() => onNavigate("popular")}
        className={currentPage === "popular" ? "active" : ""}
      >
        Популярное
      </button>
      <button
        onClick={() => onNavigate("reviews")}
        className={currentPage === "reviews" ? "active" : ""}
      >
        Отзывы
      </button>
      <button
        onClick={() => onNavigate("about_us")}
        className={currentPage === "about_us" ? "active" : ""}
      >
        О нас
      </button>
    </nav>
  );
};

export default Navbar;