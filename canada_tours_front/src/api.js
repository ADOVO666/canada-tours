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
