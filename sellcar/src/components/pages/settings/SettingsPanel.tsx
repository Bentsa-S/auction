import React from 'react';
import './SettingsPanel.css';

interface Props {
  onClose: () => void;
}

const SettingsPanel: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="overlay">
      <div className="panel">
        <button className="closeBtn" onClick={onClose}>✖</button>
        <h2>Налаштування сайту</h2>
        <p>Тут будуть ваші опції налаштувань</p>
        {/* Додай тут контент */}
      </div>
    </div>
  );
};

export default SettingsPanel;
