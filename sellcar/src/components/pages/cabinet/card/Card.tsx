import React from 'react';
import './Card.css';
import { NavLink } from 'react-router-dom';

interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  id: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, title, description, startDate, endDate, id }) => {
  return (
    <div className="card">
      <img src={imageUrl} alt="photo" />
      <div className="card-info">
        <div><strong>{title}</strong></div>
        <div>Опис:<br />{description}</div>
        <div className='data-info'>
            <div>дата початку: {startDate}</div>
            <div>дата закінчення: {endDate}</div>
        </div>
      </div>
      <NavLink to={`/statistick/${id}`} className="stats-button">
        подивитись статистику
      </NavLink>
    </div>
  );
};

export default Card;
