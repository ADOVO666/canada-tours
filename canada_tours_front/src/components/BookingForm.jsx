//BookingForm.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { AddUser, bookTour } from '../api';  
import '../styles/BookingForm.css';

const BookingForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { tourTitle, tourName, amount_tickets, pricePerTicket } = location.state || {}; 
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        serial: '',
        number: '',
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Отправляем запрос на бронирование
        try {
            //Сначала добавляем юзера
            const userAddResponse = await AddUser(userData);
            //Далее с помощью полученого id юзера конструируем данные для бронирования
            const formData = userAddResponse.id;
            const bookingData = {
                amount_tickets,
                tourTitle,
                formData,
            };

            const bookingResponse = await bookTour(bookingData); 
            if (bookingResponse) {
                // Переход к оплате с данными о бронировании
                navigate('/payment', {
                    state: {
                        tourTitle,
                        tourName,
                        amount_tickets,
                        pricePerTicket,
                        userData,  
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
                        placeholder="Ваше имя" 
                        value={userData.name} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Ваш email" 
                        value={userData.email} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="tel" 
                        name="phone" 
                        placeholder="Ваш телефон" 
                        value={userData.phone} 
                        onChange={handleChange} 
                        required 
                    />
                    <div className="passport-group">
                        <input
                            type="text"
                            name="serial"
                            placeholder="Серия"
                            value={userData.serial || ''}
                            onChange={handleChange}
                            maxLength="4"
                            minLength="4"
                            required
                        />
                        <input
                            type="text"
                            name="number"
                            placeholder="Номер"
                            value={userData.number || ''}
                            onChange={handleChange}
                            maxLength="6"
                            minLength="6"//Меточка
                            required
                        />
                    </div>

                    <button type="submit" className="submit-button">Забронировать</button>
                </form>

                <div className="booking-info">
                    <h2>Бронирование тура:</h2>
                    <h2>{tourName}</h2>  
                    <p>Количество билетов: {amount_tickets}</p>  
                    <p>Цена за один билет: {pricePerTicket} руб.</p>  
                    <p>Общая сумма: {amount_tickets * pricePerTicket} руб.</p>  
                </div>
            </div>
        </div>
    );
};

export default BookingForm;