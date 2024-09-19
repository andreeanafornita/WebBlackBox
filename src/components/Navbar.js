import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faAngleDown, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';

export default function Navbar() {
    const location = useLocation();
    const { t } = useTranslation(); // Initialize the useTranslation hook
    const [showDropdown, setShowDropdown] = useState(false);
    const [hovered, setHovered] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1280);

    // Detect window resize to toggle mobile view
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 1280);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const links = [
        ...(location.pathname !== "/" ? [{ name: t("home"), path: "/" }] : []), // Home link only appears if not on the home page
        {
            name: t("portfolio"),
            path: "/portfolio",
        },
        {
            name: t("aboutUs"),
            path: "/aboutus",
        },
        {
            name: t("contact"),
            path: "/contact",
        },
    ];

    const handleMouseEnter = (name) => setHovered(name);
    const handleMouseLeave = () => setHovered(null);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleLinkClick = () => {
        setIsSidebarOpen(false);  // Close the sidebar
        
    };

    return (
        <div>
            {!isMobile ? (
                <div style={styles.navbar}>
                    <div style={styles.leftSection}>
                        <Link to="/" style={styles.logo}>
                            <img src="dwsserios.png" alt="Logo" style={styles.logoImage} />
                        </Link>
                        <div style={styles.navLinks}>
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    style={hovered === link.name ? { ...styles.navLink, ...styles.hoverEffect } : styles.navLink}
                                    onMouseEnter={() => handleMouseEnter(link.name)}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={handleLinkClick}  // Add onClick handler
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div
                                style={styles.navItem}
                                onMouseEnter={() => setShowDropdown(true)}
                                onMouseLeave={() => setShowDropdown(false)}
                            >
                                <span
                                    style={hovered === t("services") ? { ...styles.navLink, ...styles.hoverEffect } : styles.navLink}
                                    onMouseEnter={() => handleMouseEnter(t("services"))}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {t("services")} <FontAwesomeIcon icon={faAngleDown} style={styles.dropdownIcon} />
                                </span>
                                {showDropdown && (
                                    <div style={styles.dropdown}>
                                        <Link
                                            to="/webdesign"
                                            style={hovered === t("webDesign") ? { ...styles.dropdownItem, ...styles.hoverEffect } : styles.dropdownItem}
                                            onMouseEnter={() => handleMouseEnter(t("webDesign"))}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={handleLinkClick}  // Add onClick handler
                                        >
                                            {t("webDesign")}
                                        </Link>
                                        <Link
                                            to="/webdevelopment"
                                            style={hovered === t("webDevelopment") ? { ...styles.dropdownItem, ...styles.hoverEffect } : styles.dropdownItem}
                                            onMouseEnter={() => handleMouseEnter(t("webDevelopment"))}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={handleLinkClick}  // Add onClick handler
                                        >
                                            {t("webDevelopment")}
                                        </Link>
                                        <Link
                                            to="/WebApp"
                                            style={hovered === t("webApp") ? { ...styles.dropdownItem, ...styles.hoverEffect } : styles.dropdownItem}
                                            onMouseEnter={() => handleMouseEnter(t("webApp"))}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={handleLinkClick}  // Add onClick handler
                                        >
                                            {t("webApp")}
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div style={styles.contactSection}>
                        <LanguageSelector /> {/* Include the LanguageSelector */}
                        <a href="tel:0738159969" style={styles.phoneLink}>
                            <FontAwesomeIcon icon={faPhone} style={styles.phoneIcon} />
                            <span style={styles.phoneNumber}>{t("callUs")}</span>
                        </a>
                        <a href="mailto:nafornitadaniela@gmail.com" style={styles.messageButton}>
                            {t("messageUs")}
                        </a>
                    </div>
                </div>
            ) : (
                // Sidebar for mobile/tablets
                <div>
                    <div style={styles.mobileNav}>
                        <button onClick={toggleSidebar} style={styles.sidebarToggle}>
                            <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
                        </button>
                    </div>
                    <div style={{ ...styles.sidebar, transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)' }}>
                        <Link to="/" style={styles.logo}>
                            <img src="dwsserios.png" alt="Logo" style={styles.logoImage} />
                        </Link>
                        <div style={styles.contactSectionSidebar}>
                            <a href="tel:0738159969" style={styles.phoneLinkSidebar}>
                                <FontAwesomeIcon icon={faPhone} style={styles.phoneIcon} />
                                <span style={styles.phoneNumber}>{t("callUs")}</span>
                            </a>
                            <a href="mailto:webblackbox.office@gmail.com" style={styles.messageButtonSidebar}>
                                {t("messageUs")}
                            </a>
                        </div>
                        <div style={styles.sidebarLinks}>
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    style={hovered === link.name ? { ...styles.navLink, ...styles.hoverEffect } : styles.navLink}
                                    onMouseEnter={() => handleMouseEnter(link.name)}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={handleLinkClick}  // Add onClick handler
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div
                                style={styles.navItem}
                                onMouseEnter={() => setShowDropdown(true)}
                                onMouseLeave={() => setShowDropdown(false)}
                            >
                                <span
                                    style={hovered === t("services") ? { ...styles.navLink, ...styles.hoverEffect } : styles.navLink}
                                    onMouseEnter={() => handleMouseEnter(t("services"))}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {t("services")} <FontAwesomeIcon icon={faAngleDown} style={styles.dropdownIcon} />
                                </span>
                                {showDropdown && (
                                    <div style={styles.dropdownSidebar}>
                                        <Link
                                            to="/webdesign"
                                            style={hovered === t("webDesign") ? { ...styles.dropdownItemSidebar, ...styles.hoverEffectSidebar } : styles.dropdownItemSidebar}
                                            onMouseEnter={() => handleMouseEnter(t("webDesign"))}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={handleLinkClick}  // Add onClick handler
                                        >
                                            {t("webDesign")}
                                        </Link>
                                        <Link
                                            to="/webdevelopment"
                                            style={hovered === t("webDevelopment") ? { ...styles.dropdownItemSidebar, ...styles.hoverEffectSidebar } : styles.dropdownItemSidebar}
                                            onMouseEnter={() => handleMouseEnter(t("webDevelopment"))}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={handleLinkClick}  // Add onClick handler
                                        >
                                            {t("webDevelopment")}
                                        </Link>
                                        <Link
                                            to="/WebApp"
                                            style={hovered === t("webApp") ? { ...styles.dropdownItemSidebar, ...styles.hoverEffectSidebar } : styles.dropdownItemSidebar}
                                            onMouseEnter={() => handleMouseEnter(t("webApp"))}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={handleLinkClick}  // Add onClick handler
                                        >
                                            {t("webApp")}
                                        </Link>
                                    </div>
                                )}
                            </div>
                            {/* Add LanguageSelector below services */}
                            <div style={styles.languageSelectorSidebar}>
                                <LanguageSelector />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'black',
        padding: '1rem 4rem',
        color: 'white',
    },
    leftSection: {
        display: 'flex',
        alignItems: 'center',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        marginRight: '2rem',
    },
    logoImage: {
        height: '7rem',
    },
    navLinks: {
        display: 'flex',
        alignItems: 'center',
    },
    navItem: {
        position: 'relative',
        marginLeft: '2rem',
        marginLeft:0,
        cursor: 'pointer',
    },
    navLink: {
        textDecoration: 'none',
        color: 'white',
        padding: '1.5rem',
        transition: 'color 0.3s ease',
        fontSize: '2rem',
        display: 'flex',
        alignItems: 'center',
        marginRight: '1rem',
    },
    dropdownIcon: {
        marginLeft: '0.5rem',
    },
    hoverEffect: {
        color: '#ae8507',
    },
    dropdown: {
        position: 'absolute',
        top: '100%',
        left: '0',
        backgroundColor: 'white',
        color: 'black',
        boxShadow: '0 0.8rem 1.6rem rgba(0,0,0,0.2)',
        borderRadius: '0.5rem',
        zIndex: 1,
        display: 'flex',
        padding: '1rem 2rem',
        flexDirection: 'column',
        minWidth: '300px',  // Ensure a minimum width for the navbar dropdown
        width: 'auto', 
    },
    dropdownItem: {
        padding: '1rem 1.5rem',
        display: 'block',
        textDecoration: 'none',
        color: 'black',
        fontSize: '2rem',
        whiteSpace: 'nowrap',
        transition: 'color 0.3s ease',
    },
    contactSection: {
        display: 'flex',
        alignItems: 'center',
    },
    phoneLink: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: '#ae8507',
        marginRight: '3rem',
    },
    phoneLinkSidebar: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: '#ae8507',
        marginRight: '3rem',
        marginBottom: '3rem',
    },
    phoneIcon: {
        marginRight: '0.5rem',
        fontSize: '2rem',
        color: '#ae8507',
    },
    phoneNumber: {
        fontSize: '2rem',
        color: '#ae8507',
    },
    messageButton: {
        backgroundColor: '#ae8507',
        color: 'white',
        border: 'none',
        borderRadius: '2rem',
        padding: '1rem 2rem',
        cursor: 'pointer',
        fontSize: '2rem',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
    },
    messageButtonSidebar: {
        backgroundColor: '#ae8507',
        color: 'white',
        border: 'none',
        borderRadius: '2rem',
        padding: '1rem 2rem',
        cursor: 'pointer',
        fontSize: '1.5rem',
        textDecoration: 'none',
        marginBottom: '3rem',
    },
    mobileNav: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'black',
        padding: '1rem 2rem',
        color: 'white',
    },
    sidebarToggle: {
        background: 'none',
        border: 'none',
        color: 'white',
        fontSize: '3rem',
        cursor: 'pointer',
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 1100,
    },
    sidebar: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '80%',
        maxWidth: '300px',
        height: '100%',
        backgroundColor: 'black',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        boxShadow: '2px 0 5px rgba(0,0,0,0.5)',
        zIndex: 1000,
        transition: 'transform 0.3s ease',
    },
    sidebarLinks: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '2rem',
    },
    contactSectionSidebar: {
        marginBottom: '2rem',
        marginTop: '3rem',
    },
    dropdownSidebar: {
        backgroundColor: 'white',
        color: 'black',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        padding: '1rem 2rem',
        borderRadius: '0.5rem',
        boxShadow: '0 0.8rem 1.6rem rgba(0,0,0,0.2)',
        marginTop: '1rem',
    },
    dropdownItemSidebar: {
        padding: '1rem 1.5rem',
        display: 'block',
        textDecoration: 'none',
        color: 'black',
        fontSize: '1.5rem',
        whiteSpace: 'nowrap',
        transition: 'color 0.3s ease',
    },
    hoverEffectSidebar: {
        color: 'white',
        backgroundColor: '#ae8507',
    },
    languageSelectorSidebar: {
        marginTop: '8rem', // Adds some spacing before the language selector in the sidebar
    },
};
