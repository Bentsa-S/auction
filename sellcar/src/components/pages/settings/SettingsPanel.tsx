import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SettingsPanel.css';
import { readableColor } from 'polished';
import { useLanguage } from '../../../LanguageContext';
import { translations } from '../../../i18n';

interface Props {
  onClose: () => void;
}

const colorPresets = ['#f1c40f', '#2ecc71', '#2980b9'];

const themePresets = {
  light: {
    '--main-color': '#f0cb3a',
    '--text-color': '#111',
    '--text-color-on-white': '#111',
    '--background': '#fff',
  },
  dark: {
    '--main-color': '#f0cb3a',
    '--text-color': '#fff',
    '--text-color-on-white': '#fff',
    '--background': '#181818',
  },
};

const SettingsPanel: React.FC<Props> = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [customColor, setCustomColor] = useState('#2980b9');
  const [theme, setTheme] = useState<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  );
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = translations[lang];

  const handleClose = () => {
    setIsClosing(true);
  };

  function goToPage(path: string) {
    setIsClosing(true);
    setTimeout(() => {
      navigate(path);
    }, 300);
  }

  const applyTheme = (themeName: 'light' | 'dark') => {
    const themeVars = themePresets[themeName];
    Object.entries(themeVars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
    document.body.style.background = themeVars['--background'];
    localStorage.setItem('theme', themeName);
    setTheme(themeName);
    // Оновити текстовий колір під custom main color
    const mainColor = localStorage.getItem('mainColor') || themeVars['--main-color'];
    changeColor(mainColor, false); // не зберігати в localStorage повторно
  };

  const changeColor = (color: string, save = true) => {
    document.documentElement.style.setProperty('--main-color', color);
    if (save) localStorage.setItem('mainColor', color);
    setCustomColor(color);
  
    const textColor = readableColor(color, theme === 'dark' ? '#fff' : '#111', theme === 'dark' ? '#111' : '#fff');
    document.documentElement.style.setProperty('--text-color', textColor);
    localStorage.setItem('textColor', textColor);
  };
  
  useEffect(() => {
    // Ініціалізація теми та кольору
    applyTheme(theme);
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

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = e.target.value as 'light' | 'dark';
    applyTheme(selectedTheme);
  };

  return (
    <div className={`overlay ${isClosing ? 'overlayClosing' : ''}`} onClick={handleClose}>
      <div
        className={`panel ${isClosing ? 'panelClosing' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="closeBtn" onClick={handleClose}>✖</button>
        <h2 className="panel-title">{t.settings}</h2>

        <button className="profile-button" onClick={() => goToPage('/profile')}>
          {t.profile}
        </button>
        <button className="profile-button" onClick={() => goToPage('/add')}>
          {t.createAuction}
        </button>

        <div className='theme-container'>
          <h3>{t.theme}</h3>
          <select className="theme-select" value={theme} onChange={handleThemeChange}>
            <option value="light">{t.light}</option>
            <option value="dark">{t.dark}</option>
          </select>
        </div>

        <h3 className="section-title">{t.colorChoice}</h3>
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

        <h3 className="section-title">{t.customColor}</h3>
        <input
          type="color"
          className="color-picker"
          value={customColor}
          onChange={(e) => changeColor(e.target.value)}
        />

        <button className="logout-button">{t.logout}</button>
      </div>
    </div>
  );
};

export default SettingsPanel;