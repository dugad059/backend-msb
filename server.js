// Dependencies
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const brandsController = require('./controllers/brands')


const app = express();

// Configure Server Settings
require('dotenv').config();
app.set('view engine', 'ejs');

const { MONGODB_URL, PORT = 4000 } = process.env;

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

app.get('/', (req, res) => {
    res.send('IT WORKS!!!')
})

// Controllers
app.use('/brands', brandsController);

// Listener
app.listen(PORT, () => {
    console.log(`Express is listening on port: ${PORT}`)
})


