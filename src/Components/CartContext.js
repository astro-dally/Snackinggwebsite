import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        alert("Added to cart")
        setCart((prevCart) => {
            const itemIndex = prevCart.findIndex(cartItem => cartItem.title === item.title);
            if (itemIndex === -1) {
                return [...prevCart, { ...item, quantity: 1 }];
            } else {
                const updatedCart = [...prevCart];
                updatedCart[itemIndex].quantity += 1;
                return updatedCart;
            }
        });
    };

    const increaseQuantity = (item) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map(cartItem =>
                cartItem.title === item.title ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            );
            return updatedCart;
        });
    };

    const decreaseQuantity = (item) => {
        setCart((prevCart) => {
            const updatedCart = prevCart
                .map(cartItem =>
                    cartItem.title === item.title ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
                )
                .filter(cartItem => cartItem.quantity > 0);
            return updatedCart;
        });
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => {
            const price = parseFloat(item.cost.replace('₹', ''));
            return total + price * item.quantity;
        }, 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, increaseQuantity, decreaseQuantity, getTotalPrice }}>
            {children}
        </CartContext.Provider>
    );
};
