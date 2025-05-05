import React, { useState } from 'react';
import NavItem from "./NavItem";
import styles from "./Navigation.module.scss";
import AuthPanel from '../auth/AuthPanel';
import { useCheckUser } from '../../hock/useCheckUser';
import SettingsPanel from './../pages/settings/SettingsPanel';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const user = useCheckUser();

  const handleLogout = () => {
    localStorage.removeItem('auction_token');
    window.location.reload();
  };

  return (
    <>
      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          <NavItem to="/recomendation" label="Фільтер" />
          <NavItem to="/cars" label="Автомобілі" />
          <NavItem to="/computers" label="Ноутбуки і ПК" />
          <NavItem to="/fashion" label="Мода" />
          <NavItem to="/home" label="Дім" />
        </ul>

        <div className={styles.leftControls}>
          <button className={styles.settingsBtn} onClick={() => setShowSettings(true)}>
            ⚙️
          </button>

          <div className={user ? styles.userBlock : ''}>
          {user ? (
            <>
              <span className={styles.username}>👤 {user}</span>
              <button onClick={handleLogout} className={styles.logoutBtn}>Вийти</button>
            </>
          ) : (
            <>
              <button onClick={() => setIsOpen(true)}>Відкрити реєстрацію</button>
              <AuthPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </>
          )}
        </div>
        <li className={styles.lang}>UA</li>

        </div>

      </nav>

      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
    </>
  );
};

export default Navigation;
