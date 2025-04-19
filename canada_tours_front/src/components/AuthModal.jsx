import React, { useState } from 'react';
import '../styles/AuthModal.css';

const AuthModal = ({ onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    serial: '',
    number: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Валидация паролей при регистрации
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }

    const url = isLogin ? '/api/login/' : '/api/register/';
    const payload = isLogin
      ? { 
          email: formData.email, 
          password: formData.password 
        }
      : {
          name: formData.name,
          serial: formData.serial,
          number: formData.number,
          phone: formData.phone,
          email: formData.email,
          password: formData.password
        };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        // Сохраняем токены и ID пользователя
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        localStorage.setItem('userId', data.user_id);
        onLoginSuccess(data.user_id);
        onClose();
      } else {
        const error = await response.json();
        alert('Ошибка: ' + JSON.stringify(error));
      }
    } catch (error) {
      alert('Ошибка сети');
    }
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button className="close-button" onClick={onClose}>&times;</button>
        <div className="tabs">
          <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Вход</button>
          <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>Регистрация</button>
        </div>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="ФИО"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="serial"
                placeholder="Серия паспорта (4 цифры)"
                value={formData.serial}
                onChange={handleChange}
                required
                pattern="\d{4}"
                maxLength="4"
              />
              <input
                type="text"
                name="number"
                placeholder="Номер паспорта (6 цифр)"
                value={formData.number}
                onChange={handleChange}
                required
                pattern="\d{6}"
                maxLength="6"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Телефон"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="8"
          />
          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Подтвердите пароль"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength="8"
            />
          )}
          <button type="submit">
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;