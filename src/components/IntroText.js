// IntroText.js
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Power4, Elastic } from 'gsap';
import { useTranslation } from 'react-i18next';
export default function IntroText() {
  const introRef = useRef(null);
  const { t } = useTranslation(); 
  useEffect(() => {
    // Animație complexă GSAP pentru text
    const tl = gsap.timeline({ defaults: { duration: 1.5, ease: Power4.easeOut } });

    tl.fromTo(
      introRef.current,
      {
        opacity: 0,
        y: -50,
        scale: 0.5,
        rotationX: 90,
        skewX: 30,
        transformOrigin: 'center center',
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        skewX: 0,
        duration: 2,
        ease: Elastic.easeOut.config(1, 0.75),
      }
    )
      .to(introRef.current, {
        color: '#ae8507',
        textShadow: '0px 0px 20px rgba(255, 255, 255, 0.9)',
        duration: 1,
        ease: Power4.easeInOut,
      })
      .to(
        introRef.current,
        {
          rotation: 360,
          duration: 2,
          ease: Elastic.easeOut.config(1, 0.75),
        },
        '-=1'
      )
      .fromTo(
        introRef.current,
        {
          scale: 1.1,
        },
        {
          scale: 1,
          ease: Elastic.easeOut.config(1, 0.5),
          duration: 2,
        },
        '-=0.5'
      );
  }, []);

  return (
    <div className="intro-text-container" ref={introRef}>
<p>{t('contactPage.finalMessage')}</p> 
    </div>
  );
}
