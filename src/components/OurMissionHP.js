import React, { useRef, useEffect } from 'react';
import '../styles/OurMissionHP.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const OurMissionHP = () => {
  const { t, i18n } = useTranslation(); // Hook for translations
  const subtextRef = useRef(null); // Reference for the changing text
  const wordRefs = useRef([]); // Reference for each word span

  // Translated words to be displayed dynamically
  const words = [
    t('ourMissionHP.integrity'),
    t('ourMissionHP.innovation'),
    t('ourMissionHP.customerFocus'),
    t('ourMissionHP.teamwork')
  ];

  useEffect(() => {
    // Clear previous animations when language changes
    gsap.killTweensOf(subtextRef.current);

    wordRefs.current.forEach((wordRef, index) => {
      const trigger = ScrollTrigger.create({
        trigger: wordRef,
        start: index === 3 ? 'top center' : 'top center+=50',
        end: 'bottom center',
        onEnter: () => {
          gsap.to(subtextRef.current, {
            textContent: words[index], // Change to current word
            duration: 1,
            ease: 'power2.out'
          });
        },
        onLeaveBack: () => {
          gsap.to(subtextRef.current, {
            textContent: words[index === 0 ? 0 : index - 1], // Change to previous word on scroll up
            duration: 1,
            ease: 'power2.out'
          });
        },
        once: false
      });

      return () => {
        trigger.kill(); // Clean up triggers when component or language changes
      };
    });
    ScrollTrigger.refresh();
  }, [words, i18n.language]); // Re-run when translation or language changes

  return (
    <div className="our-mission-hp-container">
      <div className="our-mission-hp-left sticky-container">
        <h2>{t('ourMissionHP.isToDeliver')}</h2>
        <div className="subtext" ref={subtextRef}>{t('ourMissionHP.integrity')}</div> {/* Default text */}
      </div>
      <div className="our-mission-hp-line"></div>
      <div className="our-mission-hp-right">
        <div className="inline-text">
          <span ref={(el) => (wordRefs.current[0] = el)} className="highlighted-text">{t('ourMissionHP.integrity')}</span><br />
          <p className="normal-text">{t('ourMissionHP.integrityText')}</p>
        </div>
        <div className="inline-text">
          <span ref={(el) => (wordRefs.current[1] = el)} className="highlighted-text">{t('ourMissionHP.innovation')}</span><br />
          <p className="normal-text">{t('ourMissionHP.innovationText')}</p>
        </div>
        <div className="inline-text">
          <span ref={(el) => (wordRefs.current[2] = el)} className="highlighted-text">{t('ourMissionHP.customerFocus')}</span><br />
          <p className="normal-text">{t('ourMissionHP.customerFocusText')}</p>
        </div>
        <div className="inline-text">
          <span ref={(el) => (wordRefs.current[3] = el)} className="highlighted-text">{t('ourMissionHP.teamwork')}</span><br />
          <p className="normal-text">{t('ourMissionHP.teamworkText')}</p>
        </div>
      </div>
    </div>
  );
};

export default OurMissionHP;
