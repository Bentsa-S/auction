import React, { useEffect, useState } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Bet.css';

interface AuctionBetleProps {
  bid: number;
  startTime: string;
  durationMinutes: number;
  minBid: number;
  currentUserBid: number;
  totalPrice: number;
}

const Bet: React.FC<AuctionBetleProps> = ({
  bid,
  startTime,
  durationMinutes,
  minBid,
  currentUserBid,
  totalPrice,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = new Date(startTime).getTime();
    const end = start + durationMinutes * 60 * 1000;

    const interval = setInterval(() => {
      const now = Date.now();
      if (now < start) {
        setProgress(0);
      } else if (now >= end) {
        setProgress(100);
        clearInterval(interval);
      } else {
        const percent = ((now - start) / (end - start)) * 100;
        setProgress(percent);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, durationMinutes]);

  return (
    <div className="auction-bet-container">
      <div className="auction-bet-start-time">
        <div>Початок ставки: {new Date(startTime).toLocaleString()}</div>
      </div>

      <div className="auction-bet-progress-wrapper">
        <div className="auction-bet-progress">
          <CircularProgressbarWithChildren
            value={progress}
            styles={buildStyles({
              pathColor: '#4B7BE5',
              trailColor: '#ddd',
            })}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/92/Flag_of_New_Jersey.svg"
              alt="NJ"
            />
            <div className="auction-bet-progress-title">New Jersey</div>
            <div className="auction-bet-progress-bid">${bid.toLocaleString()}</div>
            <div className="auction-bet-progress-description">Bid!</div>
          </CircularProgressbarWithChildren>
        </div>
      </div>

      <div className="auction-bet-button-container">
        <button className="auction-bet-button">
          Поставити мінімальний хід: ${minBid}
        </button>
        <div className="auction-bet-actions-wrapper">
          <button className="auction-bet-action-button">
            Зробити ставку на
          </button>
          <div className="auction-bet-current-bid">
            ${currentUserBid}
          </div>
        </div>
      </div>

      <div className="auction-bet-total-price">
        Ціна з усіма налогами і комісіями: <b>${totalPrice.toLocaleString()}</b>
      </div>
    </div>
  );
};

export default Bet;
