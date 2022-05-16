require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Element = require('./models/element')
const Location = require('./models/location')

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

app.get('/api/elements/id/:id', async (req, res) => {
    try{
        const element = await Element.findById(req.params.id)
        res.json(element)
    } catch(err) {
        res.status(404).json({ message: 'Element not found' })
    }
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

app.delete('/api/elements/id/:id', async (req, res) => {
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

app.put('/api/elements/id/:id', async (req, res) => {
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
app.get('/api/elements/random/', async (req, res) => {
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

// Get random location from database
app.get('/api/locations/random', async (req, res) => {
    const locations = await Location.find()
    const random = Math.floor(Math.random() * locations.length)
    res.json(locations[random])
})

//get 3 random location from database that does not contain name_zh
app.get('/api/locations/random/:name_zh', async (req, res) => {
    const locations = await Location.find()
    const filter_locations = locations.filter(location => location.name_zh !== req.params.name_zh)

    const three_random_not_duplicate = []
    while (three_random_not_duplicate.length < 3) {
        const random = Math.floor(Math.random() * filter_locations.length)
        const random_location = filter_locations[random]
        if (!three_random_not_duplicate.includes(random_location.name_zh)) {
            three_random_not_duplicate.push(random_location.name_zh)
        }
    }
    res.json(three_random_not_duplicate)
})


app.get('/api/locations', async (req, res) => {
    const locations = await Location.find()
    res.json(locations)
})

app.post('/api/locations', async (req, res) => {
    const location = new Location(req.body)
    try {
        await location.save()
        res.status(201).send(location)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.put('/api/locations/id/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    
    try {
        const location = await Location.findById(req.params.id)
        updates.forEach((update) => location[update] = req.body[update])
        await location.save()
        if (!location) {
            return res.status(404).send()
        }
        res.send(location)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/api/locations/id/:id', async (req, res) => {
    try {
    const location = await Location.findById(req.params.id)
    res.json(location)
    } catch (e) {
        res.status(404).send()
    }
})