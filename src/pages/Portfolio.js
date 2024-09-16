import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import '../styles/Portfolio.css';
import { useTranslation } from 'react-i18next'; // Importăm hook-ul de traducere

// Importăm imaginile pentru fiecare categorie
import clinicaeng1 from '../assets/clinica/clinicaeng1.png';
import clinicaeng2 from '../assets/clinica/clinicaeng2.png';
import clinicaeng3 from '../assets/clinica/clinicaeng3.png';
import clinicaeng4 from '../assets/clinica/clinicaeng4.png';
import clinicaeng5 from '../assets/clinica/clinicaeng5.png';

import coaforeng1 from '../assets/salon/coaforeng1.png';
import coaforeng2 from '../assets/salon/coaforeng2.png';
import coaforeng3 from '../assets/salon/coaforeng3.png';
import coaforeng4 from '../assets/salon/coaforeng4.png';
import coaforeng5 from '../assets/salon/coaforeng5.png';
import coaforeng6 from '../assets/salon/coaforeng6.png';
import coaforeng7 from '../assets/salon/coaforeng7.png';
import coaforeng8 from '../assets/salon/coaforeng8.png';

import resseng1 from '../assets/restaurant/resseng1.png';
import resseng2 from '../assets/restaurant/resseng2.png';
import resseng3 from '../assets/restaurant/resseng3.png';
import resseng4 from '../assets/restaurant/resseng4.png';
import resseng5 from '../assets/restaurant/resseng5.png';
import resseng6 from '../assets/restaurant/resseng6.png';
import resseng7 from '../assets/restaurant/resseng7.png';

// Noile imagini din meniul restaurantului
import meniu1 from '../assets/restaurant/meniu1.png';
import meniu2 from '../assets/restaurant/meniu2.png';
import meniu3 from '../assets/restaurant/meniu3.png';

import hoteleng1 from '../assets/hotel/hoteleng1.png';
import hoteleng2 from '../assets/hotel/hoteleng2.png';
import hoteleng3 from '../assets/hotel/hoteleng3.png';
import hoteleng4 from '../assets/hotel/hoteleng4.png';
import hoteleng5 from '../assets/hotel/hoteleng5.png';
import hoteleng6 from '../assets/hotel/hoteleng6.png';
import hoteleng7 from '../assets/hotel/hoteleng7.png';
import hoteleng8 from '../assets/hotel/hoteleng8.png';

const Portfolio = () => {
  const { t } = useTranslation(); // Hook-ul de traducere
  const imageRefs = useRef([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]); // Imagini pentru modal
  const [modalImage, setModalImage] = useState(null); // Imaginea principală
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const categories = {
    clinica: [clinicaeng1, clinicaeng2, clinicaeng3, clinicaeng4, clinicaeng5], 
    coafor: [coaforeng1, coaforeng2, coaforeng3, coaforeng4, coaforeng5, coaforeng6, coaforeng7, coaforeng8], 
    restaurant: [resseng1, resseng2, resseng3, resseng4, resseng5, resseng6, resseng7, meniu1, meniu2, meniu3],
    hotel: [hoteleng1, hoteleng2, hoteleng3, hoteleng4, hoteleng5, hoteleng6, hoteleng7, hoteleng8], 
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.pageYOffset * 0.15;
      imageRefs.current.forEach((image, index) => {
        const rotation = index % 2 === 0 ? -5 : 5;
        gsap.to(image, {
          y: -offset,
          rotate: rotation,
          opacity: 1 - offset / 1000,
          ease: 'power1.out',
          duration: 1.5,
        });
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openModal = (category, index) => {
    setModalImages(categories[category]); 
    setModalImage(categories[category][index]); 
    setSelectedImageIndex(index);
    setIsModalOpen(true);
    document.body.classList.add('no-scroll'); 
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove('no-scroll'); 
  };

  const handleNext = () => {
    const nextIndex = (selectedImageIndex + 1) % modalImages.length;
    setSelectedImageIndex(nextIndex);
    setModalImage(modalImages[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = (selectedImageIndex - 1 + modalImages.length) % modalImages.length;
    setSelectedImageIndex(prevIndex);
    setModalImage(modalImages[prevIndex]);
  };

  return (
    <div className="portfolio-container">
      {/* Categoriile */}
      <div className="portfolio-item" ref={el => (imageRefs.current[0] = el)} onClick={() => openModal('clinica', 0)}>
        <img src={clinicaeng1} alt="Dental & Healthcare" />
        <div className="overlay">
          <h2>{t('portofolioPage.clinicaTitle')}</h2>
          <p>{t('portofolioPage.clinicaDescription')}</p>
        </div>
      </div>

      <div className="portfolio-item" ref={el => (imageRefs.current[1] = el)} onClick={() => openModal('coafor', 0)}>
        <img src={coaforeng1} alt="Beauty & Wellness" />
        <div className="overlay">
          <h2>{t('portofolioPage.coaforTitle')}</h2>
          <p>{t('portofolioPage.coaforDescription')}</p>
        </div>
      </div>

      <div className="portfolio-item" ref={el => (imageRefs.current[2] = el)} onClick={() => openModal('restaurant', 0)}>
        <img src={resseng1} alt="Restaurant & Culinary" />
        <div className="overlay">
          <h2>{t('portofolioPage.restaurantTitle')}</h2>
          <p>{t('portofolioPage.restaurantDescription')}</p>
        </div>
      </div>

      <div className="portfolio-item" ref={el => (imageRefs.current[3] = el)} onClick={() => openModal('hotel', 0)}>
        <img src={hoteleng1} alt="Hotel & Hospitality" />
        <div className="overlay">
          <h2>{t('portofolioPage.hotelTitle')}</h2>
          <p>{t('portofolioPage.hotelDescription')}</p>
        </div>
      </div>

      {/* Modal pentru galerie */}
      {isModalOpen && (
        <div className="modal">
          <span className="close" onClick={closeModal}>&times;</span>
          <FontAwesomeIcon icon={faAngleLeft} className="arrow-left" onClick={handlePrev} />
          <img src={modalImage} alt="Modal" className="modal-content" />
          <FontAwesomeIcon icon={faAngleRight} className="arrow-right" onClick={handleNext} />
          <div className="gallery">
            {modalImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                className={`gallery-image ${selectedImageIndex === index ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedImageIndex(index);
                  setModalImage(image);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
