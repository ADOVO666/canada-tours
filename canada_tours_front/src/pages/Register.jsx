import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";

const Register = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Создаём объект с данными пользователя
        const userData = { name, password };
        
        // Сохраняем в localStorage (ключ: 'user')
        localStorage.setItem('user'+name, JSON.stringify(userData));

        navigate('/');

        setName('');
        setPassword('');
    }

    return (
        <div>
            <Navbar />

            <form onSubmit={handleSubmit}>
                <h2>Registration Form</h2>
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register; 