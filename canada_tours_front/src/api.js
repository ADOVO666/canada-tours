import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

// Получение всех туров и экскурсий
export const fetchTours = async () => {
    const response = await axios.get(`${API_URL}/tours/`);
    return response.data;
};

// Фильтрация туров и экскурсий по параметрам из консруктора
export const fetchFilteredTours = async (params) => {
    const response = await axios.get(`${API_URL}/tours/`, { params });
    return response.data;
};

// Получение детальной информации о туре
export const fetchTourDetails = async (id) => {
    const response = await axios.get(`${API_URL}/tours-detail/${id}/`);
    return response.data;
};

// Бронирование тура
export const bookTour = async (bookingData) => {
    const response = await axios.post(`${API_URL}/bookings/`, bookingData);
    return response.data;
};

// Оплата тура
export const payForTour = async (paymentData) => {
    const response = await axios.post(`${API_URL}/payments/`, paymentData);
    return response.data;
};

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/users/`, userData);
    return response.data;
};

export const loginUser = async (loginData) => {
    const response = await axios.get(`${API_URL}/users/`, {
        params: {
            email: loginData.email,
            phone: loginData.phone,
        },
    });

    if (response.data.length > 0) {
        return response.data[0]; // предполагается, что email и phone уникальны
    } else {
        throw new Error('Пользователь не найден');
    }
};