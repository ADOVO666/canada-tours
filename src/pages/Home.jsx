import Navbar from '../components/Navbar';
import TourCard from '../components/TourCard';
import ExcursionCard from '../components/ExcursionCard';
import Review from '../components/Review';
import Footer from '../components/Footer';
import Landing from '../components/Landing';
import Planning from '../components/Planning';
import WhyWe from '../components/WhyWe';

const Home = () => {
  const tours = []; // Массив туров
  const excursions = []; // Массив экскурсий
  const reviews = []; // Массив отзывов

  return (
    <div>
      <Navbar />
      <Landing />
      <Planning />
      <section id="popular">
        <h2>Популярные туры</h2>
        <div className="tours">
          {tours.map(tour => <TourCard key={tour.id} tour={tour} />)}
        </div>
        <h2>Экскурсии</h2>
        <div className="excursions">
          {excursions.map(excursion => <ExcursionCard key={excursion.id} excursion={excursion} />)}
        </div>
      </section>
      <WhyWe />
      <section id="reviews">
        <h2>Отзывы</h2>
        <Review reviews={reviews} />
      </section>
      <Footer />
    </div>
  );
};

export default Home;