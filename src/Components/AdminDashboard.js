import React, { useState, useEffect } from 'react';
import '../CSS/AdminDashboard.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlusCircle, FaList, FaBox, FaImage } from 'react-icons/fa';

const AdminDashboard = () => {
    const [view, setView] = useState('addItem');
    const [items, setItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [paymentProofs, setPaymentProofs] = useState([]);
    const [title, setTitle] = useState('');
    const [cost, setCost] = useState('');
    const [imgSrc, setImgSrc] = useState('');
    const [altText, setAltText] = useState('');
    const [category, setCategory] = useState('Snacks');

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/snacks');
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const fetchPaymentProofs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/payment-proof');
            setPaymentProofs(response.data);
        } catch (error) {
            console.error('Error fetching payment proofs:', error);
        }
    };

    useEffect(() => {
        fetchItems();
        fetchOrders();
        fetchPaymentProofs();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newItem = { title, cost, imgSrc, altText, category };

        try {
            await axios.post('http://localhost:5000/api/snacks', newItem);
            toast.success('Item added successfully!');
            setTitle('');
            setCost('');
            setImgSrc('');
            setAltText('');
            setCategory('Snacks');
            fetchItems();
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    const renderForm = () => (
        <div className="form-container1">
            <h1>Add New Item</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group1">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group1">
                    <label htmlFor="cost">Cost:</label>
                    <input
                        type="text"
                        id="cost"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group1">
                    <label htmlFor="imgSrc">Image URL:</label>
                    <input
                        type="text"
                        id="imgSrc"
                        value={imgSrc}
                        onChange={(e) => setImgSrc(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group1">
                    <label htmlFor="altText">Alt Text:</label>
                    <input
                        type="text"
                        id="altText"
                        value={altText}
                        onChange={(e) => setAltText(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group1">
                    <label htmlFor="category">Category:</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="Snacks">Snacks</option>
                        <option value="Chocolates">Chocolates</option>
                    </select>
                </div>
                <button type="submit" className="btn-submit1">Add Item</button>
            </form>
        </div>
    );

    const renderManageItems = () => (
        <div className="items-list1">
            <h1>Manage Items</h1>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        <strong>{item.title}</strong> - ₹{item.cost} <br />
                        <img src={item.imgSrc} alt={item.altText} width="100" />
                    </li>
                ))}
            </ul>
        </div>
    );

    const renderPaymentProofs = () => (
        <div className="payment-proof-list1">
            <h1>Payment Proofs</h1>
            <div className="proof-card-container1">
                {paymentProofs.map(proof => (
                    <div key={proof.id} className="proof-card1">
                        <strong>Name:</strong> {proof.name} <br />
                        <strong>Transaction ID:</strong> {proof.transactionId} <br />
                        <img
                            src={`http://localhost:5000/uploads/api/${proof.paymentImage}`}
                            alt="Payment Image"
                            className="payment-image1"
                            width="150"
                        />
                        <strong>Timestamp:</strong> {new Date(proof.timestamp).toLocaleString()}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderViewOrders = () => (
        <div className="orders-list1">
            <h1>View Orders</h1>
            <ul>
                {orders.map(order => (
                    <li key={order.id} className="order-card1">
                        <strong>Username:</strong> {order.name} <br />
                        <strong>Cart Items:</strong>
                        {order.cartItems && order.cartItems.length > 0 ? (
                            <ul>
                                {order.cartItems.map((item, index) => (
                                    <li key={index}>
                                        {item.title} - ₹{item.cost} (Quantity: {item.quantity})
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No items in the cart</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );




    return (
        <div className="admin-container1">
            <div className="topbar1">
                <h2>Admin Panel</h2>
                <ul>
                    <li onClick={() => setView('addItem')}>
                        <FaPlusCircle /> Add New Item
                    </li>
                    <li onClick={() => setView('manageItems')}>
                        <FaList /> Manage Items
                    </li>
                    <li onClick={() => setView('viewOrders')}>
                        <FaBox /> View Orders
                    </li>
                    <li onClick={() => setView('viewProofs')}>
                        <FaImage /> View Payment Proofs
                    </li>
                </ul>
            </div>

            <div className="content1">
                {view === 'addItem' && renderForm()}
                {view === 'manageItems' && renderManageItems()}
                {view === 'viewProofs' && renderPaymentProofs()}
                {view === 'viewOrders' && renderViewOrders()}  {/* Add this line */}
            </div>

            <ToastContainer />
        </div>
    );
};

export default AdminDashboard;
