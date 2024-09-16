import React from 'react';
import '../CSS/Profile.css';
import { useAuth } from '../Components/AuthContext'; // Assuming this context handles authentication state
import { getAuth } from 'firebase/auth';

export default function Profile() {
    const { isAuthenticated } = useAuth();
    const auth = getAuth();
    const user = auth.currentUser;

    if (!isAuthenticated || !user) {
        return null; // Don't show the profile if the user is not authenticated
    }

    return (
        <div className="profile-container">
            <img
                src={user.photoURL || 'https://via.placeholder.com/100'}
                alt="Profile Avatar"
                className="profile-avatar"
            />
            <h1 className="profile-name">Hi, {user.displayName || 'User'}!</h1>
            <p className="profile-email">{user.email}</p>
        </div>
    );
}
