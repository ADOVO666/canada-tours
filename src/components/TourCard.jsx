// TourCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/TourCard.css';

const TourCard = ({ id, title, price, image, type, availableTickets }) => {
    return (
        <div className="tour-card">
            <img src={image} alt={title} />
            <h3>{title}</h3>
            <p>Цена: {price} руб. / билет</p>
            <p>Мест: {availableTickets}</p>
            <Link to={`/${type}/${id}`}>
                <button className="book-now-button">Подробнее...</button>
            </Link>
        </div>
    );
};

export default TourCard;
