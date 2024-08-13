import React, { useContext } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import '../CSS/Cards.css';
import { CartContext } from './CartContext';

export default function Cards() {
    const { addToCart } = useContext(CartContext);

    const snacks = [
        {
            imgSrc: "https://www.lays.com/sites/lays.com/files/2022-05/XL%20Lays%20Flamin%20Hot%20New.png",
            altText: "LAYS Flamin Hot",
            title: "LAYS Flamin Hot",
            cost: "₹50"
        },
        {
            imgSrc: "https://i.pinimg.com/736x/2d/6b/7d/2d6b7dad0880cf5ac871e4f3de5f1515.jpg",
            altText: "LAYS Spanish Tomato Tango",
            title: "LAYS Spanish Tomato Tango",
            cost: "₹40"
        },
        {
            imgSrc: "https://img.thecdn.in/143849/1667654333908_SKU-0462_0.png?",
            altText: "LAYS Classic Salted",
            title: "LAYS Classic Salted",
            cost: "₹35"
        },
        {
            imgSrc: "https://www.lays.com/sites/lays.com/files/2020-11/sour-cream.jpg",
            altText: "LAYS Cream & Onion",
            title: "LAYS Cream & Onion",
            cost: "₹45"
        },
        {
            imgSrc: "https://5.imimg.com/data5/SELLER/Default/2023/5/305701388/JM/OP/LA/116880623/lays-magic-masala-chips.jpg",
            altText: "LAYS Magic Masala",
            title: "LAYS Magic Masala",
            cost: "₹40"
        },
        {
            imgSrc: "https://www.jiomart.com/images/product/original/rvo8ii7wex/cadbury-dairy-milk-chocolate-bar-family-pack-123-g-pack-of-3-air-tight-storage-box-product-images-orvo8ii7wex-p602068023-0-202306020258.jpg?im=Resize=(1000,1000)",
            altText: "Dairy Milk",
            title: "Dairy Milk",
            cost: "₹80"
        }
    ];

    return (
        <div>
            <h1 className='SnacksCards'>Here are Your Favourite Snacks</h1>
            <div className="card-container">
                {snacks.map((snack, index) => (
                    <div className="card" key={index}>
                        <img src={snack.imgSrc} className="card-img-top" alt={snack.altText} />
                        <div className="card-body">
                            <h5 className="card-title">{snack.title}</h5>
                            <p className="card-cost">{snack.cost}</p>
                            <button
                                className="btn-primary"
                                onClick={() => addToCart(snack)}
                            >
                                <FaShoppingCart /> Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
