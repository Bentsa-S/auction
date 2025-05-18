import React, { useEffect, useState } from 'react';
import './RecommendationPage.css';
import Card from '../card/Card';
import FilterPanel from './filter/FilterPanel';
import { getAuction } from '../../../api/auction';

interface AuctionItem {
  id: number;
  description: string;
  curr_price: number;
  created_at: string;
  finish_at: string;
  id_user: number;
  srart_price: number;
  title: string;
  step_bit: number;
}

interface FilterData {
  categorie?: string;
  to?: string;
}

const RecommendationPage: React.FC = () => {
  const [auctions, setAuctions] = useState<AuctionItem[]>([]);

  const fetchFilteredAuctions = async (filters: FilterData) => {
    const params = new URLSearchParams();
    if (filters.categorie) params.append('categorie', filters.categorie);
    if (filters.to) params.append('to', filters.to);

    try {
      const response = await fetch(`http://127.0.0.1:8000/get_filter_auction?${params.toString()}`);
      const data = await response.json();
      setAuctions(data);
    } catch (err) {
      console.error('Помилка фільтрації аукціонів:', err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAuction();
        console.log(data);
        
        setAuctions(data);
      } catch (error) {
        console.error('Помилка завантаження аукціонів:', error);
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <div className="page">
      <FilterPanel onFilter={fetchFilteredAuctions} />

      <section className="recommendations">
        <div className="recommendations-header">Рекомендації</div>
        <div className="cards">
          {auctions.map(auction => (
            <Card key={auction.id} data={auction} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default RecommendationPage;
