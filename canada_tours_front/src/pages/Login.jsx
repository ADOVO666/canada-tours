import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";

const Register = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Получаем сохранённые данные из localStorage
        const savedUser = localStorage.getItem('user'+name);
        
        if (savedUser) {
            const userData = JSON.parse(savedUser);
            
            // Проверяем совпадение данных
            if (userData.name === name && userData.password === password) {
                console.log('Вход выполнен!');
                sessionStorage.setItem('authenticated', 'true')
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
            <form onSubmit={handleSubmit}>
                <h2>Login Form</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <br/>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <br/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Register;