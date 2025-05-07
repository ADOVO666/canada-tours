import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import '../styles/AuthForm.css';

const Register = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateLogin = (login) => {
        // Только латиница, не менее 5 символов, без пробелов, без цифр
        return /^[A-Za-z]{5,}$/.test(login);
    };
    const validatePassword = (password) => {
        // Не менее 8 символов, хотя бы одна заглавная, одна маленькая, одна цифра, один спецсимвол, только латиница
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(password) &&
               /^[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/.test(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateLogin(name)) {
            setError('Логин должен быть не менее 5 символов, только латинские буквы, без пробелов и цифр.');
            return;
        }
        if (!validatePassword(password)) {
            setError('Пароль: не менее 8 символов, хотя бы одна заглавная и одна маленькая латинская буква, одна цифра, один спецсимвол, только латиница.');
            return;
        }
        if (localStorage.getItem('user'+name)) {
            setError('Пользователь с таким именем уже существует.');
            return;
        }
        setError('');
        const userData = { name, password };
        localStorage.setItem('user'+name, JSON.stringify(userData));
        navigate('/');
        setName('');
        setPassword('');
    }

    return (
        <div>
            <Navbar />
            <div className="auth-container">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h2>Регистрация</h2>
                    {error && <div className="error-message">{error}</div>}
                    <label>
                        Имя:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Пароль:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Зарегистрироваться</button>
                </form>
            </div>
        </div>
    );
}

export default Register;