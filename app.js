const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Importing cors middleware
const app = express();

app.use(bodyParser.json());
app.use(cors());  // Enabling CORS

// Simulated database
let landListings = [];

// Endpoint to add a land listing
app.post('/api/land', (req, res) => {
    const { sellerName, contact, area, pricePerSqFt, coordinates } = req.body;

    if (!sellerName || !contact || !area || !pricePerSqFt || !coordinates) {
        return res.status(400).send({ error: 'All fields are required.' });
    }

    const newListing = {
        id: landListings.length + 1,
        sellerName,
        contact,
        area,
        pricePerSqFt,
        coordinates,
        totalPrice: area * pricePerSqFt
    };

    landListings.push(newListing);
    res.status(201).send(newListing);
});

// Endpoint to retrieve all land listings
app.get('/api/land', (req, res) => {
    res.send(landListings);
});

// Endpoint to retrieve a specific land listing by ID
app.get('/api/land/:id', (req, res) => {
    const listing = landListings.find(l => l.id === parseInt(req.params.id));
    if (!listing) return res.status(404).send({ error: 'Listing not found.' });
    res.send(listing);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
