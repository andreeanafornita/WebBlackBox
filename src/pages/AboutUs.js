import React, { useEffect, useRef } from 'react';
import '../styles/AboutUs.css';
import danyImage from '../assets/dany.png';
import tomaImage from '../assets/toma.png';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import ScrollTrigger from 'gsap/ScrollTrigger';
import TextPlugin from 'gsap/TextPlugin';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

// Register plugins with GSAP
gsap.registerPlugin(CustomEase, ScrollTrigger, TextPlugin);

export default function AboutUs() {
  const { t } = useTranslation(); // Initialize translation hook
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: teamRef, inView: teamInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: contentRef, inView: contentInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (heroInView) {
      gsap.fromTo(heroRef.current, { opacity: 0, y: -100 }, { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" });
    }
    if (teamInView) {
      gsap.fromTo(teamRef.current, { opacity: 0, x: -200 }, { opacity: 1, x: 0, duration: 1.5, ease: "power3.out" });
    }
    if (contentInView) {
      gsap.fromTo(contentRef.current, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" });
    }

    ScrollTrigger.batch(".fade-in", {
      onEnter: batch => gsap.to(batch, { opacity: 1, stagger: 0.15, overwrite: true }),
      start: "top 80%",
      end: "bottom 20%",
    });

    gsap.fromTo(".parallax-image", {
      yPercent: -10
    }, {
      yPercent: 10,
      scrollTrigger: {
        trigger: ".parallax-image",
        scrub: true
      }
    });

    // Use the translated "Our Team of Experts" title in the gsap animation
    gsap.fromTo(".hero-title", {
      text: t('aboutUsPage.heroTitle') // Use translation here
    }, {
      text: t('aboutUsPage.heroTitle'), // Ensure it's translated properly
      duration: 2,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top 50%",
        end: "bottom top",
        scrub: true,
      }
    });

  }, [heroInView, teamInView, contentInView, heroRef, teamRef, contentRef, t]); // Include `t` as a dependency for translations

  return (
    <div className="about-us-container">
      <section ref={heroRef} className="hero-section">
        <h1 className="hero-title fade-in">{t('aboutUsPage.heroTitle')}</h1>
        <p className="hero-subtitle fade-in">{t('aboutUsPage.heroSubtitle')}</p>
      </section>

      <section ref={teamRef} className="team-section">
        <h2 className="section-title fade-in">{t('aboutUsPage.teamTitle')}</h2>
        <div className="team-members">
          <motion.div
            className="team-member"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ rotate: [0, 5, -5, 5, 0] }}
            transition={{ duration: 0.3 }}
          >
            <img src={danyImage} alt="Dany" className="team-member-photo parallax-image" />
            <h3 className="team-member-name fade-in">{t('aboutUsPage.danyName')}</h3>
            <p className="team-member-role fade-in">{t('aboutUsPage.danyRole')}</p>
            <p className="team-member-description fade-in">{t('aboutUsPage.danyDescription')}</p>
          </motion.div>

          <motion.div
            className="team-member"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 0.3 }}
          >
            <img src={tomaImage} alt="Toma" className="team-member-photo parallax-image" />
            <h3 className="team-member-name fade-in">{t('aboutUsPage.tomaName')}</h3>
            <p className="team-member-role fade-in">{t('aboutUsPage.tomaRole')}</p>
            <p className="team-member-description fade-in">{t('aboutUsPage.tomaDescription')}</p>
          </motion.div>
        </div>
      </section>

      <section ref={contentRef} className="content-section">
        <div className="content fade-in">
          <h2 className="section-title">{t('aboutUsPage.storyTitle')}</h2>
          <p className="section-text">{t('aboutUsPage.storyText')}</p>
        </div>

        <div className="content fade-in">
          <h2 className="section-title">{t('aboutUsPage.missionTitle')}</h2>
          <p className="section-text">{t('aboutUsPage.missionText')}</p>
        </div>

        <div className="content fade-in">
          <h2 className="section-title">{t('aboutUsPage.valuesTitle')}</h2>
          <ul className="values-list">
            <li>{t('aboutUsPage.value1')}</li>
            <li>{t('aboutUsPage.value2')}</li>
            <li>{t('aboutUsPage.value3')}</li>
            <li>{t('aboutUsPage.value4')}</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
