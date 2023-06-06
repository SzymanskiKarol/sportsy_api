const express = require('express')

const router = express.Router()

const Pin = require('../models/Pin')

router.post('/', async (req, res) => {
    const newPin = req.body;

    try {
        const savedPin = await Pin.create(newPin)
        res.status(200).json(savedPin)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/', async (req, res) => {
    try {
        const pins = await Pin.find()
        res.status(200).json(pins)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router