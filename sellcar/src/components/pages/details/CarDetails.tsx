import React from 'react';
import img from '../../../assets/car.png'
import './CarDetails.css';
import ImegeSlider from './slider/ImageSlider';
import AuctionBet from './bet/AuctionBet';
import VehicleCard from './vehicle/VehicleCard';

const CarDetails: React.FC = () => {

  return (
    <div>
        <div className='car-title'>
            <p>Title</p>
        </div>
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
    </div>
  );
};

export default CarDetails;
