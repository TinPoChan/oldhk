require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path');

require('express-async-errors')

const locationRouter = require('./controllers/locations')
const elementRouter = require('./controllers/elements')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use(cors())
app.use(express.json())
app.use('/api/locations', locationRouter)
app.use('/api/elements', elementRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

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
