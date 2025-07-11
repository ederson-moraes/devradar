const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routes = require('./routes')
dotenv.config()

const app = express()

mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
    console.log('MongoDB connected')
}).catch(err => {
    console.error('MongoDB connection error:', err)
})



app.use(express.json())
app.use(routes)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is running on:${port}`)
})

