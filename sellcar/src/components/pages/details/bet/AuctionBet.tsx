import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
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

interface AuctionMessage {
  type: string;
  amount?: number;
}

const AuctionBet: React.FC<AuctionBetProps> = ({
  bid,
  startTime,
  durationMinutes,
  minBid,
  currentUserBid,
}) => {
  const { id } = useParams<{ id: string }>();
  const auctionId = parseInt(id || '0', 10);
  const token = useCheckUser(true);

  const [progress, setProgress] = useState(0);
  const [currentBid, setCurrentBid] = useState(bid);

  const [bidInput, setBidInput] = useState('');

  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const wsUrl = `ws://localhost:8000/bit?id=${auctionId}&token=${token}`;
    const ws = new WebSocket(wsUrl);
    socketRef.current = ws;

    ws.onopen = () => {
      console.log('[WebSocket] Connected');
    };

    ws.onmessage = (event) => {
      const message = event.data as string;
      try {
        const parsed: AuctionMessage = JSON.parse(message);

        switch (parsed.type) {
          case 'new_bid':
            if (parsed.amount !== undefined) {
              setCurrentBid(parsed.amount);
            }
            break;
          default:
            break;
        }
      } catch {
        // Якщо це не JSON — обробляємо як рядок, шукаємо цифру
        const match = /Bit now:\s*(\d+)/i.exec(message);
        if (match) {
          const amount = Number(match[1]);
          if (!isNaN(amount)) {
            setCurrentBid(amount);
          }
        }
      }
    };

    ws.onerror = (err) => {
      console.error('[WebSocket] Error:', err);
    };

    ws.onclose = () => {
      console.log('[WebSocket] Connection closed');
    };

    return () => {
      ws.close();
    };
  }, [auctionId, token]);

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

  function handleBid(){
    const amount = Number(bidInput);
    if (isNaN(amount) || amount < minBid) {
      alert(`Введіть коректну ставку не менше ${minBid}`);
      return;
    }
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      alert('WebSocket не підключений');
      return;
    }
    console.log(socketRef.current);
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      console.log(amount);
      console.log(typeof amount.toString());
      
      
      socketRef.current.send(amount.toString());
      console.log('[WebSocket] Sent:', amount);
    }

    setBidInput('');
  };

  return (
    <div className="auction-bet-container">
      <div className="auction-bet-start-time">
        Початок ставки: {new Date(startTime).toLocaleString()}
      </div>

      <div className="auction-bet-progress-wrapper">
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

      <div className="auction-bet-input-container">
        <input
          type="text"
          value={bidInput}
          onChange={(e) => setBidInput(e.target.value)}
        />
        <button
          className="auction-bet-button"
          onClick={handleBid}
        >
          Відправити ставку
        </button>
      </div>
    </div>
  );
};

export default AuctionBet;
