import React, { useState, useEffect } from 'react';
import styles from "./Navigation.module.scss";
import AuthPanel from '../auth/AuthPanel';
import { useLanguage } from "../../LanguageContext";
import { translations } from "../../i18n";
import { NavLink } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import SettingsPanel from '../pages/settings/SettingsPanel';

interface JwtPayload {
  name?: string;
  username?: string;
  [key: string]: any;
}

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  const { lang, setLang } = useLanguage();
  const t = translations[lang];

  useEffect(() => {
    const token = localStorage.getItem('auction_token');
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setUser(decoded.username || decoded.name || null);
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auction_token');
    setUser(null);
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
            {t.about}
          </NavLink>
          <NavLink
            to={'/recomendation'}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            {t.recommendations}
          </NavLink>
          <NavLink
            to={'/follow'}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            {t.subscriptions}
          </NavLink>
        </ul>

        <div className={styles.leftControls}>
          <button onClick={() => setLang(lang === "ua" ? "en" : "ua")} className={styles.lang}>
            {lang === "ua" ? "EN" : "UA"}
          </button>

          <div className={user ? styles.userBlock : ''}>
            {user ? (
              <>
                <span className={styles.username}>{user}</span>
                <button onClick={handleLogout} className={styles.registerButton}>{t.logout}</button>
              </>
            ) : (
              <>
                <button className={styles.registerButton} onClick={() => setIsOpen(true)}>{t.openRegistration}</button>
                <AuthPanel
                  isOpen={isOpen}
                  onClose={() => setIsOpen(false)}
                  onLogin={(token: string) => {
                    localStorage.setItem('auction_token', token);
                    try {
                      const decoded = jwtDecode<JwtPayload>(token);
                      setUser(decoded.username || decoded.name || null);
                    } catch {
                      setUser(null);
                    }
                  }}
                />
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
