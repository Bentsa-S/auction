import React, { useState, useEffect } from 'react';
import img from '../../../assets/car.png';
import './CarDetails.css';
import ImegeSlider from './slider/ImageSlider';
import AuctionBet from './bet/AuctionBet';
import VehicleCard from './vehicle/VehicleCard';

const CarDetails: React.FC = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleFollowClick = () => {
    setIsFollowing(prev => !prev);
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000); // 1 сек затримка
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="car-details-wrapper">
      {!loaded && <div className="loading-line" />}
      <div className={`content-wrapper ${loaded ? 'show' : 'hide'}`}>
        <div className='details-title'>
          <p>Title</p>
          <button className="follow-button" onClick={handleFollowClick}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>
        </div>
        <div className="details">
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
            <VehicleCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
