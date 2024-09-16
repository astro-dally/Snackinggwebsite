import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';
import '../CSS/Cart.css';

export default function Cart() {
    const { cart, increaseQuantity, decreaseQuantity, getTotalPrice, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const handlePayment = () => {
        localStorage.setItem('cartItems', JSON.stringify(cart));  // Save cart items in localStorage
        navigate('/payment');
        clearCart();
    };

    return (
        <div className="cart-container">
            {cart.length === 0 ? (
                <div className="empty-cart-message">Your cart is empty 🛒..</div>
            ) : (
                <div>
                    <h1 className="full-cart-message">Your cart items 🛒</h1>
                    <div className="cart-items">
                        {cart.map((item, index) => (
                            <div key={index} className="cart-item">
                                <img src={item.imgSrc} alt={item.altText} className="cart-item-img" />
                                <div className="cart-item-details">
                                    <h5>{item.title}</h5>
                                    <p className="item-price">{item.cost}</p>
                                    <div className="quantity-control">
                                        <button className="decrease" onClick={() => decreaseQuantity(item)}>-</button>
                                        <span className="quantity">{item.quantity}</span>
                                        <button className="increase" onClick={() => increaseQuantity(item)}>+</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="total-price-container">
                        <h3>Total Price: <span className="total-price">₹{getTotalPrice().toFixed(2)}</span></h3>
                    </div>
                    <button className="pay-button" onClick={handlePayment}>PAY</button>
                </div>
            )}
        </div>
    );
}
