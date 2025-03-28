// TourCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const TourCard = ({ id, title, price, image }) => {
    return (
        <div className="tour-card">
            <img src={image} alt={title} />
            <h3>{title}</h3>
            <p>{price}</p>
            <Link to={`/tour/${id}`}>
                <button className="book-now-button">Забронировать</button>
            </Link>
        </div>
    );
};

export default TourCard;
