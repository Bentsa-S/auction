import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import 'react-circular-progressbar/dist/styles.css';
import './AuctionBet.css';
import { useCheckUser } from '../../../../hock/useCheckUser';

interface AuctionBetProps {
  bid: number;
  startTime: string;
  durationMinutes: number;
  minBid: number;
  currentUserBid: number;
  totalPrice: number;
}

type AuctionMessage =
  | { type: 'new_bid'; amount: number }
  | { type: string; [key: string]: any };

const AuctionBet: React.FC<AuctionBetProps> = ({
  bid,
  startTime,
  durationMinutes,
  minBid,
  currentUserBid,
  totalPrice,
}) => {
  const { id } = useParams<{ id: string }>();
  const auctionId = parseInt(id || '0', 10);

  const [progress, setProgress] = useState(0);
  const [currentBid, setCurrentBid] = useState(bid);

  const token = useCheckUser(true)
  const socketUrl = `ws://localhost:8000/bit?id=${auctionId}&token=${token}`;

  const {
    sendJsonMessage,
    lastJsonMessage,
    readyState,
  } = useWebSocket<AuctionMessage>(socketUrl, {
    shouldReconnect: () => true,
  });

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

  useEffect(() => {
    if (lastJsonMessage?.type === 'new_bid') {
      setCurrentBid(lastJsonMessage.amount);
    }
  }, [lastJsonMessage]);

  const sendBid = () => {
    const newBid = currentUserBid + minBid;
    sendJsonMessage({ type: 'place_bid', amount: newBid });
  };

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
              style={{ width: 40 }}
            />
            <div className="auction-bet-progress-title">New Jersey</div>
            <div className="auction-bet-progress-bid">${currentBid.toLocaleString()}</div>
            <div className="auction-bet-progress-description">Bid!</div>
          </CircularProgressbarWithChildren>
        </div>
      </div>

      <div className="auction-bet-button-container">
        <button className="auction-bet-button" onClick={sendBid}>
          Поставити мінімальний хід: ${minBid}
        </button>
        <div className="auction-bet-actions-wrapper">
          <button className="auction-bet-action-button" onClick={sendBid}>
            Зробити ставку на
          </button>
          <div className="auction-bet-current-bid">${currentUserBid}</div>
        </div>
      </div>

      <div className="auction-bet-total-price">
        Ціна з усіма налогами і комісіями: <b>${totalPrice.toLocaleString()}</b>
      </div>

      <div className="auction-bet-status">
        Статус WebSocket: <b>{ReadyState[readyState]}</b>
      </div>
    </div>
  );
};

export default AuctionBet;
