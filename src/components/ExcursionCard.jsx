// ExcursionCard.jsx
const ExcursionCard = ({ excursion }) => {
    return (
      <div className="excursion-card">
        <img src={excursion.image} alt={excursion.name} />
        <h3>{excursion.name}</h3>
        <p>{excursion.description}</p>
        <button onClick={() => window.location.href = `/excursion/${excursion.id}`}>Подробнее</button>
      </div>
    );
  };
  
  export default ExcursionCard;