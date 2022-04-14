const express = require('express');
const router = express.Router();
const axios = require('axios');
const { response } = require('express');
const { CLIENT_ID, CLIENT_SECRET } = process.env;

router.get('/', (req, res) => {
  const params = `client_id=${CLIENT_ID}&redirect_uri=http://127.0.0.1:3000/login_callback`;

  res.render('pages/index', { params });
});

router.get('/login_callback', (req, res) => {
  const { code } = req.query;
  const data = {};
  const queryString = {
    params: {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code
    }
  };

  axios.post('https://github.com/login/oauth/access_token', data, queryString)
    .then(response => {
      console.log(`===> Response status: ${ response.status }`);
      res.render('pages/logged_in', { token: response.data });
    })
    .catch(error => res.send(error));
});

module.exports = router;
