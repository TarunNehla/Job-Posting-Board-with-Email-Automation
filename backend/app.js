const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8080;
require('./models/dbConnection');
const authRouter = require('./routes/authrouter')
const jobRouter = require('./routes/jobRouter');
const mailRouter = require('./routes/mailRouter');
const cors = require('cors');
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

app.use(express.static('dist'))

app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
    res.send('hello from backend');
})

app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK',
        uptime: process.uptime()
    });
});

app.use(middleware.requestLogger)

app.use('/auth', authRouter )

app.use('/api', jobRouter);

app.use('/mail', mailRouter)



app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app