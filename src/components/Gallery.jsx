import React, { useState } from 'react';
import '../styles/Gallery.css';
import IMG1 from '../images/gallery/img1.png'; // Подставь свои пути к изображениям
import IMG2 from '../images/gallery/img2.png';
import IMG3 from '../images/gallery/img3.png';
import IMG4 from '../images/gallery/img4.png';
import IMG5 from '../images/gallery/img5.png';

const Gallery = () => {
    const images = [IMG1, IMG2, IMG3, IMG4, IMG5];
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="gallery">
            <h2>Галерея</h2>
            <div className="gallery-wrapper">
                <div className="gallery-images">
                    <img src={images[currentIndex]} alt={`Gallery image ${currentIndex + 1}`} />
                    <img src={images[(currentIndex + 1) % images.length]} alt={`Gallery image ${currentIndex + 2}`} />
                </div>
            </div>
            <div className="gallery-navigation">
                <button className="prev" onClick={handlePrevClick}>&larr;</button>
                <div className="dots">
                    {images.map((_, index) => (
                        <span key={index} className={index === currentIndex ? 'active-dot' : 'dot'}></span>
                    ))}
                </div>
                <button className="next" onClick={handleNextClick}>&rarr;</button>
            </div>
        </div>
    );
};

export default Gallery;
