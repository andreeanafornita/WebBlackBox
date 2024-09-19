import React, { useEffect, useRef, useState } from 'react';
import '../styles/HomePage.css';
import RotatingNetworkSphere from '../components/RotatingNetworkSphere';
import InteractiveGoldenButton from '../components/InteractiveGoldenButton';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OurMissionHP from '../components/OurMissionHP';
import { useTranslation } from 'react-i18next'; // Hook pentru traduceri
import NewForm from '../components/FormHomePage';
import MessageAboveForm from '../components/MessageAboveForm';
// Import images
import imacImage from '../assets/imac.png';
import macbookImage from '../assets/macbook.png';
import phoneImage from '../assets/iphone.png';
import codingimg from '../assets/codingimg.jpg';
import webdesignimg from '../assets/webdesignimg.jpg';
import ecomimg from '../assets/ecomimg.jpg';
import arhivimg from '../assets/arhivimg.jpg';
import image from '../assets/homePage/hard.png';
import AnimatedComponent from '../components/AnimatedComponent';
import { faPhone, faLaptopCode, faRocket, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'; // Importăm Link pentru navigare

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const { t } = useTranslation(); // Hook pentru traduceri

  const imacRef = useRef(null);
  const macbookRef = useRef(null);
  const phoneRef = useRef(null);
  const textRef = useRef(null);
  const animatedTextRows = useRef([]); 
  const leftCardsRef = useRef([]); 
  const rightCardsRef = useRef([]); 
  const ourMissionRef = useRef(null); 
  const headlineRef = useRef(null);
  const owtsRef = useRef(null);
  const [isOwtsVisible, setIsOwtsVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      ScrollTrigger.refresh();  // Recalculează dimensiunile pentru animații
    }, 500);  // Delay mic pentru a permite încărcarea completă
  }, []);
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    // Funcție pentru a verifica dacă un element există și are metoda getBoundingClientRect
    const isValidElement = (element) => element && element.current && typeof element.current.getBoundingClientRect === 'function';
  
    if (isValidElement(macbookRef) && isValidElement(imacRef) && isValidElement(phoneRef) && isValidElement(textRef)) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: macbookRef.current,
          start: 'top bottom-=100px',
          end: 'top center',
          scrub: isMobile ? 0.3 : 0.5,
          toggleActions: 'play none none reverse',
        },
      });
  
      const duration = isMobile ? 0.5 : 1;
  
      tl.fromTo(
        macbookRef.current,
        { x: '-100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: duration, ease: 'power2.out' }
      )
        .fromTo(
          imacRef.current,
          { x: '-100%', opacity: 0 },
          { x: '0%', opacity: 1, duration: duration, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo(
          phoneRef.current,
          { y: '100%', opacity: 0 },
          { y: '0%', opacity: 1, duration: duration, ease: 'power2.out' },
          '-=0.3'
        );
  
      gsap.fromTo(
        textRef.current,
        { x: isMobile ? '0%' : '100%', opacity: 0 },
        {
          x: '0%',
          opacity: 1,
          duration: duration,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: isMobile ? textRef.current : macbookRef.current,
            start: 'top bottom-=50px',
            end: 'top center',
            scrub: isMobile ? 0.2 : 0.5,
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    const textTl = gsap.timeline();
    textTl
      .fromTo(
        animatedTextRows.current,
        {
          opacity: 0,
          scale: 0.5,
          rotationX: -30,
          y: 100,
          transformOrigin: 'center center',
        },
        {
          opacity: 1,
          scale: 1,
          rotationX: 0,
          y: 0,
          stagger: 0.3,
          ease: 'elastic.out(1, 0.5)',
        }
      )
      .to(animatedTextRows.current, {
        duration: 2,
        text: {
          value: (index) => (index === 0 ? "B.a.k" : index === 1 ? "O." : "I.t.rn.t"),
          delimiter: '',
        },
        color: '#f4e285',
        stagger: 0.2,
        ease: 'none',
      })
      .to(animatedTextRows.current, {
        duration: 1,
        text: {
          value: (index) => (index === 0 ? "Black" : index === 1 ? "Of" : "Internet"),
          delimiter: '',
        },
        color: '#ffffff',
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        y: 0,
        ease: 'power2.out',
        stagger: 0.2,
      });

    gsap.fromTo(
      leftCardsRef.current,
      { x: '-100vw', opacity: 0 },
      {
        x: '0%',
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.ourServicesHP-section',
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(
      rightCardsRef.current,
      { x: '100vw', opacity: 0 },
      {
        x: '0%',
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.ourServicesHP-section',
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );  

    gsap.timeline({
      scrollTrigger: {
        trigger: ourMissionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      }
    })
    .to('.ourMissionHP-heading', {
      duration: 0.1,
      x: -10,
      opacity: 0.8,
      repeat: 5,
      yoyo: true,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.set('.ourMissionHP-heading', { clearProps: 'all' });
      }
    })
    .to('.ourMissionHP-heading', {
      duration: 0.05,
      x: 10,
      opacity: 0.5,
      repeat: 3,
      yoyo: true,
      ease: 'power2.inOut',
    });

    const owtsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsOwtsVisible(true);
          owtsObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (owtsRef.current) {
      owtsObserver.observe(owtsRef.current);
    }

    return () => {
      if (owtsRef.current) {
        owtsObserver.unobserve(owtsRef.current);
      }
    };
  }, []);

  return (
    <div className="page-container">
      <div className="hero-div">
        <div className="header-div">
          <h1 className="heading">
            <div className="text-row">
              <span className="gold-text">The</span>{' '}
              <span className="animated-text" ref={(el) => animatedTextRows.current[0] = el}>Black</span>
            </div>
            <div className="text-row">
              <span className="gold-text">Box</span>{' '}
              <span className="animated-text" ref={(el) => animatedTextRows.current[1] = el}>Of</span>
            </div>
            <div className="text-row">
              <span className="gold-text">The</span>{' '}
              <span className="animated-text" ref={(el) => animatedTextRows.current[2] = el}>Internet</span>
            </div>
            <div className="button-container">
            <InteractiveGoldenButton>
            <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>
              {t('homePage.letsTalk')}
            </Link>
            </InteractiveGoldenButton>
            </div>
          </h1>
        </div>

        <RotatingNetworkSphere className="rotating-sphere" />
      </div>
      <h3 className="headingwhyDWS animated-title">
        {t('homePage.whyDWSHeading')}
      </h3>

      <div className="whyDWS-section">
        <div className="image-section">
          <div className="image-container" ref={imacRef}>
            <img src={imacImage} alt="iMac" />
          </div>
          <div className="image-container" ref={macbookRef}>
            <img src={macbookImage} alt="MacBook" />
          </div>
          <div className="image-container" ref={phoneRef}>
            <img src={phoneImage} alt="Phone" />
          </div>
        </div>
        <div className="text-section" ref={textRef}>      
          <p>{t('homePage.whyDWSText1')}</p>
          <p>{t('homePage.whyDWSText2')}</p>
        </div>
      </div>

      <div className="ourServicesHP-section">
        <div className="services-card-grid">
          <Link
            className="services-card"
            to="/webdevelopment"
            ref={(el) => (leftCardsRef.current[0] = el)}
          >
            <div className="services-card__background" style={{ backgroundImage: `url(${codingimg})` }}></div>
            <div className="services-card__content">
              <p className="services-card__category">{t('homePage.webDevelopment')}</p>
              <h3 className="services-card__heading">{t('homePage.responsiveWebsites')}</h3>
            </div>
          </Link>
          <Link
            className="services-card"
            to="/webdesign"
            ref={(el) => (leftCardsRef.current[1] = el)}
          >
            <div className="services-card__background" style={{ backgroundImage: `url(${webdesignimg})` }}></div>
            <div className="services-card__content">
              <p className="services-card__category">{t('homePage.webDesign')}</p>
              <h3 className="services-card__heading">{t('homePage.designBestWebsites')}</h3>
            </div>
          </Link>

          <Link
            className="services-card"
            to="/WebApp"
            ref={(el) => (rightCardsRef.current[0] = el)}
          >
            <div className="services-card__background" style={{ backgroundImage: `url(${ecomimg})` }}></div>
            <div className="services-card__content">
              <p className="services-card__category">{t('homePage.eCommerce')}</p>
              <h3 className="services-card__heading">{t('homePage.onlineStores')}</h3>
            </div>
          </Link>
          <Link
            className="services-card"
            to="/WebApp"
            ref={(el) => (rightCardsRef.current[1] = el)}
          >
            <div className="services-card__background" style={{ backgroundImage: `url(${arhivimg})` }}></div>

            <div className="services-card__content">
              <p className="services-card__category">{t('homePage.digitalArchiving')}</p>
              <h3 className="services-card__heading">{t('homePage.getRidOfOldFiles')}</h3>
            </div>
          </Link>
        </div>
      </div>

      <div className="ourMissionHP-section" ref={ourMissionRef}>
        <h2
          className="ourMissionHP-heading"
          data-text={t('homePage.ourMissionTitle')}
        >
          {t('homePage.ourMissionTitle')}
        </h2>

        <OurMissionHP />
      </div>
      <MessageAboveForm />
      <div className="home-page-container">
        <div className="left-side">
          <NewForm />
        </div>
        <div className="right-side">
          <img src={image} alt="Form illustration" className="form-image" />
        </div>
      </div>

      <div className={`owtsSection ${isOwtsVisible ? 'show' : ''}`} ref={owtsRef}>
        <h2 className="owtsSection-headline">Our Path to Success</h2>

        <div className="owtsSection-cards-container">
          <div className="owtsSection-card">
            <FontAwesomeIcon icon={faPhone} className="owtsSection-card-icon" />
            <h3 className="owtsSection-card-title">Initial Call to Understand Your Needs</h3>
            <p className="owtsSection-card-description">
              During this initial call, we take the time to carefully listen and understand all of your specific needs and goals. This enables us to customize our approach, ensuring that the solutions we deliver are perfectly aligned with your vision and requirements.
            </p>
          </div>

          <div className="owtsSection-arrow">
            <FontAwesomeIcon icon={faArrowRight} />
          </div>

          <div className="owtsSection-card">
            <FontAwesomeIcon icon={faLaptopCode} className="owtsSection-card-icon" />
            <h3 className="owtsSection-card-title">Creating and Refining the Design, Followed by Application/Website Development</h3>
            <p className="owtsSection-card-description">
              In this phase, we collaborate closely to create and refine a design that meets your vision. Once the design is finalized, we seamlessly transition into the development phase, building a robust and efficient application or website tailored to your specific needs.
            </p>
          </div>

          <div className="owtsSection-arrow">
            <FontAwesomeIcon icon={faArrowRight} />
          </div>

          <div className="owtsSection-card">
            <FontAwesomeIcon icon={faRocket} className="owtsSection-card-icon" />
            <h3 className="owtsSection-card-title">Final Launch and Implementation of the Solution</h3>
            <p className="owtsSection-card-description">
              In the final stage, we ensure a smooth and successful launch of your application or website. Our team handles every aspect of the implementation, making sure the solution is fully operational and ready to meet your business objectives.
            </p>
          </div>
        </div>
      </div>
      <div className="AnimatedComponentHP">
      <AnimatedComponent />
      </div>
      
    </div>
  );
}