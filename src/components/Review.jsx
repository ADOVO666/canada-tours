import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Review = ({ reviews }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {reviews.map((review, index) => (
        <div key={index}>
          <h3>{review.author}</h3>
          <p>{review.text}</p>
        </div>
      ))}
    </Slider>
  );
};

export default Review;