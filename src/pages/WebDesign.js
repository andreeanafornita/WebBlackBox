import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette, faPencilRuler, faCode, faPaintBrush, faCheck, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Fade, Slide } from 'react-awesome-reveal';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

import clinicaeng1 from '../assets/clinica/clinicaeng1.png';
import coaforeng1 from '../assets/salon/coaforeng1.png';
import hoteleng1 from '../assets/hotel/hoteleng1.png';

export default function WebDesign() {
  const navigate = useNavigate();
  const { t } = useTranslation(); // Initialize the translation hook

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const styles = {
    container: {
      color: 'white',
      backgroundColor: '#000',
      padding: isSmallScreen ? '1rem' : '2rem',
      lineHeight: '1.6',
      overflowX: 'hidden',
    },
    mainTitle: {
      color: '#ae8507',
      textAlign: 'center',
      marginBottom: '2rem',
      fontSize: isSmallScreen?'3.5rem':'5.5rem',
    },
    headerSection: {
      textAlign: 'center',
      padding: '3rem 0',
      borderBottom: '1px solid #333',
    },
    headerTitle: {
      fontSize: isSmallScreen?'2rem':'4rem',
      marginBottom: '1rem',
    },
    headerSubtitle: {
      fontSize: isSmallScreen?'1.5rem':'2rem',
      marginBottom: '5rem',
    },
    ctaButton: {
      backgroundColor: '#ae8507',
      color: 'white',
      padding: '1rem 2rem',
      border: 'none',
      borderRadius: '5px',
      fontSize: isSmallScreen?'1.5rem':'2rem',
      cursor: 'pointer',
      marginBottom: '5rem',
    },
    portfolioSection: {
      padding: '3rem 0',
      textAlign: 'center',
      fontSize: '1.5rem',
      marginBottom: '5rem',
      marginTop: '5rem',
      overflowX: 'hidden',
    },
    sectionTitle: {
      fontSize: isSmallScreen?'2rem':'2.5rem',
      marginBottom: '5rem',
      marginTop: '5rem',
      textAlign: 'center',
    },
    portfolioGrid: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      marginBottom: '1rem',
      width: '100%',
    },
    portfolioImage: {
      width: '250px',
      height: '150px',
      objectFit: 'cover',
      cursor: 'pointer',
    },
    portfolioLink: {
      color: '#ae8507',
      cursor: 'pointer',
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modalContent: {
      position: 'relative',
      width: '80%',
      maxWidth: '800px',
      maxHeight: '90%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalImage: {
      width: '100%',
      height: 'auto',
    },
    closeButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: 'transparent',
      border: 'none',
      color: '#fff',
      fontSize: '3rem',
      cursor: 'pointer',
    },
    processSection: {
      padding: '3rem 0',
      backgroundColor: '#000000',
      borderRadius: '10px',
      fontSize: '1.5rem',
      marginBottom: '5rem',
      marginTop: '5rem',
      marginRight: '2rem',
    },
    processSteps: {
      display: 'flex',
      justifyContent: isSmallScreen ? 'center' : 'space-between',
      gap: '2rem',
      marginTop: '2rem',
      alignItems: 'flex-start', // Aligns all items to the top
      flexDirection: isSmallScreen ? 'column' : 'row',
    },
    step: {
      width: isSmallScreen ? '100%' : '22%', // Full width on small screens
      textAlign: 'center',
      marginLeft:'2rem',
    },
    stepTitle: {
      marginBottom: '1rem',
      minHeight: '5.5rem', // Ensures all titles have the same height
    },
    stepText: {
      textAlign: 'left',
      margin: '0 auto',
    },
    benefitsSection: {
      padding: '3rem 0',
      textAlign: 'center',
    },
    benefitsList: {
      listStyleType: 'none',
      padding: 0,
      marginTop: '1rem',
      lineHeight: '2.5',
      fontSize: isSmallScreen?'1.5rem':'2rem',
      marginBottom: '5rem',
      marginTop: '5rem',
    },
    testimonialsSection: {
      padding: '3rem 0',
      backgroundColor: '#222',
      borderRadius: '10px',
    },
    testimonialGrid: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginTop: '3rem',
    },
    testimonial: {
      textAlign: 'center',
      margin: '1rem',
      padding: '1rem',
      borderRadius: '10px',
      backgroundColor: '#333',
      color: '#fff',
      maxWidth: '300px',
      fontSize: isSmallScreen ? '1.5rem' : '2rem',

    },
    clientImage: {
      borderRadius: '50%',
      width: '80px',
      height: '80px',
      marginBottom: '1rem',
    },
    testimonialText: {
      fontStyle: 'italic',
      marginBottom: '1rem',
      fontSize: '1.5rem',
    },
    clientName: {
      fontWeight: 'bold',
      marginTop: '0.5rem',
      fontSize: '1.5rem',
    },
    faqSection: {
      padding: '3rem 0',
      marginRight: '2.5rem',
      marginLeft: '2.5rem',
    },
    faqItem: {
      marginBottom: '1.5rem',
      fontSize: isSmallScreen?'1.5rem':'2rem',

    },
    footer: {
      textAlign: 'center',
      padding: '2rem 0',
      borderTop: '1px solid #333',
      fontSize: isSmallScreen?'1.5rem':'2.5rem',
      marginBottom: '10rem',
      marginTop: '10rem',
    },
  };
  
  const handleNavigateToPortfolio = () => {
    navigate('/portfolio');
    
  };

  const handleNavigateToContact = () => {
    navigate('/contact');
    
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
    document.body.style.overflowX = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
    document.body.style.overflowX = 'hidden';
  };

  const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true });
  const { ref: portfolioRef, inView: portfolioInView } = useInView({ triggerOnce: true });
  const { ref: processRef, inView: processInView } = useInView({ triggerOnce: true });
  const { ref: benefitsRef, inView: benefitsInView } = useInView({ triggerOnce: true });
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({ triggerOnce: true });
  const { ref: faqRef, inView: faqInView } = useInView({ triggerOnce: true });
  const { ref: footerRef, inView: footerInView } = useInView({ triggerOnce: true });

  return (
    <div style={styles.container}>
      <h1 style={styles.mainTitle}>{t("webDesignPage.title")}</h1>

      <section
        ref={headerRef}
        style={{
          ...styles.headerSection,
          opacity: headerInView ? 1 : 0,
          transition: 'opacity 1s ease-in',
        }}
      >
        <h1 style={styles.headerTitle}>
          <span>{t("webDesignPage.subTitle")}</span>
        </h1>
        <p style={styles.headerSubtitle}>
          {t("webDesignPage.description")}
        </p>
        <button style={styles.ctaButton} onClick={handleNavigateToContact}>
          {t("webDesignPage.ctaButton")}
        </button>
      </section>

      <section
        ref={portfolioRef}
        style={{
          ...styles.portfolioSection,
          opacity: portfolioInView ? 1 : 0,
          transition: 'opacity 1s ease-in',
          overflowX: isSmallScreen ? 'auto' : 'visible',
        }}
      >
        <h2 style={styles.sectionTitle}>{t("webDesignPage.portfolioTitle")}</h2>
        <div
          style={{
            ...styles.portfolioGrid,
            display: isSmallScreen ? 'flex' : 'flex',
            overflowX: isSmallScreen ? 'scroll' : 'hidden',
            whiteSpace: isSmallScreen ? 'nowrap' : 'normal',
          }}
        >
          <img src={clinicaeng1} alt="Web Design Project 1" style={styles.portfolioImage} onClick={() => openImageModal(clinicaeng1)} />
          <img src={coaforeng1} alt="Web Design Project 2" style={styles.portfolioImage} onClick={() => openImageModal(coaforeng1)} />
          <img src={hoteleng1} alt="Web Design Project 3" style={styles.portfolioImage} onClick={() => openImageModal(hoteleng1)} />
        </div>
        <p style={styles.portfolioLink} onClick={handleNavigateToPortfolio}>{t("webDesignPage.viewAllDesigns")}</p>
      </section>

      {isModalOpen && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Enlarged View" style={styles.modalImage} />
            <button style={styles.closeButton} onClick={closeModal}>
              &times;
            </button>
          </div>
        </div>
      )}

      <section
        ref={processRef}
        style={{
          ...styles.processSection,
          opacity: processInView ? 1 : 0,
          transition: 'opacity 1s ease-in',
        }}
      >
        <h2 style={styles.sectionTitle}>{t("webDesignPage.processTitle")}</h2>
        <div style={styles.processSteps}>
          <div style={styles.step}>
            <FontAwesomeIcon icon={faPalette} size="2x" color="#ae8507" />
            <h3 style={styles.stepTitle}>{t("webDesignPage.research")}</h3>
            <p style={styles.stepText}>
              {t("webDesignPage.researchDescription")}
            </p>
          </div>
          <div style={styles.step}>
            <FontAwesomeIcon icon={faPencilRuler} size="2x" color="#ae8507" />
            <h3 style={styles.stepTitle}>{t("webDesignPage.wireframing")}</h3>
            <p style={styles.stepText}>
              {t("webDesignPage.wireframingDescription")}
            </p>
          </div>
          <div style={styles.step}>
            <FontAwesomeIcon icon={faCode} size="2x" color="#ae8507" />
            <h3 style={styles.stepTitle}>{t("webDesignPage.designDevelopment")}</h3>
            <p style={styles.stepText}>
              {t("webDesignPage.designDevelopmentDescription")}
            </p>
          </div>
          <div style={styles.step}>
            <FontAwesomeIcon icon={faPaintBrush} size="2x" color="#ae8507" />
            <h3 style={styles.stepTitle}>{t("webDesignPage.branding")}</h3>
            <p style={styles.stepText}>
              {t("webDesignPage.brandingDescription")}
            </p>
          </div>
          <div style={styles.step}>
            <FontAwesomeIcon icon={faCheck} size="2x" color="#ae8507" />
            <h3 style={styles.stepTitle}>{t("webDesignPage.testingLaunch")}</h3>
            <p style={styles.stepText}>
              {t("webDesignPage.testingLaunchDescription")}
            </p>
          </div>
        </div>
      </section>

      <section
        ref={benefitsRef}
        style={{
          ...styles.benefitsSection,
          opacity: benefitsInView ? 1 : 0,
          transition: 'opacity 1s ease-in',
        }}
      >
        <h2 style={styles.sectionTitle}>{t("webDesignPage.whyChooseUs")}</h2>
        <ul style={styles.benefitsList}>
          <li>
            <FontAwesomeIcon icon={faCheck} size="1x" color="#ae8507" style={{ marginRight: '10px' }} />
            {t("webDesignPage.creativeDesigns")}
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} size="1x" color="#ae8507" style={{ marginRight: '10px' }} />
            {t("webDesignPage.mobileFirst")}
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} size="1x" color="#ae8507" style={{ marginRight: '10px' }} />
            {t("webDesignPage.seoFriendly")}
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} size="1x" color="#ae8507" style={{ marginRight: '10px' }} />
            {t("webDesignPage.support")}
          </li>
        </ul>
      </section>

      <section
  ref={testimonialsRef}
  style={{
    ...styles.testimonialsSection,
    opacity: testimonialsInView ? 1 : 0,
    transition: 'opacity 1s ease-in',
  }}
