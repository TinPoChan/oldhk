const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

router.post('/', async (req, res) => {
    const { username, password } = req.body

    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({
        error: 'username must be unique'
      })
    }

    const saltRounds = 10
    const hash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        passwordHash: hash,
    })

    const savedUser = await user.save()

    res.status(201).send(savedUser)
})

module.exports = router