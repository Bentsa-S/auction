import React, { useState } from 'react';
import styles from "./Navigation.module.scss";
import AuthPanel from '../auth/AuthPanel';
import { useCheckUser } from '../../hock/useCheckUser';
import SettingsPanel from './../pages/settings/SettingsPanel';
import { NavLink } from 'react-router-dom';
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
        <button
          className={`${styles.burger} ${showSettings ? styles.active : ''}`}
          onClick={() => setShowSettings(!showSettings)}
          aria-label="Toggle settings"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

          <NavLink
            to={'/'}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Про нас
          </NavLink>
          <NavLink
            to={'/recomendation'}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Рекомендаціі
          </NavLink>
          <NavLink
            to={'/follow'}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            підписки
          </NavLink>
        </ul>

        <div className={styles.leftControls}>
        <div className={styles.lang}>UA</div>

          <div className={user ? styles.userBlock : ''}>
          {user ? (
            <>
              <span className={styles.username}>👤 {user}</span>
              <button onClick={handleLogout} className={styles.registerButton}>Вийти</button>
            </>
          ) : (
            <>
              <button className={styles.registerButton} onClick={() => setIsOpen(true)}>Відкрити реєстрацію</button>
              <AuthPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </>
          )}
        </div>
        </div>

      </nav>

      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
    </>
  );
};

export default Navigation;
