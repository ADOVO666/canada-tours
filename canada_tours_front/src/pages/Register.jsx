import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import '../styles/AuthForm.css';

const Register = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
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