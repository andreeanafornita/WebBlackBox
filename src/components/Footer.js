import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faXTwitter, faTiktok } from '@fortawesome/free-brands-svg-icons'; 
import '../styles/Footer.css'
import { useTranslation } from 'react-i18next';

import roboImage from '../assets/robo.png'; // Import the image
import anpcLogo from '../assets/anpc.png';
import SOLlogo from '../assets/sol.png';

export default function Footer() {
    const { t } = useTranslation(); // Hook for translation
    const [showDropdown, setShowDropdown] = useState(false);
    const [hovered, setHovered] = useState(null);

    const handleMouseEnter = (name) => setHovered(name);
    const handleMouseLeave = () => setHovered(null);

    return (
        <footer className="footer">
            {/* Container for all content except social icons and robot image */}
            <div className="mainContentContainer">
                {/* Left Section with Logo, Navigation, and Contact Info */}
                <div className="leftSection">
                    <Link to="/" className="logo">
                        <img src="dwsserios.png" alt="Logo Placeholder" className="logoImage" />
                        <span className="companyName">
                            <span className="companyNameWhite">Web</span>
                            <span className="companyNameGold">BlackBox</span>
                        </span>
                    </Link>
                    <div className="navLinks">
                        <Link to="/portfolio" className="navLink">{t("footer.portfolio")}</Link>
                        <Link to="/aboutus" className="navLink">{t("footer.aboutUs")}</Link>
                        <Link to="/contact" className="navLink">{t("footer.contact")}</Link>
                        <Link to="/blog" className="navLink">{t("footer.blog")}</Link>
                        <div
                            className="navItem"
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                        >
                            <span
                                className={hovered === t("footer.services") ? "navLink hoverEffect" : "navLink"}
                                onMouseEnter={() => handleMouseEnter(t("footer.services"))}
                                onMouseLeave={handleMouseLeave}
                            >
                                {t("footer.services")} <FontAwesomeIcon icon={faAngleDown} className="dropdownIcon" />
                            </span>
                            {showDropdown && (
                                <div className="dropdown">
                                    <Link
                                        to="/webdesign"
                                        className={hovered === t("footer.webDesign") ? "dropdownItem hoverEffect" : "dropdownItem"}
                                        onMouseEnter={() => handleMouseEnter(t("footer.webDesign"))}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {t("footer.webDesign")}
                                    </Link>
                                    <Link
                                        to="/webdevelopment"
                                        className={hovered === t("footer.webDevelopment") ? "dropdownItem hoverEffect" : "dropdownItem"}
                                        onMouseEnter={() => handleMouseEnter(t("footer.webDevelopment"))}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {t("footer.webDevelopment")}
                                    </Link>
                                    <Link
                                        to="/WebApp"
                                        className={hovered === t("footer.webApp") ? "dropdownItem hoverEffect" : "dropdownItem"}
                                        onMouseEnter={() => handleMouseEnter(t("footer.webApp"))}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {t("footer.webApp")}
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Contact Information directly underneath the navigation */}
                    <div className="contactSection">
                        <a href="tel:0738159969" className="contactLink">
                            <FontAwesomeIcon icon={faPhone} className="contactIcon" />
                            <span>{t("footer.callUs")}: 0738159969</span>
                        </a>
                        <a href="mailto:nafornitadaniela@gmail.com" className="contactLink">
                            {t("footer.messageUs")}
                        </a>
                    </div>
                </div>

                {/* New Middle Column for Location */}
                <div className="middleSection">
                    <p className="middleText">{t("footer.location")}</p>
                </div>

                {/* New Right Column with Motto */}
                <div className="rightSection">
                    <p className="mottoText">{t("footer.motto")}</p>
                    <a href="/termeni-si-conditii" className="additionalLink">{t("footer.termsAndConditions")}</a>
                    <a href="/privacypolicy" className="additionalLink">{t("footer.privacyPolicy")}</a>
                    <a href="/marca-inregistrata" className="additionalLink">{t("footer.registeredTrademark")}</a>
                </div>
            </div>

            {/* Right Section with Image */}
            <div className="imageContainer">
                <img src={roboImage} alt="Robo" className="image" />
            </div>

            {/* Bottom Centered Section with Social Media Icons */}
            <div className="bottomSection">
                <div className="socials-container">
                    <ul className="socials-list">
                        <li className="socials-item">
                            <a href="https://www.facebook.com/profile.php?id=61565657112869" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faFacebook} className="social-icon" />
                                <span className="socialText">Facebook</span>
                            </a>
                        </li>
                        <li className="socials-item">
                            <a href="https://www.instagram.com/web.black.box/" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} className="social-icon" />
                                <span className="socialText">Instagram</span>
                            </a>
                        </li>
                        <li className="socials-item">
                            <a href="https://x.com/webblackbox_" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faXTwitter} className="social-icon" />
                                <span className="socialText">X</span>
                            </a>
                        </li>
                        <li className="socials-item">
                            <a href="https://www.tiktok.com/@webblackbox" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faTiktok} className="social-icon" />
                                <span className="socialText">TikTok</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="anpcLogoContainer">
                    <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener noreferrer" className="anpcLink">
                        <img src={anpcLogo} alt="ANPC Logo" className="anpcLogo" />
                    </a>
                    <a href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=RO" target="_blank" rel="noopener noreferrer" className="solLink">
                        <img src={SOLlogo} alt="SOL Logo" className="solLogo" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
