import React, { useState, useEffect } from 'react';
import img from '../../../assets/car.png';
import './CarDetails.css';
import ImegeSlider from './slider/ImageSlider';
import AuctionBet from './bet/AuctionBet';
import {VehicleCard} from './vehicle/VehicleCard';
import { followAuction, getAuctionById, unfollowAuction } from '../../../api/auction';
import { useParams } from 'react-router-dom';
import { useCheckUser } from '../../../hock/useCheckUser';
import { useLanguage } from '../../../LanguageContext';
import { translations } from '../../../i18n';

const CarDetails: React.FC = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [auctionData, setAuctionData] = useState<any>(null);

  const { id } = useParams();
  const auctionId = Number(id);
  const token = useCheckUser(true);
  const { lang } = useLanguage();
  const t = translations[lang];

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const numberId = parseInt(id);
          const data = await getAuctionById(numberId);
          console.log(data);
          
          setAuctionData(data[0]);
        } catch (err) {
          console.error('Помилка завантаження аукціону:', err);
        }
      }
    };
    fetchData();
  }, [id]);

  const handleFollowClick = async () => {
    setIsLoading(true);
    try {
      if (isFollowing) {
        if (token) {
          await unfollowAuction(auctionId, token);
        }
      } else {
        if (token) {
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
        {auctionData && (
          <>
            <div className="details-title">
              <p>{auctionData.title}</p>
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
                  bid={auctionData.curr_price}
                  startTime={auctionData.created_at}
                  durationMinutes={30}
                  minBid={auctionData.step_bit}
                  currentUserBid={100}
                  totalPrice={auctionData.curr_price + auctionData.step_bit}
                />
              </div>
              <div className="right-section">
                <VehicleCard description={auctionData.description} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CarDetails;
