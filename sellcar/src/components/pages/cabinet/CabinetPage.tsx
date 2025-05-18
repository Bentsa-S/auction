import React from 'react';
import './CabinetPage.css';
import Card from './card/Card';
import { useLanguage } from '../../../LanguageContext';
import { translations } from '../../../i18n';

const CabinetPage: React.FC = () => {
  const { lang } = useLanguage();
  const t = translations[lang];
  return (
    <div className="cabinet-container">
      <h2 className="title">{t.createAuctionCard}</h2>

      <div className="form-group">
        <label className="label">{t.editNickname}</label>
        <input type="text" defaultValue="vasa vasulov" />
      </div>

      <div className="form-group">
        <label className="label">{t.resetPassword}</label>
        <div className="password-fields">
          <div>
            <label>{t.oldPassword}</label>
            <input type="password" defaultValue="vasa vasulov" />
          </div>
          <div>
            <label>{t.newPassword}</label>
            <input type="password" defaultValue="vasa vasulov" />
          </div>
        </div>
      </div>

      <h2 className="title">{t.activeBids}</h2>

      <div className="empty-message">{t.noItems}</div>
      
      <Card
        imageUrl="https://via.placeholder.com/150"
        title="Тайтл"
        description="машина просто шик згорівший утопленик. Побумагх не бита не крашена…"
        startDate="12/12/2024"
        endDate="12/12/2024"
        id='1'
        />

    </div>
  );
};

export default CabinetPage;
