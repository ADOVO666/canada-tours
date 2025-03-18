import React from "react";
import { Link } from "react-router-dom";
//import "./Header.css";
import logo from "../images/logo.png";
import whywe from "../images/whywe.png";

function WhyWe() {
    return (
        <header className="header">
            <div className="header-top">
                <div className="header-logo">
                    <span className="project-name">Зачем стоит обратиться к нам?</span>
                </div>
            </div>
            <div className="header-content">
                <img src={whywe} alt="vocation" className="whywe" />
                <p className="description">
                    <p> Личный гид</p>
                    <p> Большой вбыор</p>
                    <p> Лучшая цена</p>
                </p>
            </div>
        </header>
    );
};

export default WhyWe;


