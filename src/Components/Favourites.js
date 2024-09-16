import React, { useEffect, useState, useContext } from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import '../CSS/Favourites.css';
import { CartContext } from './CartContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import debounce from 'lodash/debounce';

export default function Favourites() {
    const [favourites, setFavourites] = useState([]);
    const { addToCart, updateFavourites } = useContext(CartContext);

    useEffect(() => {
        console.log('Loading favourites from local storage');
        const savedFavourites = localStorage.getItem('favourites');
        if (savedFavourites) {
            setFavourites(JSON.parse(savedFavourites));
        }
    }, []);

    useEffect(() => {
        console.log('Debounced updating favourites in context and local storage');
        const debouncedUpdate = debounce(() => {
            updateFavourites(favourites);
        }, 300); // Adjust debounce delay as needed

        debouncedUpdate();

        return () => {
            debouncedUpdate.cancel(); // Cleanup on unmount
        };
    }, [favourites, updateFavourites]);

    const removeFavourite = (snack) => {
        const updatedFavourites = favourites.filter(fav => fav.id !== snack.id);
        setFavourites(updatedFavourites);
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
        toast.info(`${snack.title} removed from favourites!`);
    };

    const addFavouriteToCart = (snack) => {
        addToCart(snack);
        removeFavourite(snack);
        toast.success(`${snack.title} added to cart!`);
    };

    return (
        <div className="favourites-container">
            <h1>Your Favourite Snacks</h1>
            <div className="card-container">
                {favourites.length === 0 ? (
                    <p>No favourites added yet!</p>
                ) : (
                    favourites.map((snack) => (
                        <div className="card" key={snack.id}>
                            <img src={snack.imgSrc} className="card-img-top" alt={snack.altText} />
                            <div className="card-body">
                                <h5 className="card-title">{snack.title}</h5>
                                <p className="card-cost">{snack.cost}</p>
                                <div className="card-buttons">
                                    <button
                                        className="btn-primary"
                                        onClick={() => addFavouriteToCart(snack)}
                                    >
                                        <FaShoppingCart />
                                    </button>
                                    <button
                                        className="btn-favourite"
                                        onClick={() => removeFavourite(snack)}
                                    >
                                        <FaHeart />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <ToastContainer />
        </div>
    );
}
