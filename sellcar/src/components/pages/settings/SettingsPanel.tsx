import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SettingsPanel.css';

interface Props {
  onClose: () => void;
}

const colorPresets = ['#f1c40f', '#2ecc71', '#2980b9'];

const SettingsPanel: React.FC<Props> = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [customColor, setCustomColor] = useState('#2980b9');
  const navigate = useNavigate();

  const handleClose = () => {
    setIsClosing(true);
  };

  const goToProfile = () => {
    setIsClosing(true);
    setTimeout(() => {
      navigate('/profile');
    }, 300);
  };

  const changeColor = (color: string) => {
    document.documentElement.style.setProperty('--main-color', color);
    localStorage.setItem('mainColor', color);
    setCustomColor(color);
  };

  useEffect(() => {
    const savedColor = localStorage.getItem('mainColor');
    if (savedColor) {
      changeColor(savedColor);
    }
  }, []);

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        onClose();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isClosing, onClose]);

  return (
    <div className={`overlay ${isClosing ? 'overlayClosing' : ''}`} onClick={handleClose}>
      <div
        className={`panel ${isClosing ? 'panelClosing' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="closeBtn" onClick={handleClose}>✖</button>
        <h2 className="panel-title">Налаштування</h2>

        <button className="profile-button" onClick={goToProfile}>
          Особистий кабінет
        </button>

        <div className='theme-container'>
          <h3>Тема</h3>
          <select className="theme-select">
            <option>Світла</option>
            <option>Темна</option>
          </select>
        </div>

        <h3 className="section-title">Вибір кольору</h3>
        <div className="color-options">
          {colorPresets.map((color) => (
            <button
              key={color}
              className="color-button"
              style={{ backgroundColor: color }}
              onClick={() => changeColor(color)}
            />
          ))}
        </div>

        <h3 className="section-title">Власний колір</h3>
        <input
          type="color"
          className="color-picker"
          value={customColor}
          onChange={(e) => changeColor(e.target.value)}
        />

        <button className="logout-button">Вийти</button>
      </div>
    </div>
  );
};


export default SettingsPanel