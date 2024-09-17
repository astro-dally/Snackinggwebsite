import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/LandingPage.css';
import image from '../assets/Image1.jpeg';
import image1 from '../assets/Image2.jpeg';
import Logo from '../assets/Logo.png';
import Login from './Login';

const LandingPage = () => {
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const navigate = useNavigate(); // useNavigate hook for navigation

    const handleLoginClick = () => {
        setShowLoginPopup(true);
    };

    const closeLoginPopup = () => {
        setShowLoginPopup(false);
    };

    const handleLoginSuccess = () => {
        navigate('/snacks'); // Redirect to About page after successful login
    };

    return (
        <div className="landing-page">
            <div className="hero-section">
                <div className="text-content">
                    <img src={Logo} alt="Snacky Nerds Logo" className="footer-logo" />
                    <h1 className="title">Snacky Nerds</h1>
                    <h1 className="subtitle">Fuel your passion with tech and snacks!</h1>
                    <p className="description">Have fun and amazing snacks around with your friends.</p>
                    <div className="button-group">
                        <button className="cta-button primary">Let's Snack, Nerds!</button>
                        <button className="cta-button secondary" onClick={handleLoginClick}>Login</button>
                    </div>
                </div>
                <div className="images-section">
                    <div className="image-container">
                        <img src={image} className="image" alt="Snack Image 1" />
                    </div>
                    <div className="image-container">
                        <img src={image1} className="image" alt="Snack Image 2" />
                    </div>
                </div>
            </div>
            {showLoginPopup && (
                <div className="login-popup">
                    <div className="login-popup-content">
                        <span className="close-popup" onClick={closeLoginPopup}>&times;</span>
                        <Login closeLoginPopup={closeLoginPopup} onLoginSuccess={handleLoginSuccess} />
                    </div>
                </div>
            )}
        </div>
    );
}
export default LandingPage;
