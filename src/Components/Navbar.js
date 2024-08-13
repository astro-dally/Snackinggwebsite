import React from 'react';
import Logo from '../assets/LOGO2.jpeg';
import { FaHeart, FaShoppingCart, FaMoon, FaSun, FaSignOutAlt } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/Navbar.css';
import '../App.css';
import { signOut } from 'firebase/auth';
import { auth } from '../Components/firebase';

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert('Logout successful!');
            navigate('/'); // Redirect to landing page after logout
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className='navbar'>
            <img src={Logo} alt="Snacky Nerds Logo" className="footer-logo" />
            <ul className="navbar-menu">
                <li><Link to="/about"><FiInfo /> About</Link></li>
                <li><Link to="/snacks"><FaHeart /> Snacks</Link></li>
                <li><Link to="/cart"><FaShoppingCart /> Cart</Link></li>
                <li><button className="logout-btn" onClick={handleLogout}><FaSignOutAlt /> Logout</button></li>
            </ul>
        </div>
    );
}
