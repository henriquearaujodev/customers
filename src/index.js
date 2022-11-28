require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

// connection to db
require('./db/connection');

// middlewares globals
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// routes
const router = require('./routes/Router');
app.use(router);

const port = process.env.SERVER_PORT;
app.listen(port, () => console.log(`Server running on port ${port}.`));
