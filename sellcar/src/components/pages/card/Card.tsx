import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPhoto } from '../../../api/auction';

interface CardPost {
  id: number;
  title: string;
  description: string;
  finish_at: string;
}

const Card: React.FC<CardPost> = ({ id, title, description, finish_at }) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhoto = async () => {

      try {
        const data = await getPhoto(id);
        console.log(data?.[0]?.path);
        
        setPhotoUrl(data?.[0]?.path || '/car.png');
      } catch (error) {
        console.error('Помилка завантаження фото:', error);
        setPhotoUrl('/car.png');
      }
    };

    fetchPhoto();
  }, [id]);

  return (
    <Link to={`/car/${id}`} className="car-card">
      <img
        className="car-image"
        src={photoUrl || '/car.png'}
        alt={title}
      />
      <div className="car-info-container">
        <h2 className="car-title">{title}</h2>
        <div className="car-info">{description}</div>
        <p className="car-auction-end"><strong>Кінець: </strong>{finish_at}</p>
      </div>
    </Link>
  );
};

export default Card;
