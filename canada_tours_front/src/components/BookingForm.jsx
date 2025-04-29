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

    const normalizePhoneNumber = (phone) => {
        // Remove all non-digit characters
        let normalized = phone.replace(/\D/g, '');
        
        // If number starts with 8, replace with 7
        if (normalized.startsWith('8')) {
            normalized = '7' + normalized.slice(1);
        }
        
        // If number doesn't start with 7, add it
        if (!normalized.startsWith('7')) {
            normalized = '7' + normalized;
        }
        
        // Add + prefix
        return '+' + normalized;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            setUserData({ ...userData, [name]: value });
        } else {
            setUserData({ ...userData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Normalize phone number before submission
        const normalizedUserData = {
            ...userData,
            phone: normalizePhoneNumber(userData.phone)
        };

        // Отправляем запрос на бронирование
        try {
            //Сначала добавляем юзера
            const userAddResponse = await AddUser(normalizedUserData);
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
                        userData: normalizedUserData,  
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
                        placeholder="Ваш телефон (8 или +7)" 
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