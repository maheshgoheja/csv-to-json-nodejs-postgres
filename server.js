const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const config = require('./app/config/config.js');

const app = express()

var corsOptions = {
    origin: '*'
}

// middlewares
app.use(morgan('dev'));

app.use(cors(corsOptions))

app.use(express.json())

app.use(express.urlencoded({extended: true}))

// testing api
app.get('/', (req, res) => {
    res.json({message: 'Hi there, welcome to this csv-to-json converter application.'});
});

// api routes
const converterRouter = require('./app/routes/converter.routes.js');
app.use('/api', converterRouter);


// port
const PORT = config.PORT;

// server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});