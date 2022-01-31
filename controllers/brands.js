const express = require('express');
const brandsRouter = express.Router();
const Brand = require('../models/brand')

// Index
brandsRouter.get('/', async (req, res) => {
    try {
        res.json(await Brand.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
});

// Create
brandsRouter.post('/', async(req, res) => {
    try {
        res.json(await Brand.create(req.body))
    } catch (error) {
        res.status(400).json(error);
    }
})

// Update 
brandsRouter.put('/:id', async (req, res) => {
    try {
        res.json(await Brand.findByIdAndUpdate(req.params.id, req.body, {new: true}))
    } catch (error) {
        res.status(400),json(error);
    }
})

// Delete
brandsRouter.delete('/:id', async(req, res) => {
    try {
        res.json(await Brand.findByIdAndDelete(req.params.id))
    } catch (error) {
        res.status(400),json(error);
    }
})


module.exports = brandsRouter