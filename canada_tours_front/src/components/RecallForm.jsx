import React, { useState } from 'react';
import '../styles/RecallForm.css';

const RecallForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const MAX_CHARS = 200;

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (message.length > MAX_CHARS) {
            setError(`Сообщение должно быть не более ${MAX_CHARS} символов`);
            return;
        }

        const data = {
            _replyto: email,
            message: message
        };

        try {
            const response = await fetch('https://formspree.io/f/xwpovvzb', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                setSubmitted(true);
                setEmail('');
                setMessage('');
                setError('');
                setTimeout(() => setSubmitted(false), 3000);
            } else {
                throw new Error('Ошибка при отправке формы');
            }
        } catch (error) {
            setError('Произошла ошибка. Пожалуйста, попробуйте позже.');
            console.error('Ошибка:', error);
        }
    };

    return (
        <section id="recall" className="recall-section">
            <div className="recall-form-container">
                <h2>Напишите нам</h2>
                
                {submitted ? (
                    <div className="success-message">
                        Спасибо за ваше сообщение! Мы ответим вам в ближайшее время.
                    </div>
                ) : (
                    <form className="recall-form" onSubmit={handleSubmit}>
                        {error && <div className="error-message">{error}</div>}
                        
                        <input
                            type="email"
                            placeholder="Ваша почта"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        
                        <textarea
                            placeholder={`Ваше сообщение (максимум ${MAX_CHARS} символов)`}
                            value={message}
                            onChange={(e) => {
                                if (e.target.value.length <= MAX_CHARS) {
                                    setMessage(e.target.value);
                                }
                            }}
                            required
                        />
                        
                        <div className="char-counter">
                            {message.length}/{MAX_CHARS}
                        </div>
                        
                        <button type="submit">Отправить</button>
                    </form>
                )}
            </div>
        </section>
    );
};

export default RecallForm;