import React from 'react';
import { useParams } from 'react-router-dom';
import img from '../../../assets/car.png'
import './CarDetails.css';
import ImegeSlider from './slider/ImageSlider';
import AuctionBet from './bet/AuctionBet';
import VehicleCard from './vehicle/VehicleCard';

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const car = {
    id,
    image: img,
    year: 2007,
    fuel: 'Бензин',
    mileage: '324,544 км',
    engine: '3.5 л',
    drive: 'Передній',
    type: 'Седан',
    transmission: 'Автомат',
    status: 'Заводиться і їде',
    damage: 'Удар знизу',
    bid: '$4,350',
    minBid: '$200',
    location: 'Чехія',
    fullPrice: '4,600$',
  };

  return (
    <div>
        <div className="car-details">
            <div className="left-section">
                <ImegeSlider images={Array(5).fill(img)} />
            </div>
            <div className="right-section">
                <AuctionBet
                    bid={4350}
                    startTime="2025-05-03T12:00:00"
                    durationMinutes={30}
                    minBid={200}
                    currentUserBid={100}
                    totalPrice={4600}
                />
            </div>
            <div className="right-section">
                <VehicleCard/>
            </div>
        </div>

        <div className="car-details">

            <div className="icons-bar">
                <span>{car.year}</span>
                <span>{car.fuel}</span>
                <span>{car.mileage}</span>
                <span>{car.engine}</span>
                <span>{car.drive}</span>
                <span>{car.type}</span>
                <span>{car.transmission}</span>
                <span>{car.status}</span>
                <span>{car.damage}</span>
            </div>

            <div>
                Автомобіль знаходиться в Чехіі
            </div>
        </div>
    </div>
  );
};

export default CarDetails;
