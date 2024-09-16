// Payment.js (frontend)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import paymentQr from '../assets/SampleQR.png';
import '../CSS/Payment.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Payment() {
    const [formVisible, setFormVisible] = useState(false);
    const [proofData, setProofData] = useState({
        name: '',
        transactionId: '',
        paymentImage: null
    });
    const [paymentProofs, setPaymentProofs] = useState([]);
    const [imagePreview, setImagePreview] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProofData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProofData(prevData => ({
                ...prevData,
                paymentImage: file
            }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const fetchPaymentProofs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/payment-proof');
            setPaymentProofs(response.data);
        } catch (error) {
            console.error('Error fetching payment proofs:', error);
        }
    };

    const handleSubmit = async () => {
        if (!proofData.name || !proofData.transactionId || proofData.transactionId.length < 14 || !proofData.paymentImage) {
            toast.error('Please fill all fields correctly.');
            return;
        }

        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        const formData = new FormData();
        formData.append('name', proofData.name);
        formData.append('transactionId', proofData.transactionId);
        formData.append('paymentImage', proofData.paymentImage);
        formData.append('cartItems', JSON.stringify(cartItems));

        try {
            await axios.post('http://localhost:5000/payment-proof', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            await axios.post('http://localhost:5000/orders', {
                name: proofData.name,
                cartItems: JSON.stringify(cartItems),
                transactionId: proofData.transactionId,
            });

            toast.success('Proof and order submitted successfully!');
            setProofData({ name: '', transactionId: '', paymentImage: null });
            setImagePreview('');
            setFormVisible(false);
            localStorage.removeItem('cartItems');
            fetchPaymentProofs();
        } catch (error) {
            console.error('Error submitting proof and order:', error);
            toast.error('Failed to submit proof. Please try again.');
        }
    };

    useEffect(() => {
        fetchPaymentProofs();
    }, []);



    return (
        <div className="payment-container">
            <h2>Payment Page</h2>
            <img src={paymentQr} alt="Payment QR Code" />
            <p>Proceed with your payment by scanning the QR code.</p>
            <button className="proof-button" onClick={() => setFormVisible(true)}>
                Fill Form for Proof
            </button>

            {formVisible && (
                <div className="proof-form">
                    <h3>Submit Proof of Payment</h3>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={proofData.name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="transactionId"
                        placeholder="Transaction ID"
                        value={proofData.transactionId}
                        onChange={handleInputChange}
                    />
                    <input
                        type="file"
                        name="paymentImage"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {imagePreview && (
                        <img src={imagePreview} alt="Payment Preview" className="image-preview" />
                    )}
                    <button onClick={handleSubmit}>Submit Proof</button>
                </div>
            )}

            <div className="payment-proof-list">
                <h3>Payment Proofs</h3>
                <ul>
                    {paymentProofs.map(proof => (
                        <li key={proof.id}>
                            <strong>Name:</strong> {proof.name} <br />
                            <strong>Transaction ID:</strong> {proof.transactionId} <br />
                            {proof.paymentImage && (
                                <img
                                    src={`http://localhost:5000/uploads/${proof.paymentImage}`}
                                    alt="Payment Image"
                                    className="payment-image"
                                />
                            )}
                            <strong>Timestamp:</strong> {new Date(proof.timestamp).toLocaleString()}
                        </li>
                    ))}
                </ul>
            </div>
            <ToastContainer />
        </div>
    );
}
