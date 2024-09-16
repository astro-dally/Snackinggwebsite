import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../CSS/Login.css';
import { auth } from '../Components/firebase';
import { googleSignIn } from './firebase';
import SignUp from './SignUp';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Components/AuthContext';

export default function Login({ closeLoginPopup }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSignUp, setShowSignUp] = useState(false);
    const [blur, setBlur] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            if (email === "astroAdmin@gmail.com" && password === "astrospace64") {
                // Redirect to admin route
                alert('Admin login successful!');
                navigate('/admin');
            } else {
                alert('Login successful!');
                navigate('/snacks');
            }
            login(); // Update authentication state
            closeLoginPopup();
            setBlur(false); // Remove blur after closing
        } catch (error) {
            alert(error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            alert('Google Sign-In successful!');
            login(); // Update authentication state
            closeLoginPopup();
            navigate('/snacks');
        } catch (error) {
            alert(error.message);
        }
    };

    const handleSignUpClick = () => {
        setShowSignUp(true);
        setBlur(true); // Add blur when showing SignUp popup
    };

    const handleSignUpClose = () => {
        setShowSignUp(false);
        setBlur(false); // Remove blur when closing SignUp popup
    };

    return (
        <>
            <div className={`landing-page ${blur ? 'blur' : ''}`}>
                {/* Your landing page content */}
            </div>

            {!showSignUp && (
                <div className="login-container">
                    <span className="close-popup" onClick={closeLoginPopup}>&times;</span>
                    <h2>Login</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Login</button>

                        <button type="button" className="google-signin-btn" onClick={handleGoogleSignIn}>
                            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbBLoZAbYVX7Kh7BhD17b8ij1-OI-8Kncd-A&s' height='20px' width='20px' alt="Google Logo" />
                            Continue with Google
                        </button>
                        <button type="button" className="signup-btn" onClick={handleSignUpClick}>
                            Sign Up
                        </button>
                    </form>
                </div>
            )}

            {showSignUp && (
                <div className="signup-popup">
                    <SignUp closeSignUpPopup={handleSignUpClose} />
                </div>
            )}
        </>
    );
}
