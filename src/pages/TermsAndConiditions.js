import React from 'react';
import { useTranslation } from 'react-i18next'; // Import the hook for translation
import '../styles/Termsandconditions.css'; // Import the CSS file

const TermsAndConditions = () => {
  const { t } = useTranslation(); // Initialize translation hook

  return (
    <div className="terms-container">
      <h1 className="terms-heading">{t('termsPage.title')}</h1>
      <p className="terms-text">{t('termsPage.section1')}</p>
      <p className="terms-text">{t('termsPage.section2')}</p>
      <p className="terms-text">{t('termsPage.section3')}</p>
      <p className="terms-text">{t('termsPage.section4')}</p>
      <p className="terms-text">{t('termsPage.section5')}</p>
      <p className="terms-text">{t('termsPage.section6')}</p>

      <h2 className="terms-subheading">{t('termsPage.campaignTitle')}</h2>
      <p className="terms-text">{t('termsPage.campaignText')}</p>

      <h2 className="terms-subheading">{t('termsPage.confidentialityTitle')}</h2>
      <p className="terms-text">{t('termsPage.confidentialityText')}</p>

      <h2 className="terms-subheading">{t('termsPage.cookiesTitle')}</h2>
      <p className="terms-text">{t('termsPage.cookiesText')}</p>

      <h2 className="terms-subheading">{t('termsPage.personalInfoTitle')}</h2>
      <p className="terms-text">{t('termsPage.personalInfoText')}</p>

      <h2 className="terms-subheading">{t('termsPage.otherSitesTitle')}</h2>
      <p className="terms-text">{t('termsPage.otherSitesText')}</p>
    </div>
  );
};

export default TermsAndConditions;
