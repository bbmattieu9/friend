"use strict";

// import express from 'express';
const express = require('express');

const debug = require('debug'); // import debug from 'debug';


const app = express();
const PORT = 9001;
app.get('/', (req, res) => res.send('My API is working'));
app.listen(PORT, () => {
  debug("Server is running on PORT ".concat(PORT));
});