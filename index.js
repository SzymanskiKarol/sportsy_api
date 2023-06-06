require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const pinRoute = require('./routes/pins')
const userRoute = require('./routes/users')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
app.use(cors())

app.use("/api/pins", pinRoute)
app.use("/api/users", userRoute)


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db and server started on port:', process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    })
