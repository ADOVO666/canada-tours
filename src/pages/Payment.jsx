import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from "../components/Navbar";
import '../styles/Payment.css';
import paymentImage from "../images/payment-image.jpg"; 

const Payment = () => {
    const location = useLocation();
    const { tourTitle, tickets, pricePerTicket, formData } = location.state || {}; 

    const [paymentData, setPaymentData] = useState({
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: '',
    });

    const totalAmount = tickets * pricePerTicket;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentData({ ...paymentData, [name]: value });
    };

    const handlePayment = () => {
        alert("Ваши билеты отправлены на вашу почту!");
    };

    return (
        <div>
            <Navbar />
            <div className="payment-container">
                <div className="form-container">
                    <h2>Оплата тура: {tourTitle}</h2>
                    <p>Количество билетов: {tickets}</p>
                    <p>Цена за один билет: {pricePerTicket} руб.</p>
                    <p>Общая сумма: {totalAmount} руб.</p>

                    <h3>Ваши данные:</h3>
                    <p>Имя: {formData.name}</p>
                    <p>Email: {formData.email}</p>
                    <p>Телефон: {formData.phone}</p>
                    <p>Паспортные данные: {formData.passport}</p>

                    <h3>Данные для оплаты:</h3>
                    <form className="payment-form">
                        <input
                            type="text"
                            name="cardNumber"
                            placeholder="Номер карты"
                            value={paymentData.cardNumber}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="cardHolder"
                            placeholder="Имя владельца карты"
                            value={paymentData.cardHolder}
                            onChange={handleInputChange}
                            required
                        />
                        <div className="expiry-cvv-container">
                            <input
                                type="text"
                                name="expiryDate"
                                placeholder="Срок действия (MM/YY)"
                                value={paymentData.expiryDate}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="text"
                                name="cvv"
                                placeholder="CVV"
                                value={paymentData.cvv}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button type="button" className="pay-button" onClick={handlePayment}>
                            Оплатить
                        </button>
                    </form>
                </div>

                <div className="image-container">
                    <img src={paymentImage} alt="Оплата" />
                </div>
            </div>
        </div>
    );
};

export default Payment;
