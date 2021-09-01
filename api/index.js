require("dotenv").config();
require("../config/database").connect();
const express = require("express");
const cors = require('cors');
const authRouter = require('./auth');
const coreRouter = require('./core');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/core', coreRouter);


module.exports = app;