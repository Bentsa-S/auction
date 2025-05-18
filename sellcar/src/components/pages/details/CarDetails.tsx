import React, { useState, useEffect } from 'react';
import img from '../../../assets/car.png';
import './CarDetails.css';
import ImegeSlider from './slider/ImageSlider';
import AuctionBet from './bet/AuctionBet';
import VehicleCard from './vehicle/VehicleCard';
import { followAuction, unfollowAuction } from '../../../api/auction';
import { useParams } from 'react-router-dom';
import { useCheckUser } from '../../../hock/useCheckUser';
import { useLanguage } from '../../../LanguageContext';
import { translations } from '../../../i18n';

const CarDetails: React.FC = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const auctionId = Number(id);
  const token = useCheckUser(true)
  const { lang } = useLanguage();
  const t = translations[lang];

  const handleFollowClick = async () => {
    setIsLoading(true);
    try {
      if (isFollowing) {
        if(token){
          await unfollowAuction(auctionId, token);
        }
      } else {
        if(token){
          await followAuction(auctionId, token);
        }
      }
      setIsFollowing(prev => !prev);
    } catch (error) {
      console.error("Помилка при зміні підписки:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="car-details-wrapper">
      {!loaded && <div className="loading-line" />}
      <div className={`content-wrapper ${loaded ? 'show' : 'hide'}`}>
        <div className='details-title'>
          <p>{t.title}</p>
          <button className='follow-button' onClick={handleFollowClick} disabled={isLoading}>
            {isLoading
              ? t.loading
              : isFollowing
                ? t.unfollow
                : t.follow}
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
