//Construct.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchFilteredTours, fetchCities, fetchCountries } from '../api';  
import '../styles/Construct.css';

const Construct = () => {
  const [searchType, setSearchType] = useState('1');
  const [location, setLocation] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [destination, setDestination] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [tickets, setTickets] = useState(1);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [citiesResponse, countriesResponse] = await Promise.all([
          fetchCities(),
          fetchCountries()
        ]);
        setCities(citiesResponse);
        setCountries(countriesResponse);
      } catch (error) {
        console.error('Error loading options:', error);
      } finally {
        setLoading(false);
      }
    };
    loadOptions();
  }, []);

  const handleSearch = async () => {
    try {
      const duration = departureDate && arrivalDate
        ? Math.ceil((new Date(arrivalDate) - new Date(departureDate)) / (1000 * 60 * 60 * 24))
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
          searchType: Number(searchType),
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

  if (loading) {
    return <div className="construct">Загрузка данных...</div>;
  }

  return (
    <div className='construct'>
      <div className="construct-container">
        <div className="construct-inputs">
          <div className="section">
            <label>Что ищем?</label>
            <select value={searchType} onChange={e => setSearchType(e.target.value)}>
              <option value="1">Туры</option>
              <option value="2">Экскурсии</option>
            </select>
          </div>
          
          <div className="section">
            <label>Откуда</label>
            <select value={location} onChange={e => setLocation(e.target.value)}>
              <option value="">Выберите город</option>
              {cities.map(city => (
                <option key={city.name} value={city.name}>{city.name}</option>
              ))}
            </select>
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
            <select value={destination} onChange={e => setDestination(e.target.value)}>
              <option value="">Выберите страну</option>
              {countries.map(country => (
                <option key={country.name} value={country.name}>{country.name}</option>
              ))}
            </select>
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