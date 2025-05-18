import React from 'react';
import './Card.css';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../../../LanguageContext';
import { translations } from '../../../../i18n';

interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  id: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, title, description, startDate, endDate, id }) => {
  const { lang } = useLanguage();
  const t = translations[lang];
  return (
    <div className="card">
      <img src={imageUrl} alt="photo" />
      <div className="card-info">
        <div><strong>{title}</strong></div>
        <div>{t.description}:<br />{description}</div>
        <div className='data-info'>
            <div>{t.startDate}: {startDate}</div>
            <div>{t.endDate}: {endDate}</div>
        </div>
      </div>
      <NavLink to={`/statistick/${id}`} className="stats-button">
        {t.viewStats}
      </NavLink>
    </div>
  );
};

export default Card;
