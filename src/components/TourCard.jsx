import { useParams } from 'react-router-dom';

const TourDetail = () => {
  const { id } = useParams();
  const tour = {}; // Получите данные тура по id из API или состояния

  return (
    <div>
      <h1>{tour.name}</h1>
      <img src={tour.image} alt={tour.name} />
      <p>{tour.description}</p>
      {/* Дополнительная информация о туре */}
    </div>
  );
};

export default TourDetail;