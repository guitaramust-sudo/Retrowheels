import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import data from "./data.json";
import "./CarDetailPage.css";

const CarDetailPage = () => {
  const { id } = useParams();
  const car = data.cars.find((car) => car.id === parseInt(id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const imageVariants = [`../images/${car?.id}.jpg`, `../images/pashalko.jpg`];

  const handleImageClick = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const nextIndex = (currentImageIndex + 1) % imageVariants.length;
    if (nextIndex === 1) {
      setShowEasterEgg(true);
      setTimeout(() => setShowEasterEgg(false), 1000);
    }

    setTimeout(() => {
      setCurrentImageIndex(nextIndex);
      setIsAnimating(false);
    }, 500);
  };

  if (!car) {
    return (
      <div className="car-not-found">
        <h2>Автомобиль не найден</h2>
        <Link to="/" className="back-link">
          Вернуться к каталогу
        </Link>
      </div>
    );
  }

  return (
    <div className="car-detail-container">
      <Link to="/" className="back-button">
        ← Назад к каталогу
      </Link>

      <div className="car-detail">
        {car.id === 1 ? (
          <div className="car-detail-images">
            <div
              className={`image-container ${isAnimating ? "animating" : ""}`}
              onClick={handleImageClick}
            >
              <img
                src={imageVariants[currentImageIndex]}
                alt={`${car.brand} ${car.model}`}
                className="car-detail-image current"
                onError={(e) => {
                  e.target.src = "../images/placeholder.jpg";
                }}
              />
              <img
                src={
                  imageVariants[(currentImageIndex + 1) % imageVariants.length]
                }
                alt={`${car.brand} ${car.model}`}
                className="car-detail-image next"
                onError={(e) => {
                  e.target.src = "../images/placeholder.jpg";
                }}
              />

              {showEasterEgg && (
                <div className="easter-egg-overlay">
                  <div className="easter-egg-text">
                    ПАСХАЛКА АКТИВИРОВАНА! 🥚
                  </div>
                </div>
              )}
            </div>

            {imageVariants.length > 1 && (
              <div className="image-indicator">
                {imageVariants.map((_, index) => (
                  <div
                    key={index}
                    className={`indicator-dot ${
                      index === currentImageIndex ? "active" : ""
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="car-detail-images">
            <img
              src={`../images/${car.id}.jpg`}
              alt={`${car.brand} ${car.model}`}
              className="car-detail-image"
              onError={(e) => {
                e.target.src = "../images/placeholder.jpg";
              }}
            />
          </div>
        )}

        <div className="car-detail-info">
          <div className="car-detail-header">
            <h1 className="car-detail-title">
              {car.brand} {car.model}
            </h1>
            <span className="car-detail-generation">{car.generation}</span>
          </div>

          <div className="car-detail-price">
            {car.price.toLocaleString("ru-RU")} ₽
          </div>

          <div className="car-detail-specs">
            <div className="spec-item">
              <span className="spec-label">Двигатель:</span>
              <span className="spec-value">{car.engine}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Коробка передач:</span>
              <span className="spec-value">{car.transmission}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Привод:</span>
              <span className="spec-value">{car.driveType}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Годы производства:</span>
              <span className="spec-value">
                {car.productionStart} - {car.productionEnd || "н.в."}
              </span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Класс:</span>
              <span className="spec-value">{car.category}</span>
            </div>
          </div>

          <div className="car-detail-description">
            <h3>Описание</h3>
            <p>{car.fullDescription}</p>
          </div>

          <div className="car-detail-features">
            <h3>Особенности</h3>
            <ul>
              {car.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <button className="contact-button">Связаться для покупки</button>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
