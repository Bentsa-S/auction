import React, { useEffect, useState } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './DemonstretionBet.css';
import { useLanguage } from '../../../../../LanguageContext';
import { translations } from '../../../../../i18n';

interface AuctionBetleProps {
  bid: number;
  startTime: string;
  durationMinutes: number;
  minBid: number;
  currentUserBid: number;
  totalPrice: number;
}

const DemonstrationBet: React.FC<AuctionBetleProps> = ({
  bid,
  startTime,
  durationMinutes,
  minBid,
  currentUserBid,
  totalPrice,
}) => {
  const [progress, setProgress] = useState(0);
  const { lang } = useLanguage();
  const t = translations[lang];

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
        <div>{t.betStart}: {new Date(startTime).toLocaleString()}</div>
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
            <div className="auction-bet-progress-description">{t.bid}</div>
          </CircularProgressbarWithChildren>
        </div>
      </div>

      <div className="auction-bet-button-container">
        <button className="auction-bet-button">
          {t.placeMinBid}: ${minBid}
        </button>
        <div className="auction-bet-actions-wrapper">
          <button className="auction-bet-action-button">
            {t.placeBidOn}
          </button>
          <div className="auction-bet-current-bid">
            ${currentUserBid}
          </div>
        </div>
      </div>

      <div className="auction-bet-total-price">
        {t.totalPrice}: <b>${totalPrice.toLocaleString()}</b>
      </div>
    </div>
  );
};

export default DemonstrationBet;
