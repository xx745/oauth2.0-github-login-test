const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const routes = require('./routes.js');
const { PORT, CLIENT_ID, CLIENT_SECRET } = process.env;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
