import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import '../CSS/SignUp.css';

export default function SignUp({ closeSignUpPopup }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Sign-up successful!");
            closeSignUpPopup(); // Close the popup on successful sign-up
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="signup-container">
            <span className="close-popup" onClick={closeSignUpPopup}>&times;</span>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}
