import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.scss';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="app__language-switcher">
      <button
        type="button"
        onClick={() => changeLanguage('fr')}
        className={`language-btn ${i18n.language === 'fr' ? 'active' : ''}`}
        aria-label="Switch to French"
      >
        FR
      </button>
      <span style={{ color: 'var(--gray-color)', fontSize: '0.85rem' }}>|</span>
      <button
        type="button"
        onClick={() => changeLanguage('en')}
        className={`language-btn ${i18n.language === 'en' ? 'active' : ''}`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
