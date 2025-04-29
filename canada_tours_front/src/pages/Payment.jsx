import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from "../components/Navbar";
import '../styles/Payment.css';
import paymentImage from "../images/payment-image.jpg"; 

const Payment = () => {
    const location = useLocation();
    const { tourTitle, tourName, amount_tickets, pricePerTicket, userData } = location.state || {}; 

    const [paymentData, setPaymentData] = useState({
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: '',
    });

    const [errors, setErrors] = useState({});
    const [isSuccess, setIsSuccess] = useState(false);

    const totalAmount = amount_tickets * pricePerTicket;

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || '';
        const parts = [];
        for (let i = 0; i < match.length; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };

    const formatExpiryDate = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
        }
        return v;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        switch (name) {
            case 'cardNumber':
                formattedValue = formatCardNumber(value);
                break;
            case 'cardHolder':
                formattedValue = value.toUpperCase().replace(/[^A-Z\s]/g, '');
                break;
            case 'expiryDate':
                formattedValue = formatExpiryDate(value);
                break;
            case 'cvv':
                formattedValue = value.replace(/\D/g, '').substring(0, 3);
                break;
            default:
                break;
        }

        setPaymentData({ ...paymentData, [name]: formattedValue });
        setErrors({ ...errors, [name]: '' });
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!paymentData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
            newErrors.cardNumber = 'Номер карты должен содержать 16 цифр';
        }
        
        if (!paymentData.cardHolder.match(/^[A-Z\s]{3,}$/)) {
            newErrors.cardHolder = 'Имя должно содержать только буквы';
        }
        
        if (!paymentData.expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
            newErrors.expiryDate = 'Неверный формат срока действия';
        }
        
        if (!paymentData.cvv.match(/^\d{3}$/)) {
            newErrors.cvv = 'CVV должен содержать 3 цифры';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePayment = () => {
        if (validateForm()) {
            setIsSuccess(true);
            setTimeout(() => {
                alert("Ваши билеты отправлены на вашу почту!");
            }, 1000);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="payment-container">
                <div className="form-container">
                    <h2>Оплата тура: {tourName}</h2>
                    <p>Количество билетов: {amount_tickets}</p>
                    <p>Цена за один билет: {pricePerTicket} руб.</p>
                    <p>Общая сумма: {totalAmount} руб.</p>

                    <h3>Ваши данные:</h3>
                    <p>Имя: {userData.name}</p>
                    <p>Email: {userData.email}</p>
                    <p>Телефон: {userData.phone}</p>
                    <p>Паспортные данные: {`${userData.serial} ${userData.number}`}</p>

                    <h3>Данные для оплаты:</h3>
                    <form className="payment-form">
                        <div className="input-group">
                            <input
                                type="text"
                                name="cardNumber"
                                placeholder="Номер карты"
                                value={paymentData.cardNumber}
                                onChange={handleInputChange}
                                maxLength={19}
                                required
                            />
                            {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                        </div>

                        <div className="input-group">
                            <input
                                type="text"
                                name="cardHolder"
                                placeholder="Имя владельца карты"
                                value={paymentData.cardHolder}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.cardHolder && <span className="error-message">{errors.cardHolder}</span>}
                        </div>

                        <div className="expiry-cvv-container">
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="expiryDate"
                                    placeholder="Срок действия (MM/YY)"
                                    value={paymentData.expiryDate}
                                    onChange={handleInputChange}
                                    maxLength={5}
                                    required
                                />
                                {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
                            </div>

                            <div className="input-group">
                                <input
                                    type="text"
                                    name="cvv"
                                    placeholder="CVV"
                                    value={paymentData.cvv}
                                    onChange={handleInputChange}
                                    maxLength={3}
                                    required
                                />
                                {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                            </div>
                        </div>

                        {isSuccess && (
                            <div className="success-message">
                                Оплата успешно обработана!
                            </div>
                        )}

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
