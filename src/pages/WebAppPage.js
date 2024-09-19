// WebAppPage.js

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCode,
  faProjectDiagram,
  faMobileAlt,
  faDatabase,
  faCheck,
  faArrowRight,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Slide } from 'react-awesome-reveal';
import { useTranslation } from 'react-i18next';

// Import all images
import iph1 from '../assets/iph2.png';
import iph2 from '../assets/iph3.png';
import iph3 from '../assets/iph4.png';

export default function WebAppPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [modalImage, setModalImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Create an array of images
  const images = [iph1, iph2, iph3];

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle navigation to the portfolio page
  const handleNavigateToPortfolio = () => {
    navigate('/portfolio');
  };

  // Handle navigation to the contact page
  const handleNavigateToContact = () => {
    navigate('/contact');
  };

  // Open the modal to display images
  const openImageModal = (index) => {
    setModalImages(images);
    setModalImage(images[index]);
    setSelectedImageIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
    document.body.style.overflowX = 'hidden';
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
    setSelectedImageIndex(0);
    document.body.style.overflow = 'auto';
    document.body.style.overflowX = 'hidden';
  };

  // Navigation functions
  const handleNext = () => {
    const nextIndex = (selectedImageIndex + 1) % modalImages.length;
    setSelectedImageIndex(nextIndex);
    setModalImage(modalImages[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex =
      (selectedImageIndex - 1 + modalImages.length) % modalImages.length;
    setSelectedImageIndex(prevIndex);
    setModalImage(modalImages[prevIndex]);
  };

  // Intersection observer hooks
  const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true });
  const { ref: portfolioRef, inView: portfolioInView } = useInView({ triggerOnce: true });
  const { ref: processRef, inView: processInView } = useInView({ triggerOnce: true });
  const { ref: benefitsRef, inView: benefitsInView } = useInView({ triggerOnce: true });
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({ triggerOnce: true });
  const { ref: faqRef, inView: faqInView } = useInView({ triggerOnce: true });
  const { ref: footerRef, inView: footerInView } = useInView({ triggerOnce: true });

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
      fontSize: isSmallScreen ? '3.5rem' : '5.5rem',
    },
    headerSection: {
      textAlign: 'center',
      padding: '3rem 0',
      borderBottom: '1px solid #333',
    },
    headerTitle: {
      fontSize: isSmallScreen ? '2rem' : '4rem',
      marginBottom: '1rem',
    },
    headerSubtitle: {
      fontSize: isSmallScreen ? '1.5rem' : '2rem',
      marginBottom: '5rem',
    },
    ctaButton: {
      backgroundColor: '#ae8507',
      color: 'white',
      padding: '1rem 2rem',
      border: 'none',
      borderRadius: '5px',
      fontSize: isSmallScreen ? '1.5rem' : '2rem',
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
      fontSize: isSmallScreen ? '2rem' : '2.5rem',
      marginBottom: '5rem',
      marginTop: '5rem',
      textAlign: 'center',
    },
    portfolioGrid: {
      display: 'flex',
      justifyContent: isSmallScreen ? 'flex-start' : 'center',
      gap: '1rem',
      marginBottom: '1rem',
      width: '100%',
      flexWrap: isSmallScreen ? 'nowrap' : 'nowrap',
    },
    portfolioImage: {
      minWidth: '250px',
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
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '1rem',
    },
    modalContent: {
      position: 'relative',
      width: '100%',
      maxWidth: '800px',
      maxHeight: '90%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    modalImage: {
      width: '100%',
      height: 'auto',
      maxHeight: '70vh',
      objectFit: 'contain',
    },
    closeButton: {
      position: 'absolute',
      top: '10px',
      right: '-30px',
      background: 'transparent',
      border: 'none',
      color: '#ae8507',
      fontSize: '3rem',
      cursor: 'pointer',
    },
    arrow: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '5rem',
      color: '#ae8507',
      cursor: 'pointer',
      zIndex: 1001,
    },
    gallery: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '1rem',
      gap: '0.5rem',
      overflowY: 'auto',
      maxHeight: '100px',
    },
    galleryImage: {
      width: '80px',
      height: '60px',
      objectFit: 'cover',
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
      alignItems: 'flex-start',
      flexDirection: isSmallScreen ? 'column' : 'row',
    },
    step: {
      width: isSmallScreen ? '100%' : '22%',
      textAlign: 'center',
      marginLeft: isSmallScreen ? '2rem' : '2rem',
    },
    stepTitle: {
      marginBottom: '1rem',
      minHeight: '5.5rem',
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
      fontSize: isSmallScreen ? '1.5rem' : '2rem',
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
      flexDirection: isSmallScreen ? 'column' : 'row',
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
    clientName: {
      fontWeight: 'bold',
      marginTop: '0.5rem',
      fontSize: '1.5rem',
    },
    testimonialText: {
      fontStyle: 'italic',
      marginBottom: '1rem',
      fontSize: '1.5rem',
    },
    faqSection: {
      padding: '3rem 0',
      marginRight: '2.5rem',
      marginLeft: '2.5rem',
    },
    faqItem: {
      marginBottom: '1.5rem',
      fontSize: isSmallScreen ? '1.5rem' : '2rem',
    },
    footer: {
      textAlign: 'center',
      padding: '2rem 0',
      borderTop: '1px solid #333',
      fontSize: isSmallScreen ? '1.5rem' : '2.5rem',
      marginBottom: '10rem',
      marginTop: '10rem',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.mainTitle}>{t('webAppPage.title')}</h1>

      {/* Header Section */}
      <section
        ref={headerRef}
        style={{
          ...styles.headerSection,
          opacity: headerInView ? 1 : 0,
          transition: 'opacity 1s ease-in',
        }}
      >
        <h1 style={styles.headerTitle}>
          <span>{t('webAppPage.subtitle1')}</span>
          <br />
          <span>{t('webAppPage.subtitle2')}</span>
        </h1>
        <p style={styles.headerSubtitle}>{t('webAppPage.description')}</p>
        <button style={styles.ctaButton} onClick={handleNavigateToContact}>
          {t('webAppPage.ctaButton')}
        </button>
      </section>

      {/* Portfolio Section */}
      <section
        ref={portfolioRef}
        style={{
          ...styles.portfolioSection,
          opacity: portfolioInView ? 1 : 0,
          transition: 'opacity 1s ease-in',
        }}
      >
        <h2 style={styles.sectionTitle}>{t('webAppPage.portfolioTitle')}</h2>
        <div
          style={{
            ...styles.portfolioGrid,
            overflowX: isSmallScreen ? 'auto' : 'hidden',
          }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Web Application ${index + 1}`}
              style={styles.portfolioImage}
              onClick={() => openImageModal(index)}
            />
          ))}
        </div>
        <p style={styles.portfolioLink} onClick={handleNavigateToPortfolio}>
          {t('webAppPage.viewAllProjects')}
        </p>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeButton} onClick={closeModal}>
              &times;
            </button>
            <FontAwesomeIcon
              icon={faAngleLeft}
              onClick={handlePrev}
              style={{ ...styles.arrow, left: '10px' }}
            />
            <img src={modalImage} alt="Enlarged View" style={styles.modalImage} />
            <FontAwesomeIcon
              icon={faAngleRight}
              onClick={handleNext}
              style={{ ...styles.arrow, right: '10px' }}
            />
            <div style={styles.gallery}>
              {modalImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  style={{
                    ...styles.galleryImage,
                    border:
                      selectedImageIndex === index ? '2px solid #ae8507' : 'none',
                  }}
                  onClick={() => {
                    setSelectedImageIndex(index);
                    setModalImage(image);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Process Section */}
      <section
        ref={processRef}
        style={{
          ...styles.processSection,
          opacity: processInView ? 1 : 0,
          transition: 'opacity 1s ease-in',
        }}
      >
        <h2 style={styles.sectionTitle}>{t('webAppPage.processTitle')}</h2>
        <div style={styles.processSteps}>
          <div style={styles.step}>
            <FontAwesomeIcon icon={faProjectDiagram} size="2x" color="#ae8507" />
            <h3 style={styles.stepTitle}>{t('webAppPage.requirementAnalysis')}</h3>
            <p style={styles.stepText}>{t('webAppPage.requirementAnalysisDescription')}</p>
          </div>
          <div style={styles.step}>
            <FontAwesomeIcon icon={faCode} size="2x" color="#ae8507" />
            <h3 style={styles.stepTitle}>{t('webAppPage.designDevelopment')}</h3>
            <p style={styles.stepText}>{t('webAppPage.designDevelopmentDescription')}</p>
          </div>
          <div style={styles.step}>
            <FontAwesomeIcon icon={faMobileAlt} size="2x" color="#ae8507" />
            <h3 style={styles.stepTitle}>{t('webAppPage.mobileResponsiveness')}</h3>
            <p style={styles.stepText}>{t('webAppPage.mobileResponsivenessDescription')}</p>
          </div>
          <div style={styles.step}>
            <FontAwesomeIcon icon={faDatabase} size="2x" color="#ae8507" />
            <h3 style={styles.stepTitle}>{t('webAppPage.databaseIntegration')}</h3>
            <p style={styles.stepText}>{t('webAppPage.databaseIntegrationDescription')}</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        ref={benefitsRef}
        style={{
          ...styles.benefitsSection,
          opacity: benefitsInView ? 1 : 0,
          transition: 'opacity 1s ease-in',
        }}
      >
        <h2 style={styles.sectionTitle}>{t('webAppPage.benefitsTitle')}</h2>
        <ul style={styles.benefitsList}>
          <li>
            <FontAwesomeIcon
              icon={faCheck}
              size="1x"
              color="#ae8507"
              style={{ marginRight: '10px' }}
            />
            {t('webAppPage.benefit1')}
          </li>
          <li>
            <FontAwesomeIcon
              icon={faCheck}
              size="1x"
              color="#ae8507"
              style={{ marginRight: '10px' }}
            />
            {t('webAppPage.benefit2')}
          </li>
          <li>
            <FontAwesomeIcon
              icon={faCheck}
              size="1x"
              color="#ae8507"
              style={{ marginRight: '10px' }}
            />
            {t('webAppPage.benefit3')}
          </li>
          <li>
            <FontAwesomeIcon
              icon={faCheck}
              size="1x"
              color="#ae8507"
              style={{ marginRight: '10px' }}
            />
            {t('webAppPage.benefit4')}
          </li>
        </ul>
      </section>

      {/* Testimonials Section */}
      <section
        ref={testimonialsRef}
        style={{
          ...styles.testimonialsSection,
          opacity: testimonialsInView ? 1 : 0,
          transition: 'opacity 1s ease-in',
        }}
      >
        <h2 style={styles.sectionTitle}>{t('webAppPage.testimonialsTitle')}</h2>
        <div style={styles.testimonialGrid}>
          <Slide direction="left" triggerOnce>
            <div style={styles.testimonial}>
              <p style={styles.testimonialText}>{t('webAppPage.testimonial1Text')}</p>
              <p style={styles.clientName}>{t('webAppPage.testimonial1Author')}</p>
            </div>
          </Slide>
          <Slide direction="right" triggerOnce>
            <div style={styles.testimonial}>
              <p style={styles.testimonialText}>{t('webAppPage.testimonial2Text')}</p>
              <p style={styles.clientName}>{t('webAppPage.testimonial2Author')}</p>
            </div>
          </Slide>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        ref={faqRef}
        style={{
          ...styles.faqSection,
          opacity: faqInView ? 1 : 0,
          transition: 'opacity 1s ease-in',
        }}
      >
        <h2 style={styles.sectionTitle}>{t('webAppPage.faqTitle')}</h2>
        <div style={styles.faqItem}>
          <h3>{t('webAppPage.faq1Question')}</h3>
          <p>
            <FontAwesomeIcon
              icon={faArrowRight}
              size="1x"
              color="#ae8507"
              style={{ marginRight: '10px' }}
            />
            {t('webAppPage.faq1Answer')}
          </p>
        </div>
        <div style={styles.faqItem}>
          <h3>{t('webAppPage.faq2Question')}</h3>
          <p>
            <FontAwesomeIcon
              icon={faArrowRight}
              size="1x"
              color="#ae8507"
              style={{ marginRight: '10px' }}
            />
            {t('webAppPage.faq2Answer')}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer
        ref={footerRef}
        style={{
          ...styles.footer,
          opacity: footerInView ? 1 : 0,
          transition: 'opacity 1s ease-in',
        }}
      >
        <p>{t('webAppPage.footerText')}</p>
        <button style={styles.ctaButton} onClick={handleNavigateToContact}>
          {t('webAppPage.ctaButton')}
        </button>
      </footer>
    </div>
  );
}
