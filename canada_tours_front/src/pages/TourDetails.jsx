import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { fetchTourDetails } from '../api';
import '../styles/TourDetails.css';

const TourDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const loadTourDetails = async () => {
      try {
        setLoading(true);
        const tourData = await fetchTourDetails(id);
        console.log('Received tour data:', tourData);
        setItem(tourData);
      } catch (err) {
        console.error('Error loading tour:', err);
        setError("Ошибка загрузки данных");
      } finally {
        setLoading(false);
      }
    };

    loadTourDetails();
  }, [id]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <h2>Загрузка...</h2>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div>
        <Navbar />
        <h2>Тур или экскурсия не найдены!</h2>
      </div>
    );
  }

  const maxTickets = item.max_tickets - item.current_tickets;

  const nextImage = () => {
    if (item.images && currentImageIndex < item.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
      setImageLoaded(false);
    }
  };

  const prevImage = () => {
    if (item.images && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
      setImageLoaded(false);
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setQuantity('');
    } else {
      const numValue = parseInt(value);
      if (!isNaN(numValue) && numValue > 0 && numValue <= maxTickets) {
        setQuantity(numValue);
      }
    }
  };

  const handleBooking = () => {
    if (!quantity || quantity < 1) {
      return;
    }
    navigate("/booking", {
      state: {
        tourTitle: item.id,
        tourName: item.title,
        amount_tickets: quantity,
        pricePerTicket: item.price
      }
    });
  };

  const currentImage = item.images ? item.images[currentImageIndex] : item.image;

  return (
    <div>
      <Navbar />
      <div className="tour-details">
        <div className="tour-container">
          <h1>{item.title}</h1>
          
          <div className="image-container">
            {item.images && item.images.length > 1 && (
              <button className="prev-button" onClick={prevImage}>&lt;</button>
            )}
            {currentImage && (
              <img
                src={currentImage}
                alt={item.title}
                className="tour-details-image"
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  console.error('Error loading image:', e.target.src);
                  e.target.style.display = 'none';
                }}
                style={{ display: imageLoaded ? 'block' : 'none' }}
              />
            )}
            {item.images && item.images.length > 1 && (
              <button className="next-button" onClick={nextImage}>&gt;</button>
            )}
          </div>
          
          <p>{item.description}</p>
          <p><strong>Цена:</strong> {item.price} руб.</p>
          <p><strong>Доступно мест:</strong> {maxTickets}</p>
          
          <div className="quantity-selector">
            <label htmlFor="ticket-quantity">Количество билетов:</label>
            <input
              type="number"
              id="ticket-quantity"
              min="1"
              max={maxTickets}
              value={quantity}
              onChange={handleQuantityChange}
              onKeyDown={(e) => {
                if (e.key === 'e' || e.key === 'E' || e.key === '-' || e.key === '+') {
                  e.preventDefault();
                }
              }}
            />
          </div>

          <button 
            className="book-now-button" 
            onClick={handleBooking}
            disabled={!quantity || quantity < 1}
          >
            Забронировать
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
