require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Element = require('./models/element')


app.use(cors())

app.use(express.json())

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});


mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch(err => {
        console.log(err)
    })

app.get('/', async (req, res) => {
    res.send('Hello World')
})

app.get('/elements', async (req, res) => {
    const elements = await Element.find()
    res.json(elements)
})

app.post('/api/elements', async (req, res) => {
    const element = new Element(req.body)
    try {
        await element.save()
        res.status(201).send(element)
    } catch (e) {
        res.status(400).send(e)
    }
})