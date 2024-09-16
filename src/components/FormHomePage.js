import React, { useState, useEffect } from 'react';
import '../styles/FormHomePage.css'; // Import new CSS file
import { useTranslation } from 'react-i18next'; // Translation hook
import emailjs from 'emailjs-com'; // Import EmailJS

export default function NewForm() {
  const { t } = useTranslation();
  const [isAgreedToTerms, setIsAgreedToTerms] = useState(false);
  const [isAgreedToCampaigns, setIsAgreedToCampaigns] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000); // Hide alert after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAgreedToTerms) {
      setShowAlert(true); // Show alert if terms checkbox is not checked
    } else {
      setShowAlert(false);

      // Colectează datele din formular
      const formData = {
        from_name: e.target['newform-email'].value,
        subject: e.target['newform-subject'].value,
        message: e.target['newform-message'].value,
      };

      // Trimitere e-mail cu EmailJS
      emailjs.send('service_oiq8uxa', 'template_duz21fu', formData, '3faYT6apdGer9QmCS')
        .then((result) => {
          console.log('Email sent successfully:', result.text);
          setFormSuccess(true); // Afișează mesaj de succes
        })
        .catch((error) => {
          console.error('Error sending email:', error);
        });
    }
  };

  return (
    <div className="newform-container">
      <form className="newform-form" onSubmit={handleSubmit}>
        <label htmlFor="newform-email">{t('newForm.email')}:</label>
        <input type="email" id="newform-email" placeholder={t('newForm.emailPlaceholder')} required />

        <label htmlFor="newform-subject">{t('newForm.subject')}:</label>
        <input type="text" id="newform-subject" placeholder={t('newForm.subjectPlaceholder')} required />

        <label htmlFor="newform-message">{t('newForm.message')}:</label>
        <textarea id="newform-message" placeholder={t('newForm.messagePlaceholder')} required></textarea>

        {/* Checkbox with alert */}
        <div className="newform-checkbox-group">
          <div className="newform-checkbox">
            <input
              type="checkbox"
              id="newform-terms"
              checked={isAgreedToTerms}
              onChange={() => setIsAgreedToTerms(!isAgreedToTerms)}
            />
          </div>
          <div className="newform-label">
            <label htmlFor="newform-terms">{t('newForm.terms')}</label>
          </div>
        </div>

        <div className="newform-checkbox-group">
          <div className="newform-checkbox">
            <input
              type="checkbox"
              id="newform-campaigns"
              checked={isAgreedToCampaigns}
              onChange={() => setIsAgreedToCampaigns(!isAgreedToCampaigns)}
            />
          </div>
          <div className="newform-label">
            <label htmlFor="newform-campaigns">{t('newForm.campaigns')}</label>
          </div>
        </div>

        {showAlert && (
          <div className="custom-alert">
            {t('newForm.alertMessage')}
          </div>
        )}

        {formSuccess && (
          <div className="custom-alert">
            {t('newForm.successMessage')}
          </div>
        )}

        <button type="submit" className="newform-submit-button">
          {t('newForm.submit')}
        </button>
      </form>
    </div>
  );
}
