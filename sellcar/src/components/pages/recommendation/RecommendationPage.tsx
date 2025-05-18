import React, { useEffect, useState } from 'react';

import './RecommendationPage.css';
import Card from '../card/Card';
import FilterPanel from './filter/FilterPanel';
import { getAddAuction } from '../../../api/auction';

interface AuctionCard {
  id: number;
  title: string;
  description: string;
  finish_at: string;
}

const RecommendationPage: React.FC = () => {
  const [auction, setAuction] = useState<AuctionCard[]>([]);

  useEffect(() => {
    const fetchAuction = async () => {
      const a = await getAddAuction();
      setAuction(a);
    };
  
    fetchAuction();
  }, []);
  
  return (
    <div className="page">
      <FilterPanel/>

      <section className="recommendations">
        <div className="recommendations-header">Рекомендації</div>

        <div className="cards">
          {
            auction && auction.length > 0 && auction.map((card) => (
              <Card
                key={card.id}
                id={card.id}
                title={card.title}
                description={card.description}
                finish_at={card.finish_at}
              />
            ))
          }
        </div>
      </section>
    </div>
  );
};

export default RecommendationPage;
