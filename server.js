const express = require('express');
const cors = require('cors');
const multer = require('multer'); // For handling file uploads
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve files from 'uploads'

// Multer setup for file uploads
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only images are allowed.'));
        }
    }
});

// Sample data storage
// Data storage
let snacks = [
    // LAYS products
    { id: 1, imgSrc: "https://www.lays.com/sites/lays.com/files/2022-05/XL%20Lays%20Flamin%20Hot%20New.png", altText: "LAYS Flamin Hot", title: "LAYS Flamin Hot", cost: "₹50", category: "Snacks" },
    { id: 2, imgSrc: "https://i.pinimg.com/736x/2d/6b/7d/2d6b7dad0880cf5ac871e4f3de5f1515.jpg", altText: "LAYS Spanish Tomato Tango", title: "LAYS Spanish Tomato Tango", cost: "₹40", category: "Snacks" },
    { id: 3, imgSrc: "https://img.thecdn.in/143849/1667654333908_SKU-0462_0.png?", altText: "LAYS Classic Salted", title: "LAYS Classic Salted", cost: "₹35", category: "Snacks" },
    { id: 4, imgSrc: "https://www.lays.com/sites/lays.com/files/2020-11/sour-cream.jpg", altText: "LAYS Cream & Onion", title: "LAYS Cream & Onion", cost: "₹45", category: "Snacks" },
    { id: 5, imgSrc: "https://5.imimg.com/data5/SELLER/Default/2023/5/305701388/JM/OP/LA/116880623/lays-magic-masala-chips.jpg", altText: "LAYS Magic Masala", title: "LAYS Magic Masala", cost: "₹40", category: "Snacks" },
    // Dairy Milk products
    { id: 6, imgSrc: "https://www.jiomart.com/images/product/original/rvo8ii7wex/cadbury-dairy-milk-chocolate-bar-family-pack-123-g-pack-of-3-air-tight-storage-box-product-images-orvo8ii7wex-p602068023-0-202306020258.jpg?im=Resize=(1000,1000)", altText: "Dairy Milk", title: "Dairy Milk", cost: "₹80", category: "Chocolates" },
    { id: 7, imgSrc: "https://www.jiomart.com/images/product/original/rvo8ii7wex/cadbury-dairy-milk-chocolate-bar-family-pack-123-g-pack-of-3-air-tight-storage-box-product-images-orvo8ii7wex-p602068023-0-202306020258.jpg?im=Resize=(1000,1000)", altText: "Snack 7", title: "Snack 7", cost: "₹55", category: "Chocolates" },
    { id: 8, imgSrc: "https://www.jiomart.com/images/product/original/rvo8ii7wex/cadbury-dairy-milk-chocolate-bar-family-pack-123-g-pack-of-3-air-tight-storage-box-product-images-orvo8ii7wex-p602068023-0-202306020258.jpg?im=Resize=(1000,1000)", altText: "Snack 8", title: "Snack 8", cost: "₹60", category: "Chocolates" },
    { id: 9, imgSrc: "https://www.jiomart.com/images/product/original/rvo8ii7wex/cadbury-dairy-milk-chocolate-bar-family-pack-123-g-pack-of-3-air-tight-storage-box-product-images-orvo8ii7wex-p602068023-0-202306020258.jpg?im=Resize=(1000,1000)", altText: "Snack 9", title: "Snack 9", cost: "₹65", category: "Chocolates" },
    { id: 10, imgSrc: "https://www.jiomart.com/images/product/original/rvo8ii7wex/cadbury-dairy-milk-chocolate-bar-family-pack-123-g-pack-of-3-air-tight-storage-box-product-images-orvo8ii7wex-p602068023-0-202306020258.jpg?im=Resize=(1000,1000)", altText: "Snack 10", title: "Snack 10", cost: "₹70", category: "Chocolates" },
    { id: 11, imgSrc: "https://www.jiomart.com/images/product/original/rvo8ii7wex/cadbury-dairy-milk-chocolate-bar-family-pack-123-g-pack-of-3-air-tight-storage-box-product-images-orvo8ii7wex-p602068023-0-202306020258.jpg?im=Resize=(1000,1000)", altText: "Snack 11", title: "Snack 11", cost: "₹75", category: "Chocolates" }
    // Add more snacks as needed
];
let cart = [];
let paymentProofs = [];
let orders = [];

// Fetch snacks based on category (if provided)
app.get('/snacks', (req, res) => {
    const { category } = req.query;
    if (category) {
        const filteredSnacks = snacks.filter(snack => snack.category === category);
        res.json(filteredSnacks);
    } else {
        res.json(snacks);
    }
});

// Create a new snack
app.post('/snacks', (req, res) => {
    const newSnack = { id: snacks.length + 1, ...req.body };
    snacks.push(newSnack);
    res.status(201).json(newSnack);
});

// Place a new order (updated to ensure cart items are handled correctly)
app.post('/orders', (req, res) => {
    const { name, cartItems, transactionId } = req.body;

    if (!name || !cartItems || !transactionId) {
        return res.status(400).json({ message: 'Name, transaction ID, and cart items are required.' });
    }

    let parsedCartItems = cartItems;
    if (typeof cartItems === 'string') {
        try {
            parsedCartItems = JSON.parse(cartItems);
        } catch (err) {
            return res.status(400).json({ message: 'Invalid cart items format.' });
        }
    }

    const newOrder = {
        id: orders.length + 1,
        name,
        cartItems: parsedCartItems,
        transactionId,
        timestamp: new Date(),
    };

    orders.push(newOrder);
    res.status(201).json(newOrder);
});

// Submit payment proof (updated to create order and clear cart)
// Submit payment proof and create an order
app.post('/payment-proof', upload.single('paymentImage'), (req, res) => {
    const { name, transactionId } = req.body;
    if (!name || !transactionId || transactionId.length < 14) {
        return res.status(400).send('Name and valid transaction ID are required');
    }

    // Create payment proof
    const paymentProof = {
        id: paymentProofs.length + 1,
        name,
        transactionId,
        paymentImage: req.file.filename,
        timestamp: Date.now(),
    };

    paymentProofs.push(paymentProof);

    // Create an order with the current cart items
    const cartItems = cart.map(item => ({
        title: item.snack.title,
        cost: item.snack.cost,
        quantity: item.quantity
    }));

    const newOrder = {
        id: paymentProof.id,
        name,
        cartItems,
        transactionId,
        timestamp: new Date(),
    };

    orders.push(newOrder);
    cart = []; // Clear cart after placing an order

    res.status(201).send(paymentProof);
});


// Fetch payment proofs
app.get('/payment-proof', (req, res) => {
    res.json(paymentProofs);
});

// Fetch all orders
app.get('/orders', (req, res) => {
    res.json(orders);
});

// Cart routes
app.get('/cart', (req, res) => {
    res.json(cart);
});

app.post('/cart', (req, res) => {
    const { snackId, quantity = 1 } = req.body;
    const snack = snacks.find(s => s.id === snackId);

    if (!snack) {
        return res.status(404).json({ message: 'Snack not found' });
    }

    const cartItem = { id: cart.length + 1, snack, quantity };
    cart.push(cartItem);
    res.status(201).json(cartItem);
});

// Remove item from cart
app.delete('/cart/:id', (req, res) => {
    const { id } = req.params;
    cart = cart.filter(item => item.id !== parseInt(id));
    res.status(200).json({ message: 'Item removed from cart' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

