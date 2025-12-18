import React from "react";
import { Link } from "react-router-dom";
import data from "./data.json";
import "./CarModelsList.css";

const CarModelsList = () => {
  return (
    <div className="app">
      <header className="cars-header">
        <div className="header-decoration"></div>
        <div className="header-decoration"></div>
        <div className="header-decoration"></div>
        <div className="header-decoration"></div>

        <h1 className="cars-section-title">ПРЕМИУМ АВТОМОБИЛИ</h1>
        <p className="cars-section-subtitle">
          Откройте для себя мир роскоши и совершенства. Каждый автомобиль — это
          воплощение инженерного искусства и безупречного стиля
        </p>
      </header>

      <div className="cars-container">
        {data.cars.map((car) => (
          <div key={car.id} className="car-card">
            <Link to={`/car/${car.id}`} className="car-card-link">
              <div className="car-header">
                <h2 className="car-brand">{car.brand}</h2>
                <h3 className="car-model">{car.model}</h3>
              </div>
              <img
                src={`images/${car.id}.jpg`}
                alt={`${car.brand} ${car.model}`}
                className="car-image"
                onError={(e) => {
                  e.target.src = "images/placeholder.jpg";
                }}
              />
              <div className="price-container">
                <span className="car-price">
                  {car.price.toLocaleString("ru-RU")} ₽
                </span>
              </div>
              <p className="car-description">{car.shortDescription}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarModelsList;
