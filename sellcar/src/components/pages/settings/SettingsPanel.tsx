import React, { useEffect, useState } from 'react';
import './SettingsPanel.css';

interface Props {
  onClose: () => void;
}

const SettingsPanel: React.FC<Props> = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
  };

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        onClose();
      }, 300); // тривалість анімації
      return () => clearTimeout(timer);
    }
  }, [isClosing, onClose]);

  return (
    <div className={`overlay ${isClosing ? 'overlayClosing' : ''}`} onClick={handleClose}>
      <div
        className={`panel ${isClosing ? 'panelClosing' : ''}`}
        onClick={(e) => e.stopPropagation()} // щоб клік по панелі не закривав
      >
        <button className="closeBtn" onClick={handleClose}>✖</button>
        <h2>Налаштування сайту</h2>
        <p>Тут будуть ваші опції налаштувань</p>
      </div>
    </div>
  );
};

export default SettingsPanel;
