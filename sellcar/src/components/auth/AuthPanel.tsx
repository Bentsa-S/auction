import React from 'react';
import './AuthPanel.css';
import { useAuthForm } from '../../hock/useAuthForm';
import { postLogin, postRegistration } from '../../api/user';
import { useNavigate } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AuthPanel: React.FC<Props> = ({ isOpen, onClose }) => {
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
        localStorage.setItem('auction_token', userData);
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
        <h2 className="auth-title">{isLogin ? 'Вхід' : 'Реєстрація'}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (  
            <input
              className="auth-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}
          <input
            className="auth-input"
            type="text"
            placeholder="Ім’я"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!isLogin && (
            <input
              className="auth-input"
              type="password"
              placeholder="Повторіть пароль"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}
          <button className="auth-submit-btn" type="submit">{isLogin ? 'Увійти' : 'Зареєструватися'}</button>
        </form>

        <div className="toggle-text">
          {isLogin ? (
            <>
              Немає акаунту? <button className="auth-toggle-btn" onClick={toggleMode}>Зареєструйтесь</button>
            </>
          ) : (
            <>
              Вже є акаунт? <button className="auth-toggle-btn" onClick={toggleMode}>Увійдіть</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPanel;
