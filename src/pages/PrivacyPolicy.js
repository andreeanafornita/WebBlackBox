import React from 'react';
import { useTranslation } from 'react-i18next'; // Import the hook for translation
import '../styles/Termsandconditions.css'; // Import the CSS file

const PrivacyPolicy = () => {
  const { t } = useTranslation(); // Initialize translation hook

  return (
    <div className="terms-container">
      <h1 className="terms-heading">{t('privacyPolicyPage.title')}</h1>
      
      <p className="terms-text">{t('privacyPolicyPage.section1')}</p>
      <p className="terms-text">{t('privacyPolicyPage.section2')}</p>
      <p className="terms-text">{t('privacyPolicyPage.section3')}</p>
      <ul className="terms-list">
        <li>{t('privacyPolicyPage.rightToBeInformed')}</li>
        <li>{t('privacyPolicyPage.rightOfAccess')}</li>
        <li>{t('privacyPolicyPage.rightToIntervene')}</li>
      </ul>
      <p className="terms-text">{t('privacyPolicyPage.section4')}</p>

      <h2 className="terms-subheading">{t('privacyPolicyPage.informationCollectionTitle')}</h2>
      <p className="terms-text">{t('privacyPolicyPage.informationCollectionText')}</p>

      <h2 className="terms-subheading">{t('privacyPolicyPage.useOfInformationTitle')}</h2>
      <p className="terms-text">{t('privacyPolicyPage.useOfInformationText')}</p>
      <ul className="terms-list">
        <li>{t('privacyPolicyPage.useOfInformationPoint1')}</li>
        <li>{t('privacyPolicyPage.useOfInformationPoint2')}</li>
        <li>{t('privacyPolicyPage.useOfInformationPoint3')}</li>
      </ul>

      <h2 className="terms-subheading">{t('privacyPolicyPage.ecommercePrivacyTitle')}</h2>
      <p className="terms-text">{t('privacyPolicyPage.ecommercePrivacyText')}</p>

      <h2 className="terms-subheading">{t('privacyPolicyPage.thirdPartyDisclosureTitle')}</h2>
      <p className="terms-text">{t('privacyPolicyPage.thirdPartyDisclosureText')}</p>
      <p className="terms-text">{t('privacyPolicyPage.thirdPartyLegalText')}</p>

      <h2 className="terms-subheading">{t('privacyPolicyPage.informationProtectionTitle')}</h2>
      <p className="terms-text">{t('privacyPolicyPage.informationProtectionText')}</p>

      <h2 className="terms-subheading">{t('privacyPolicyPage.cookiesTitle')}</h2>
      <p className="terms-text">{t('privacyPolicyPage.cookiesText')}</p>

      <h2 className="terms-subheading">{t('privacyPolicyPage.consentTitle')}</h2>
      <p className="terms-text">{t('privacyPolicyPage.consentText')}</p>
      <p className="terms-text">{t('privacyPolicyPage.contactUsText')}</p>
      <p className="terms-text">{t('privacyPolicyPage.confirmationText')}</p>
    </div>
  );
};

export default PrivacyPolicy;
