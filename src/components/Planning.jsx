import React from "react";
import { Link } from "react-router-dom";
import loc from "../images/ChooseLocation.png";
import pick from "../images/PickUpDate.png";
import book from "../images/Booking.png";

const Planning = () => {
    const planing = [
        {
            title:"выберите локацию",
            img: loc,
        },
        {
            title:"Определитесь с датой",
            img: pick,
        },
        {
            title:"Забронируйте свой идеальный тур",
            img: book,
        },   
    ];
    return (

    <section className="planing">
        <h2>CANADA_TOURS</h2>
        <h3>Всё очень просто!</h3>
        <div className="planing-list">
        {planing.map((planing, index) => (
           <div key={index} className="planing-item">
             <img src={planing.img} alt={planing.title} className="planing-image" />
             <p>{planing.title}</p>
             </div>
        ))}
        </div>
    </section>
    );
};

export default Planning;


