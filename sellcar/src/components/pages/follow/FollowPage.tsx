import React, { useEffect, useState } from 'react';
import Card from '../card/Card';
import { getFollow } from '../../../api/auction';
import { useCheckUser } from '../../../hock/useCheckUser';
import { useLanguage } from '../../../LanguageContext';
import { translations } from '../../../i18n';

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

const FollowPage: React.FC = () => {
  const [auctions, setAuctions] = useState<AuctionItem[]>([]);
  const token = useCheckUser(true);
  const { lang } = useLanguage();
  const t = translations[lang];

  useEffect(() => {
    if (!token) return; // чекаємо, поки токен з'явиться

    const fetchData = async () => {
      try {
        const data = await getFollow(token);  // передаємо токен у getFollow
        console.log(data);
        setAuctions(data);
      } catch (error) {
        console.error('Помилка завантаження аукціонів:', error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="page">
      <section className="recommendations">
        <div className="recommendations-header">{t.subscriptions}</div>
        <div className="cards">
          {auctions.map(auction => (
            <Card key={auction.id} data={auction} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default FollowPage;
