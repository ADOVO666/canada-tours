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

  useEffect(() => {
    const loadTourDetails = async () => {
      try {
        setLoading(true);
        const isTour = location.pathname.includes("/tour/");
        const type = isTour ? 1 : 2;

        const tourData = await fetchTourDetails(id);
        setItem(tourData);
      } catch (err) {
        setError("Ошибка загрузки данных");
      } finally {
        setLoading(false);
      }
    };

    loadTourDetails();
  }, [id, location.pathname]);

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

  const nextImage = () => {
    if (item.images && currentImageIndex < item.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (item.images && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleBooking = () => {
    navigate("/booking", {
      state: {
        tourTitle: item.id,
        tourName: item.title,
        amount_tickets: item.max_tickets - item.current_tickets,
        pricePerTicket: item.price
      }
    });
  };

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
            <img
              src={item.images ? item.images[currentImageIndex] : item.image}
              alt={item.title}
              className="tour-details-image"
            />
            {item.images && item.images.length > 1 && (
              <button className="next-button" onClick={nextImage}>&gt;</button>
            )}
          </div>
          
          <p>{item.description}</p>
          <p><strong>Цена:</strong> {item.price} руб.</p>
          <p><strong>Доступно мест:</strong> {item.max_tickets - item.current_tickets}</p>
          <button className="book-now-button" onClick={handleBooking}>
            Забронировать
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
