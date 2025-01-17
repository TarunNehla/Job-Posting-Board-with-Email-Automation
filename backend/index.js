const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8080;
require('./models/dbConnection');
const authRouter = require('./routes/authrouter')
const cors = require('cors');

app.use(cors());

app.get('/', (req,res) => {
    res.send('hello from backend');
})

app.use('/auth', authRouter )

app.listen(PORT, ()=> {
    console.log(`server is listening on port ${PORT}`);
})