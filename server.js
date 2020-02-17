const express = require('express');

const db = require('./data/dbConfig.js');

const accountRouter = require("./accounts/accountRouter");

const server = express();

server.use(express.json());

server.use("/api/accounts", accountRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Server is running!</h2>`);
  });

module.exports = server;