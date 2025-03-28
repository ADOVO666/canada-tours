// TourDetails.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';

const TourDetails = () => {
  const { id } = useParams(); // Получаем ID тура из URL

  // Эмулируем получение данных из базы данных. Это временные данные.
  const tours = [
    { id: 1, title: 'Страна 1', price: '$72.00 / день', description: 'Описание тура 1', image: '/path/to/image1.jpg' },
    { id: 2, title: 'Страна 2', price: '$72.00 / день', description: 'Описание тура 2', image: '/path/to/image2.jpg' },
    // Добавьте больше туров по необходимости
  ];

  const tour = tours.find((tour) => tour.id === parseInt(id));

  if (!tour) {
    return(
      <div>
        <Navbar />
        <h2>Тур не найден!</h2>;
      </div>
    );
  }

  return (
    <div className="tour-details">
      <Navbar />

      <h1>{tour.title}</h1>
      <img src={tour.image} alt={tour.title} />
      <p>{tour.description}</p>
      <p>Цена: {tour.price}</p>
      <button className="book-now-button">Забронировать</button>
    </div>
  );
};

export default TourDetails;
