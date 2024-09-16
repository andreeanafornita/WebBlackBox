import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; // Import the translation hook
import '../styles/CookieBanner.css'; // Import the CSS file

const CookieBanner = () => {
  const { t } = useTranslation(); // Initialize the translation hook
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookiePreference = localStorage.getItem('cookiePreference');
    if (!cookiePreference) {
      setIsVisible(true); // Show banner only if no preference is saved
    }
  }, []);

  const handleAcceptAll = () => {
    // Set all cookies and hide the banner
    localStorage.setItem('cookiePreference', 'all'); // Save preference in localStorage
    setIsVisible(false); // Hide the banner
  };

  const handleAcceptNecessary = () => {
    // Set only necessary cookies and hide the banner
    localStorage.setItem('cookiePreference', 'necessary'); // Save preference in localStorage
    setIsVisible(false); // Hide the banner
  };

  const handleDecline = () => {
    // Decline cookies and hide the banner
    localStorage.setItem('cookiePreference', 'decline'); // Save preference in localStorage
    setIsVisible(false); // Hide the banner
  };

  if (!isVisible) {
    return null; // If not visible, render nothing
  }

  return (
    <div className="cookie-banner">
      <div className="cookie-banner-text">
        {t('cookieBanner.message')}{' '}
        <a href="/privacypolicy" style={{ color: '#ae8507' }}>
          {t('cookieBanner.policy')}
        </a>.
      </div>
      <div className="cookie-banner-buttons">
        <button className="cookie-banner-button" onClick={handleAcceptAll}>
          {t('cookieBanner.acceptAll')}
        </button>
        <button className="cookie-banner-button" onClick={handleAcceptNecessary}>
          {t('cookieBanner.acceptNecessary')}
        </button>
        <button className="cookie-banner-button decline" onClick={handleDecline}>
          {t('cookieBanner.decline')}
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
