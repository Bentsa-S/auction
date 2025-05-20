import React from 'react';
import './AuthPanel.css';
import { useAuthForm } from '../../hock/useAuthForm';
import { postLogin, postRegistration } from '../../api/user';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../LanguageContext';
import { translations } from '../../i18n';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (token: string) => void;
}

const AuthPanel: React.FC<Props> = ({ isOpen, onClose, onLogin }) => {
  const {
    isLogin,
    toggleMode,
    name, setName,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    validateForm
  } = useAuthForm();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = translations[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
  
    try {
      let userData;
      if (isLogin) {
        userData = await postLogin({ name: name, password });
      } else {
        userData = await postRegistration({ email, password, name });
      }
  
      if (userData) {
        onLogin(userData);  // Передаємо токен наверх в Navigation
        navigate('/'); 
        onClose();
      }
    } catch (error) {
      console.error('Помилка автентифікації:', error);
      alert('Щось пішло не так');
    }
  };
  
  return (
    <div className={`auth-overlay ${isOpen ? 'show' : ''}`}>
      <div className="auth-modal">
        <button className="auth-close-btn" onClick={onClose}>×</button>
        <h2 className="auth-title">{isLogin ? t.login : t.register}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (  
            <input
              className="auth-input"
              type="email"
              placeholder={t.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}
          <input
            className="auth-input"
            type="text"
            placeholder={t.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="auth-input"
            type="password"
            placeholder={t.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!isLogin && (
            <input
              className="auth-input"
              type="password"
              placeholder={t.repeatPassword}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}
          <button className="auth-submit-btn" type="submit">{isLogin ? t.login : t.register}</button>
        </form>

        <div className="toggle-text">
          {isLogin ? (
            <>
              {t.noAccount} <button className="auth-toggle-btn" onClick={toggleMode}>{t.registerNow}</button>
            </>
          ) : (
            <>
              {t.haveAccount} <button className="auth-toggle-btn" onClick={toggleMode}>{t.loginNow}</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPanel;
