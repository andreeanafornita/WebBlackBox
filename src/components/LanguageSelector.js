import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import ukFlag from '../assets/flags/eng.png';
import roFlag from '../assets/flags/ro.png';
import '../styles/LanguageSelector.css'; // Import scoped CSS

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('selectedLanguage', lng);
    setShowLangDropdown(false); // Close dropdown after selecting language
    window.location.reload(); // Force reload to apply language across the page
  };

  const currentLang = i18n.language === 'ro' ? 'Română' : 'English';
  const oppositeLang = i18n.language === 'ro' ? 'English' : 'Română';
  const oppositeFlag = i18n.language === 'ro' ? ukFlag : roFlag;

  return (
    <div
      className="language-selector"
      onMouseEnter={() => setShowLangDropdown(true)}
      onMouseLeave={() => setShowLangDropdown(false)}
    >
      <img src={i18n.language === 'ro' ? roFlag : ukFlag} alt={`${currentLang} Flag`} className="flag" />
      <span className="lang-text">{currentLang}</span>
      <FontAwesomeIcon icon={faAngleDown} className="lang-dropdown-icon" />
      {showLangDropdown && (
        <div className="lang-dropdown">
          <div className="lang-option" onClick={() => changeLanguage(i18n.language === 'ro' ? 'en' : 'ro')}>
            <img src={oppositeFlag} alt={`${oppositeLang} Flag`} className="flag" />
            {oppositeLang}
          </div>
        </div>
      )}
    </div>
  );
}
