const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()

const User = require('../models/User')

router.post('/register', async (req, res) => {
    try {
        // password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        // new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        const user = await User.create(newUser)
        res.status(200).json(user)

    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            res.status(400).json("Wrong username or password")
            return
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) {
            res.status(400).json("Wrong username or password")
            return
        }

        res.status(200).json({ _id: user._id, username: user.username })
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router