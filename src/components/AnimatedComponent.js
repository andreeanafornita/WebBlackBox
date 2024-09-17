
// import React, { useRef, useEffect } from 'react';
// import { gsap } from 'gsap';
// import { useTranslation } from 'react-i18next'; // Import useTranslation
// import '../styles/AnimatedComponent.css'; // Import the CSS file

// const CustomAnimation = () => {
//   const { t } = useTranslation(); // Initialize the translation hook
//   const textRef = useRef(null);
//   const rotateRef = useRef(null);

//   useEffect(() => {
//     const text = textRef.current;
//     const rotate = rotateRef.current;

//     const tl = gsap.timeline({ paused: true });

//     tl
//       .to(rotate, {
//         duration: 1,
//         scale: 20, // Reduced scale factor from 30 to 20
//         rotate: 240,
//         ease: "expo.in",
//       })
//       .to(
//         text,
//         {
//           duration: 1,
//           x: 0,
//           ease: "power2.in",
//         },
//         0
//       );

//     const handleScroll = () => {
//       const progress =
//         window.pageYOffset /
//         (document.body.offsetHeight - window.innerHeight);
//       tl.progress(progress);
//     };

//     window.addEventListener("scroll", handleScroll, false);

//     return () => {
//       window.removeEventListener("scroll", handleScroll, false);
//     };
//   }, []);

//   return (
//     <div className='custom-track'>
//       <div className='custom-overlay'>
//         <div className='custom-text'>
//           <div className='custom-text-inner' ref={textRef}>
//             {t('customPage.chooseUs')} {/* Translated text */}
//           </div>
//         </div>
//         <div className='custom-shape'>
//           <div className='scale'>
//             <div className='rotate' ref={rotateRef}>
//               <div className='img'>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 162 162"
//                   style={{ enableBackground: "new 0 0 162 162" }}
//                   xmlSpace="preserve"
//                 >
//                   <path
//                     className="hsc-img-path"
//                     d="M108 88.7c-10.8 0-19.7 8.8-19.7 19.7v47.4c0 1.9-1.5 3.4-3.4 3.4h-8.6c-1.9 0-3.4-1.5-3.4-3.4v-47.4c0-10.8-8.8-19.7-19.7-19.7H6.4c-1.9 0-3.4-1.5-3.4-3.4v-8c0-1.9 1.5-3.4 3.4-3.4h46.9c10.8 0 19.7-8.8 19.6-19.7V6.4c0-1.9 1.5-3.4 3.4-3.4H85c1.9 0 3.4 1.5 3.4 3.4v47.8c0 10.8 8.8 19.7 19.7 19.7h46.6c1.9 0 3.4 1.5 3.4 3.4v8c0 1.9-1.5 3.4-3.4 3.4H108z"
//                     style={{ fillRule: "evenodd", clipRule: "evenodd" }}
//                     fill="#000"
//                   ></path>
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className='custom-gradient'></div>
//       </div>
//     </div>
//   );
// };

// export default CustomAnimation;
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import '../styles/AnimatedComponent.css'; // Import the CSS file

const CustomAnimation = () => {
  const { t } = useTranslation(); // Initialize the translation hook
  const textRef = useRef(null);
  const rotateRef = useRef(null);

  // Funcție pentru detectarea dimensiunilor de ecran
  const isMobile = () => window.innerWidth <= 768;

  useEffect(() => {
    const text = textRef.current;
    const rotate = rotateRef.current;

    const tl = gsap.timeline({ paused: true });

    tl
      .to(rotate, {
        duration: isMobile() ? 0.8 : 1, // Animație mai rapidă pe mobil
        scale: isMobile() ? 20 : 20, // Scală mai mică pe mobil
        rotate: 240,
        ease: "expo.in",
      })
      .to(
        text,
        {
          duration: isMobile() ? 0.8 : 1, // Mai rapid și pentru text
          x: 0,
          ease: "power2.in",
        },
        0
      );

    // Folosim requestAnimationFrame pentru o derulare mai eficientă
    const handleScroll = () => {
      const progress =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
      requestAnimationFrame(() => {
        tl.progress(progress);
      });
    };

    // Adăugăm ascultătorul de evenimente pentru scroll
    window.addEventListener("scroll", handleScroll, false);

    return () => {
      window.removeEventListener("scroll", handleScroll, false);
    };
  }, []);

  // Funcție pentru gradient personalizat pe mobil
  const customGradient = () => {
    if (!isMobile()) {
      return 'linear-gradient(90deg, #ffeeca 0%, #d9bd89 100%)';
    } else {
      return '#d9bd89'; // Gradient simplificat pe mobil
    }
  };

  return (
    <div className='custom-track'>
      <div className='custom-overlay'>
        <div className='custom-text'>
          <div className='custom-text-inner' ref={textRef}>
            {t('customPage.chooseUs')} {/* Translated text */}
          </div>
        </div>
        <div className='custom-shape'>
          <div className='scale'>
            <div className='rotate' ref={rotateRef}>
              <div className='img'>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 162 162"
                  preserveAspectRatio="xMidYMid meet" // Păstrează aspectul corect
                  style={{ enableBackground: "new 0 0 162 162" }}
                  xmlSpace="preserve"
                >
                  <path
                    className="hsc-img-path"
                    d="M108 88.7c-10.8 0-19.7 8.8-19.7 19.7v47.4c0 1.9-1.5 3.4-3.4 3.4h-8.6c-1.9 0-3.4-1.5-3.4-3.4v-47.4c0-10.8-8.8-19.7-19.7-19.7H6.4c-1.9 0-3.4-1.5-3.4-3.4v-8c0-1.9 1.5-3.4 3.4-3.4h46.9c10.8 0 19.7-8.8 19.6-19.7V6.4c0-1.9 1.5-3.4 3.4-3.4H85c1.9 0 3.4 1.5 3.4 3.4v47.8c0 10.8 8.8 19.7 19.7 19.7h46.6c1.9 0 3.4 1.5 3.4 3.4v8c0 1.9-1.5 3.4-3.4 3.4H108z"
                    style={{ fillRule: "evenodd", clipRule: "evenodd" }}
                    fill="#000"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className='custom-gradient' style={{ background: customGradient() }}></div>
      </div>
    </div>
  );
};

export default CustomAnimation;
