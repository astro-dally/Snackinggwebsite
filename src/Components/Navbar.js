import React, { useContext, useState } from 'react';
import Logo from '../assets/LOGO2.jpeg';
import { FaHeart, FaShoppingCart, FaSignOutAlt, FaUserCircle, FaAngleDown } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
import { IoFastFood } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/Navbar.css';
import { signOut } from 'firebase/auth';
import { auth } from '../Components/firebase';
import { CartContext } from './CartContext';
import { useAuth } from '../Components/AuthContext';

export default function Navbar() {
    const navigate = useNavigate();
    const { cartItemCount, favouriteItemCount } = useContext(CartContext);
    const { user } = useAuth(); // Get the user info from AuthContext
    const [showProfile, setShowProfile] = useState(false); // Toggle profile dropdown

    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert('Logout successful!');
            navigate('/'); // Redirect to landing page after logout
        } catch (error) {
            alert(error.message);
        }
    };

    const toggleProfileDropdown = () => {
        setShowProfile((prev) => !prev); // Toggle profile dropdown visibility
    };

    return (
        <div className='navbar'>
            <img src={Logo} alt="Snacky Nerds Logo" className="footer-logo" />
            <ul className="navbar-menu">
                <li><Link to="/about"><FiInfo /> About</Link></li>
                <li><Link to="/snacks"><IoFastFood /> Snacks</Link></li>
                <li>
                    <Link to="/favourites">
                        <FaHeart /> Favourites
                        {favouriteItemCount > 0 && <span className="badge">{favouriteItemCount}</span>}
                    </Link>
                </li>
                <li>
                    <Link to="/cart">
                        <FaShoppingCart /> Cart
                        {cartItemCount > 0 && <span className="badge">{cartItemCount}</span>}
                    </Link>
                </li>
                {user && (
                    <li className="profile-dropdown">
                        <div onClick={toggleProfileDropdown} className="profile-icon">
                            <FaUserCircle size={35} />
                        </div>
                        {showProfile && (
                            <div className="profile-info">
                                <p><strong>{user.displayName}</strong></p>
                                <p>{user.email}</p>
                                <button className="logout-btn" onClick={handleLogout}><FaSignOutAlt /> Logout</button>
                            </div>
                        )}
                    </li>
                )}
            </ul>
        </div>
    );
}
