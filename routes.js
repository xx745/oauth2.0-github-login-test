const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('HOME');
});

router.get('/authorize', (req, res) => {
  res.send('AUTHORIZE');
});

router.get('/login_callback', (req, res) => {
  res.send('Login callback');
});

module.exports = router;