>
  <h2 style={styles.sectionTitle}>{t("webDesignPage.testimonialsTitle")}</h2>
  <div style={styles.testimonialGrid}>
    <Slide direction="left" triggerOnce>
      <div style={styles.testimonial}>
        <p style={styles.testimonialText}>
          {t("webDesignPage.testimonial1Text")}
        </p>
        <p style={styles.clientName}>
          {t("webDesignPage.testimonial1Author")}
        </p>
      </div>
    </Slide>
    <Slide direction="right" triggerOnce>
      <div style={styles.testimonial}>
        <p style={styles.testimonialText}>
          {t("webDesignPage.testimonial2Text")}
        </p>
        <p style={styles.clientName}>
          {t("webDesignPage.testimonial2Author")}
        </p>
      </div>
    </Slide>
  </div>
</section>


      <section
        ref={faqRef}
        style={{
          ...styles.faqSection,
          opacity: faqInView ? 1 : 0,
          transition: 'opacity 1s ease-in',
        }}
      >
        <h2 style={styles.sectionTitle}>{t("webDesignPage.faqTitle")}</h2>
        <div style={styles.faqItem}>
          <h3>{t("webDesignPage.faq1Question")}</h3>
          <p>
            <FontAwesomeIcon icon={faArrowRight} size="1x" color="#ae8507" style={{ marginRight: '10px' }} />
            {t("webDesignPage.faq1Answer")}
          </p>
        </div>
        <div style={styles.faqItem}>
          <h3>{t("webDesignPage.faq2Question")}</h3>
          <p>
            <FontAwesomeIcon icon={faArrowRight} size="1x" color="#ae8507" style={{ marginRight: '10px' }} />
            {t("webDesignPage.faq2Answer")}
          </p>
        </div>
      </section>

      <footer
        ref={footerRef}
        style={{
          ...styles.footer,
          opacity: footerInView ? 1 : 0,
          transition: 'opacity 1s ease-in',
        }}
      >
        <p>{t("webDesignPage.footerText")}</p>
        <button style={styles.ctaButton} onClick={handleNavigateToContact}>
          {t("webDesignPage.ctaButton")}
        </button>
      </footer>
    </div>
  );
}

