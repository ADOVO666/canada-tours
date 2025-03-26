// SortedTours.jsx
import React from 'react';
import TourCard from '../components/TourCard'; // Компонент для отображения карточек туров

const SortedTours = () => {
  return (
    <div>
      <h1>Результаты поиска туров</h1>
      <div className="tour-cards-container">
        {/* Здесь будет отрисовка карточек туров */}
        <TourCard />
        <TourCard />
        <TourCard />
        {/* Добавь столько карточек, сколько нужно */}
      </div>
    </div>
  );
};

export default SortedTours;
