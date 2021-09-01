require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const authRouter = require('./api/auth/auth.router')
const coreRouter = require('./api/core/core.router')

const app = express();

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/core', coreRouter);


module.exports = app;