import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import '../styles/AuthForm.css';

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const savedUser = localStorage.getItem('user'+name);
        
        if (savedUser) {
            const userData = JSON.parse(savedUser);
            if (userData.name === name && userData.password === password) {
                sessionStorage.setItem('authenticated', 'true');
                sessionStorage.setItem('name', name);
                navigate('/');
            } else {
                setError('Неверное имя или пароль');
            }
        } else {
            setError('Пользователь не найден. Зарегистрируйтесь.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="auth-container">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h2>Вход</h2>
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
                    <button type="submit">Войти</button>
                </form>
            </div>
        </div>
    );
};

export default Login;