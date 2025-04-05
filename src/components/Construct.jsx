
//Construct.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchFilteredTours } from '../api';  
import '../styles/Construct.css';

const Construct = () => {
  const [searchType, setSearchType] = useState('1');
  const [location, setLocation] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [destination, setDestination] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [tickets, setTickets] = useState(1);  


  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const duration =
        departureDate && arrivalDate
          ? Math.ceil(
              (new Date(arrivalDate) - new Date(departureDate)) /
              (1000 * 60 * 60 * 24)
            )
          : undefined;
      const params = {
        location,
        duration,
        destination,
        available_tickets: tickets,
        type: Number(searchType),
      };

      const filteredTours = await fetchFilteredTours(params);  

      navigate('/sorted-tours', {
        state: {
          filteredTours, 
          location,
          departureDate,
          destination,
          arrivalDate,
          tickets,  
        }
      });
    } catch (error) {
      alert('Ошибка при поиске туров. Попробуйте снова.');
    }
  };

  return (
    <div className='construct'>
      <div className="construct-container">
        <div className="construct-inputs">
          <div className="section">
            <label>Что ищем?</label>
            <select
              value={searchType}
              onChange={e => setSearchType(e.target.value)}
            >
              <option value="1">Туры</option>
              <option value="2">Экскурсии</option>
            </select>
          </div>
          
          <div className="section">
            <label>Откуда</label>
            <input
              type="text"
              placeholder="Локация"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
          </div>
          
          <div className="section">
            <label>Дата отправления</label>
            <input
              type="date"
              value={departureDate}
              onChange={e => setDepartureDate(e.target.value)}
            />
          </div>

          <div className="section">
            <label>Куда</label>
            <input
              type="text"
              placeholder="Страна"
              value={destination}
              onChange={e => setDestination(e.target.value)}
            />
          </div>

          <div className="section">
            <label>Дата возвращения</label>
            <input
              type="date"
              value={arrivalDate}
              onChange={e => setArrivalDate(e.target.value)}
            />
          </div>

          <div className="section">
            <label>Кол-во человек</label>
            <input
              type="number"
              min="1"
              value={tickets}
              onChange={e => setTickets(e.target.value)}
            />
          </div>

          <button className="search-button" onClick={handleSearch}>Найти</button>
        </div>
      </div>
    </div>
  );
};

export default Construct;