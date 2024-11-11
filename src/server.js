const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.js');  
const productRoutes = require('./routes/products.js');
const bcrypt = require('bcrypt');
const User = require('./models/User.js'); 
const cors = require('cors');

const app = express();
app.use(cors());

// Middleware for JSON parsing
app.use(express.json());
const PORT = 5000;
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

// Database connection
mongoose.connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Database connected'))
.catch(err => console.error('Database connection error:', err)); 

// Routes

app.get('/', (req, res) => {
    res.send('Server is running');
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
