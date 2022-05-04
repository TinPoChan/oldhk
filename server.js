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
    
})

app.get('/api/elements', async (req, res) => {
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

app.delete('/api/elements/:id', async (req, res) => {
    try {
        const element = await Element.findByIdAndDelete(req.params.id)
        if (!element) {
            return res.status(404).send()
        }
        res.send(element)
    } catch (e) {
        res.status(500).send()
    }
})

app.put('/api/elements/:id', async (req, res) => {
    const updates = Object.keys(req.body)

    try {
        const element = await Element.findById(req.params.id)
        updates.forEach((update) => element[update] = req.body[update])
        await element.save()
        if (!element) {
            return res.status(404).send()
        }
        res.send(element)
    } catch (e) {
        res.status(400).send(e)
    }
})

// get random element from database
app.get('/api/elements/random', async (req, res) => {
    const elements = await Element.find()
    const random = Math.floor(Math.random() * elements.length)
    res.json(elements[random])
})

// delete all elements from database
app.post('/api/elements/all', async (req, res) => {
    try {
        await Element.deleteMany({})
        res.send('All elements deleted')
    } catch (e) {
        res.status(500).send()
    }
})
