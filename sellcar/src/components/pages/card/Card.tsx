import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Card.css';
import { getPhoto } from '../../../api/auction';

interface CardProps {
  data: {
    id: number;
    title: string;
    description: string;
    finish_at: string;
    curr_price: number;
    step_bit: number;
  };
}

const Card: React.FC<CardProps> = ({ data }) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhoto = async () => {

      try {
        const data1 = await getPhoto(data.id);
        console.log(data1?.[0]?.path);
        
        setPhotoUrl(data1?.[0]?.path || '/car.png');
      } catch (error) {
        console.error('Помилка завантаження фото:', error);
        setPhotoUrl('/car.png');
      }
    };

    fetchPhoto();
  }, [data.id]);
  return (
    <Link to={`/car/${data.id}`} className="car-card">
        <img
          className="car-image"
          src={photoUrl || '/car.png'}
          alt={data.title}
        />
        <div className="car-info-container">
        <h2 className="car-title">{data.title}</h2>
        
        <div className="car-prices">
          <p><span>Поточна ціна:</span> <strong>{data.curr_price} ₴</strong></p>
          <p><span>Хід ставки:</span> +{data.step_bit} ₴</p>
        </div>

        <p className="car-description">{data.description}</p>

        <div className="auction-footer">
          <p className="car-auction-end">
            <strong>Кінець:</strong> <p>{new Date(data.finish_at).toLocaleString()}</p>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
