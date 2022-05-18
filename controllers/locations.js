const router = require('express').Router()
const Location = require('../models/location')

// Get random location from database
router.get('/random', async (req, res) => {
    const locations = await Location.find()
    const random = Math.floor(Math.random() * locations.length)
    res.json(locations[random])
})

//get 3 random location from database that does not contain name_zh
router.get('/random/:name_zh', async (req, res) => {
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


router.get('/', async (req, res) => {
    const locations = await Location.find()
    res.json(locations)
})

router.post('/', async (req, res) => {
    const location = new Location(req.body)
    try {
        await location.save()
        res.status(201).send(location)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.put('/id/:id', async (req, res) => {
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

router.get('/id/:id', async (req, res) => {
    try {
    const location = await Location.findById(req.params.id)
    res.json(location)
    } catch (e) {
        res.status(404).send()
    }
})

router.delete('/id/:id', async (req, res) => {
    try {
        const location = await Location.findByIdAndDelete(req.params.id)
        res.json(location)
    } catch (e) {
        res.status(404).send()
    }
})

module.exports = router