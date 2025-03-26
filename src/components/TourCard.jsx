import React from 'react';
import '../styles/TourCard.css';

const TourCard = ({ title, price, image }) => {
    return (
        <div className="tour-card">
            <div className="tour-image">
                <img src={image} alt={title} />
            </div>
            <h3>{title}</h3>
            <p>{price}</p>
            <button className="rent-button">Забронировать</button>
        </div>
    );
};

export default TourCard;
