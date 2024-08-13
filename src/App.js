import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import About from './Components/About';
import Cards from './Components/Cards';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Cart from './Components/Cart';
import { CartProvider } from './Components/CartContext';
import LandingPage from './Components/LandingPage';
import { AuthProvider } from './Components/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<ProtectedRoute element={<><Navbar /><About /></>} />} />
              <Route path="/snacks" element={<ProtectedRoute element={<><Navbar /><Cards /></>} />} />
              <Route path="/cart" element={<ProtectedRoute element={<><Navbar /><Cart /></>} />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
