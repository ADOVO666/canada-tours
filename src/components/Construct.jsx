import React, { useState } from 'react';
import '../styles/Construct.css';

const Construct = () => {
  const [location, setLocation] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [destination, setDestination] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');

  const handleSearch = () => {
    // логика поиска туров на основе выбранных параметров
    console.log(`Поиск туров из ${location} на ${departureDate} в ${destination} на ${arrivalDate}`);
    window.location.href = "/sorted-tours"; // переход на страницу SortedTours
  };

  return (
    <div className="construct-container">
      <h2>Подберите тур</h2>
      <div className="construct-inputs">
        <div className="section">
          <h3>Откуда</h3>
          <input
            type="text"
            placeholder="Локация"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
          <input
            type="date"
            value={departureDate}
            onChange={e => setDepartureDate(e.target.value)}
          />
        </div>

        <div className="section">
          <h3>Куда</h3>
          
          <input
            type="text"
            placeholder="Страна"
            value={destination}
            onChange={e => setDestination(e.target.value)}
          />
          <input
            type="date"
            value={arrivalDate}
            onChange={e => setArrivalDate(e.target.value)}
          />
        </div>
        
      <button className="search-button" onClick={handleSearch}>Найти</button>
      </div>

    </div>
  );
};

export default Construct;
