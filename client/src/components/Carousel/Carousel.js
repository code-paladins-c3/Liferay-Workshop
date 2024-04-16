import './Carousel.css';
import React, { useState } from 'react';


const Carousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const displayCount = 3; // Defina a quantidade de imagens a serem exibidas aqui

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex >= images.length - displayCount ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - displayCount : prevIndex - 1
    );
  };

  return (
    <div className="carousel">
      <button onClick={prevSlide} className="carousel__btn carousel__btn--prev">
      &lt;
      </button>
      {images.slice(activeIndex, activeIndex + displayCount).map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${activeIndex + index}`}
          className="carousel__img"
        />
      ))}
      <button onClick={nextSlide} className="carousel__btn carousel__btn--next">
      &gt;
      </button>
    </div>
  );
};

export default Carousel;
