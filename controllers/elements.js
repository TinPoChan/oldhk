const router = require('express').Router()
const Element = require('../models/element')
// const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

router.get('/', userExtractor, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    const elements = await Element.find()
    res.json(elements)
})

router.get('/id/:id', async (req, res) => {
    try {
        const element = await Element.findById(req.params.id)
        res.json(element)
    } catch (err) {
        res.status(404).json({ message: 'Element not found' })
    }
})

router.post('/', userExtractor, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    const element = new Element(req.body)

    try {
        await element.save()
        res.status(201).send(element)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/id/:id', userExtractor, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

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

router.put('/id/:id', userExtractor, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

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
router.get('/random/', async (req, res) => {
    const elements = await Element.find()
    const random = Math.floor(Math.random() * elements.length)
    res.json(elements[random])
})

// delete all elements from database
router.post('/all', userExtractor, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    try {
        await Element.deleteMany({})
        res.send('All elements deleted')
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router