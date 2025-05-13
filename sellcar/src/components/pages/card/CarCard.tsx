import React from 'react';
import { Link } from 'react-router-dom';
import './CarCard.css';

interface CarCardProps {
  data: {
    id: number;
    title: string;
    description: string;
    finish_at: string;
    curr_price: number;
    step_bit: number;
  };
}

const CarCard: React.FC<CarCardProps> = ({ data }) => {
  return (
    <Link to={`/car/${data.id}`} className="car-card">
      <img className="car-image" src="https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.9y7THRQIYOT2hX5JlHmW6QHaHa%26cb%3Diwp1%26pid%3DApi&sp=1746540706T09fb3b67f8db2635c072a08522234244e79a12f988e1a2229cd999c7630bc366" alt={data.title} />
      <div className="car-info-container">
        <h2 className="car-title">{data.title}</h2>
        
        <div className="car-prices">
          <p><span>Поточна ціна:</span> <strong>{data.curr_price} ₴</strong></p>
          <p><span>Хід ставки:</span> +{data.step_bit} ₴</p>
        </div>

        <p className="car-description">{data.description}</p>

        <div className="auction-footer">
          <p className="car-auction-end">
            <strong>Кінець:</strong> {new Date(data.finish_at).toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
