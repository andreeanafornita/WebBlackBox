import React, { useState, useEffect, useRef } from 'react';
import '../styles/Contact.css';
import gsap from 'gsap'; // Importăm GSAP pentru animații
import emailjs from 'emailjs-com'; // Importăm EmailJS
import IntroText from '../components/IntroText'; // Importăm componenta IntroText
import Socials from '../components/Socials'; // Importăm componenta Socials
import { useTranslation } from 'react-i18next'; // Importăm hook-ul de traducere

// Componenta pentru mesaje de avertizare
function WarningMessage({ message }) {
  return (
    <div className="warning-message">
      <p>{message}</p>
    </div>
  );
}

export default function ContactPage() {
  const { t } = useTranslation(); // Hook-ul de traducere
  const [isAgreedToTerms, setIsAgreedToTerms] = useState(false);
  const [isAgreedToCampaigns, setIsAgreedToCampaigns] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [formSent, setFormSent] = useState(false); // Verificăm dacă formularul a fost trimis

  // Creăm referințe pentru elementele ce vor fi animate
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const getInTouchRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    // Animație GSAP pentru toate elementele din pagina de contact
    gsap.fromTo(
      [titleRef.current, subtitleRef.current, emailRef.current, phoneRef.current, getInTouchRef.current, formRef.current],
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 2, ease: 'power2.out', stagger: 0.2 }
    );
  }, []);

  useEffect(() => {
    if (showWarning) {
      const timer = setTimeout(() => {
        setShowWarning(false);
      }, 3000); // Ascunde mesajul după 3 secunde

      return () => clearTimeout(timer); // Curăță timeout-ul dacă componenta este demontată
    }
  }, [showWarning]);

  // Funcție pentru trimiterea emailului cu EmailJS
  const sendEmail = (e) => {
    e.preventDefault();

    if (!isAgreedToTerms) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
  
      // Colectează datele din formular
      const templateParams = {
        from_name: e.target.email.value,  // Numele sau email-ul expeditorului
        subject: e.target.subject.value,  // Subiectul mesajului
        message: e.target.message.value,  // Mesajul propriu-zis
        to_name: 'WebBlackBox',   // Numele destinatarului
        reply_to: e.target.email.value    // Email-ul la care să se răspundă
      };
  
      emailjs.send(
        'service_oiq8uxa',   // Service ID-ul tău
        'template_duz21fu',  // Template ID-ul tău
        templateParams,
        '3faYT6apdGer9QmCS'  // Public Key-ul tău
      )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setFormSent(true); // Setăm formularul ca fiind trimis
      }, (error) => {
        console.log('FAILED...', error);
      });
    }
  };

  return (
    <div className="contactus-page">
      <section className="contactus-hero">
        <div className="contactus-hero-content">
          <h1 className="contactus-hero-title" ref={titleRef}>
            {t('contactPage.title')}
          </h1>
          <p className="contactus-hero-subtitle" ref={subtitleRef}>
            {t('contactPage.subtitle')}
          </p>

          {/* Container pentru informațiile de contact */}
          <div className="contactus-info-container">
            <p className="contactus-info" ref={emailRef}>
              {t('contactPage.email')}: toma@webblackbox.com
            </p>
            <p className="contactus-info" ref={emailRef}>
              {t('contactPage.email')}: daniela@webblackbox.com
            </p>
            <p className="contactus-info" ref={phoneRef}>
              {t('contactPage.phone')}: +40 (0)738159969
            </p>
            <h2 className="contactus-getintouch" ref={getInTouchRef}>
              {t('contactPage.getInTouch')}
            </h2>
          </div>
        </div>
      </section>

      <section className="contactus-form" ref={formRef}>
        <IntroText />
        
        {/* Verificăm dacă formularul a fost trimis cu succes */}
        {!formSent ? (
          <form onSubmit={sendEmail}> {/* Înlocuim handleSubmit cu sendEmail */}
            <label htmlFor="email">{t('contactPage.form.email')}:</label>
            <input type="email" id="email" name="email" placeholder={t('contactPage.form.emailPlaceholder')} required />

            <label htmlFor="subject">{t('contactPage.form.subject')}:</label>
            <input type="text" id="subject" name="subject" placeholder={t('contactPage.form.subjectPlaceholder')} required />

            <label htmlFor="message">{t('contactPage.form.message')}:</label>
            <textarea id="message" name="message" placeholder={t('contactPage.form.messagePlaceholder')} required></textarea>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="terms"
                checked={isAgreedToTerms}
                onChange={() => setIsAgreedToTerms(!isAgreedToTerms)}
              />
              <label htmlFor="terms">
                {t('contactPage.form.terms')}
              </label>
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="campaigns"
                checked={isAgreedToCampaigns}
                onChange={() => setIsAgreedToCampaigns(!isAgreedToCampaigns)}
              />
              <label htmlFor="campaigns">
                {t('contactPage.form.campaigns')}
              </label>
            </div>

            {showWarning && <WarningMessage message={t('contactPage.warning')} />}

            <button type="submit" className="submit-button">
              {t('contactPage.form.submit')}
            </button>
          </form>
        ) : (
          <p className="thank-you-message">{t('contactPage.form.successMessage')}</p> // Afișăm un mesaj de succes
        )}
      </section>

      <Socials />
    </div>
  );
}
