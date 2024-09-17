import React, { useEffect, useState, useContext } from 'react';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import '../CSS/Cards.css';
import { CartContext } from './CartContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Cards() {
    const { addToCart, updateFavourites, favouriteItemCount } = useContext(CartContext);
    const [snacks, setSnacks] = useState([]);
    const [category, setCategory] = useState('Snacks');
    const [favourites, setFavourites] = useState(() => {
        const savedFavourites = localStorage.getItem('favourites');
        return savedFavourites ? JSON.parse(savedFavourites) : [];
    });

    useEffect(() => {
        axios.get(`https://snackynerds-r5jsuqksj-dallys-projects.vercel.app/api/snacks?category=${category}`)
            .then(response => {
                setSnacks(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the snacks!', error);
            });
    }, [category]);

    useEffect(() => {
        updateFavourites(favourites);
    }, [favourites, updateFavourites]);

    const toggleFavourite = (snack) => {
        let updatedFavourites;
        if (favourites.some(fav => fav.id === snack.id)) {
            updatedFavourites = favourites.filter(fav => fav.id !== snack.id);
            toast.info(`${snack.title} removed from favourites!`);
        } else {
            updatedFavourites = [...favourites, snack];
            toast.success(`${snack.title} added to favourites!`);
        }
        setFavourites(updatedFavourites);
    };

    const handleAddToCart = (snack) => {
        addToCart(snack);
        toast.success(`${snack.title} added to cart!`);
    };

    return (
        <div>
            <div className="sidebar">
                <h2>Categories</h2>
                <button
                    className={`category-button ${category === 'Snacks' ? 'active' : ''}`}
                    onClick={() => setCategory('Snacks')}
                >
                    Snacks
                </button>
                <button
                    className={`category-button ${category === 'Chocolates' ? 'active' : ''}`}
                    onClick={() => setCategory('Chocolates')}
                >
                    Chocolates
                </button>
            </div>
            <div className="content">
                <h1 className='SnacksCards'>Crunching Code and Snacks!</h1>
                <div className="card-container">
                    {snacks.map((snack) => (
                        <div className="card" key={snack.id}>
                            <img src={snack.imgSrc} className="card-img-top" alt={snack.altText} />
                            <div className="card-body">
                                <h5 className="card-title">{snack.title}</h5>
                                <p className="card-cost">{snack.cost}</p>
                                <div className="card-buttons">
                                    <button
                                        className="btn-primary"
                                        onClick={() => handleAddToCart(snack)}
                                    >
                                        <FaShoppingCart />
                                    </button>
                                    <button
                                        className={`btn-favourite ${favourites.some(fav => fav.id === snack.id) ? 'active' : ''}`}
                                        onClick={() => toggleFavourite(snack)}
                                    >
                                        <FaHeart />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
