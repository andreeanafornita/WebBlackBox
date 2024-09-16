import React from 'react';
import { useTranslation } from 'react-i18next'; // Import the translation hook
import '../styles/MessageAboveForm.css'; // Import the CSS file

export default function MessageAboveForm() {
  const { t } = useTranslation(); // Initialize the translation hook

  return (
    <div className="message-above-form-message-container">
      <h2 className="message-above-form-message-text">
        {t('messageAboveForm.message')}
      </h2>
    </div>
  );
}
