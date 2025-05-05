import React from 'react';
import { Link } from 'react-router-dom';
import './CarCard.css';

const CarCard: React.FC = () => {
  return (
    <Link to={`/car/${1}`} className="car-card">
      <img
        className="car-image"
        src="/car.png"
        alt="Audi A1 Sportback"
      />
      <div className="car-info-container">
        <h2 className="car-title">
          Audi A1 Audi A1 Sportback 1.0 30 TFSI 85 kW S tronic citycarver 5d
        </h2>
        <div className="car-info">
            <p><strong>ID автомобіля:</strong> 14513572</p>
            <p><strong>Дата:</strong> 2020-08-01</p>
            <p><strong>Тип палива:</strong> Бензин</p>
            <p><strong>Обʼєм:</strong> 999 см³</p>
            <p><strong>Трансмісія:</strong> Автоматична</p>
            <p><strong>Пробіг:</strong> 76,773 km</p>
        </div>
        <p className="car-auction-end"><strong>Кінець:</strong> Сьогодні 11:00</p>

      </div>
    </Link>
  );
};

export default CarCard;
