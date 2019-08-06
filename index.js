const express = require('express');
const db = require('./db/db');

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));