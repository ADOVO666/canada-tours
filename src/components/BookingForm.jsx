// BookingForm.jsx
import React, { useState } from 'react';
import '../styles/BookingForm.css';

// Имитируем данные конкретного тура
const tourData = {
    id: 1,
    title: "Конкретный тур",
    price: "$72.00 / день",
};

const BookingForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    // Обработка изменения в форме
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Обработка отправки формы
    const handleSubmit = (e) => {
        e.preventDefault();
        // Тут в дальнейшем можно отправить данные в Django
        console.log('Форма отправлена', formData);
    };

    return (
        <div className="booking-form-container">
            <h1>Бронирование</h1>
            <h2>Тур: {tourData.title}</h2>
            <form className="booking-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Ваше имя" 
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
                <textarea 
                    name="message" 
                    placeholder="Ваше сообщение" 
                    value={formData.message} 
                    onChange={handleChange} 
                ></textarea>

                <button type="submit" className="submit-button">Забронировать</button>
            </form>

            <div className="booking-info">
                <h3>НАШИ КОНТАКТЫ</h3>
                <p>Email: contact@company.com</p>
                <p>Телефон: (123) 456-789</p>
                <p>Адрес: Какой-то адрес</p>
            </div>
        </div>
    );
};

export default BookingForm;
