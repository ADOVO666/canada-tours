import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { bookTour } from '../api';  
import '../styles/BookingForm.css';

const BookingForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { tourTitle, tickets, pricePerTicket } = location.state || {}; 
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        passport: '',  
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        const bookingData = {
            tourTitle,
            tickets,
            pricePerTicket,
            ...formData  
        };

        // Отправляем запрос на бронирование
        try {
            const bookingResponse = await bookTour(bookingData); 
            if (bookingResponse) {
                // Переход к оплате с данными о бронировании
                navigate('/payment', {
                    state: {
                        tourTitle,
                        tickets,
                        pricePerTicket,
                        formData,  
                    }
                });
            } else {
                alert("Ошибка при бронировании тура");
            }
        } catch (error) {
            alert("Ошибка при бронировании. Попробуйте снова.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="booking-form-container">
                <form className="booking-form" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Ваше ФИО" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Ваш email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="tel" 
                        name="phone" 
                        placeholder="Ваш телефон" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="text" 
                        name="passport" 
                        placeholder="Паспортные данные"  
                        value={formData.passport} 
                        onChange={handleChange} 
                        required 
                    />

                    <button type="submit" className="submit-button">Забронировать</button>
                </form>

                <div className="booking-info">
                    <h2>Бронирование тура: {tourTitle}</h2>  
                    <p>Количество билетов: {tickets}</p>  
                    <p>Цена за один билет: {pricePerTicket} руб.</p>  
                    <p>Общая сумма: {tickets * pricePerTicket} руб.</p>  
                </div>
            </div>
        </div>
    );
};

export default BookingForm;
