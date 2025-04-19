// components/AuthTabs.jsx
import React, { useState } from 'react';
import '../styles/AuthTabs.css';
import { registerUser, loginUser } from '../api'; // Добавим в api.js

const AuthTabs = ({ onLoginSuccess }) => {
    const [tab, setTab] = useState('login');
    const [form, setForm] = useState({
        name: '', email: '', phone: '', serial: '', number: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = tab === 'register'
                ? await registerUser(form)
                : await loginUser(form);
            onLoginSuccess(data.id);
        } catch (err) {
            alert('Ошибка входа или регистрации');
        }
    };

    return (
        <div className="auth-tabs">
            <div className="tab-buttons">
                <button onClick={() => setTab('login')}>Войти</button>
                <button onClick={() => setTab('register')}>Регистрация</button>
            </div>
            <form onSubmit={handleSubmit}>
                {tab === 'register' && (
                    <>
                        <input name="name" placeholder="Имя" onChange={handleChange} required />
                        <input name="serial" placeholder="Серия паспорта" onChange={handleChange} required />
                        <input name="number" placeholder="Номер паспорта" onChange={handleChange} required />
                    </>
                )}
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                <input name="phone" placeholder="Телефон" onChange={handleChange} required />
                <button type="submit">{tab === 'login' ? 'Войти' : 'Зарегистрироваться'}</button>
            </form>
        </div>
    );
};

export default AuthTabs;
