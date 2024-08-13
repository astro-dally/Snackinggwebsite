import React from 'react';
import { FaInstagram, FaEnvelope, FaHeart } from 'react-icons/fa';
import Logo from '../assets/LOGO2.jpeg';
import '../CSS/Footer.css';

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-content">
                <img src={Logo} alt="Snacky Nerds Logo" className="footer-logo" />
                <div className="social-icons">
                    <a href="https://www.instagram.com/snackyy__nerdss" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="social-icon" />
                    </a>
                    <a href="mailto:snackyynerds@gmail.com">
                        <FaEnvelope className="social-icon" />
                    </a>
                </div>
                <p>© 2024 Snacky Nerds. All rights reserved.</p>
                <p>
                    Made with <FaHeart className="heart-icon" /> by
                    <a href="https://www.linkedin.com/in/dally-r-astro6/" target="_blank" rel="noopener noreferrer">Dally R</a>
                </p>
            </div>
        </div>
    );
};

export default Footer;
