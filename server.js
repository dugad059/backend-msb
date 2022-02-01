// Dependencies
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const brandsController = require('./controllers/brands')
const admin = require('firebase-admin');

const app = express();

// Configure Server Settings
require('dotenv').config();
app.set('view engine', 'ejs');

const { MONGODB_URL, PORT = 4000, GOOGLE_CREDENTIALS } = process.env;

// Authorization parsing Google Credentials
const serviceAccount = JSON.parse(GOOGLE_CREDENTIALS);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


// Establish Connection to MongoDB
mongoose.connect(MONGODB_URL);

// Database Connection Error/Success
const db = mongoose.connection;
db
.on('connected', ()=> console.log('Connected to MongoDB'))
.on('error', (err)=> console.log('MongoDB Error: ' + err.message))
.on('disconnected', ()=> console.log('Disconnected from MongoDB'))

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Authorization
app.use(async function(req, res, next) {
    try {
        const token = req.get('Authorization');
        if(!token) return next();

        const user = await admin.auth().verifyIdToken(token.replace('Bearer ', ''));
        if(!user) throw new Error('something went wrong');

        req.user = user;
        next();
    } catch (error) {
        res.status(400).json(error);
    }
})

// Testing Route
app.get('/', (req, res) => {
    res.send('IT WORKS!!!')
})

// Controllers
app.use('/brands', brandsController);

// Listener
app.listen(PORT, () => {
    console.log(`Express is listening on port: ${PORT}`)
})

// test
