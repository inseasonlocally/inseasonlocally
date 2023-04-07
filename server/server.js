const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded());

app.use('/', express.static('../client/index.html'));

app.listen(PORT);

module.exports = app;
