import React from 'react';
import './CabinetPage.css';
import Card from './card/Card';

const CabinetPage: React.FC = () => {
  return (
    <div className="cabinet-container">
      <h2 className="title">Створення аукціон карточки</h2>

      <div className="form-group">
        <label className="label">Редагувати нікнейм</label>
        <input type="text" defaultValue="vasa vasulov" />
      </div>

      <div className="form-group">
        <label className="label">Зброс пароля</label>
        <div className="password-fields">
          <div>
            <label>Старий пароль</label>
            <input type="password" defaultValue="vasa vasulov" />
          </div>
          <div>
            <label>Новий пароль</label>
            <input type="password" defaultValue="vasa vasulov" />
          </div>
        </div>
      </div>

      <h2 className="title">Ваші активні ставки</h2>

      <div className="empty-message">Покищо у вас нічого немає</div>
      
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
