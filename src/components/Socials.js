import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faXTwitter, faTiktok } from '@fortawesome/free-brands-svg-icons'; // Importăm iconițele necesare
import '../styles/Socials.css'
export default function Socials() {
  return (
    <div className="socials-container">
      <ul className="socials-list">
        <li className="socials-item">
          <a href="https://www.facebook.com/profile.php?id=61565657112869" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} className="social-icon" />
            <span>Facebook</span>
          </a>
        </li>
        <li className="socials-item">
          <a href="https://www.instagram.com/web.black.box/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} className="social-icon" />
            <span>Instagram</span>
          </a>
        </li>
        <li className="socials-item">
          <a href="https://x.com/webblackbox_" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faXTwitter} className="social-icon" />
            <span>X</span>
          </a>
        </li>
        <li className="socials-item">
          <a href="https://www.tiktok.com/@webblackbox" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTiktok} className="social-icon" />
            <span>TikTok</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
