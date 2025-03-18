import React from "react";
import { Link } from "react-router-dom";
//import "./Header.css";
import logo from "../images/logo.png";
import voc from "../images/voc.png";

function Header() {
    return (
        <header className="header">
            <div className="header-top">
                <div className="header-logo">
                    
                    <span className="project-name">CANADA_TOURS</span>
                </div>

            </div>
            <div className="header-content">
                <p className="description">
                    Организуем туры, которые меняют представление о путешествиях
                </p>
                <img src={voc} alt="vocation" className="voc" />
            </div>
        </header>
    );
};

export default Header;


