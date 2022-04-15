const express = require('express');
const router = express.Router();
const axios = require('axios');
const crypto = require('crypto');
const { response } = require('express');
const { CLIENT_ID, CLIENT_SECRET } = process.env;

const CSRF = crypto.randomUUID();

router.get('/', (req, res) => {
  let authUrl = 'https://github.com/login/oauth/authorize?';
  authUrl += `client_id=${CLIENT_ID}&redirect_uri=http://127.0.0.1:3000/login_callback`;
  authUrl += `&state=${CSRF}`;

  res.render('pages/index', { authUrl });
});

router.get('/login_callback', (req, res) => {
  const { code, state } = req.query;
  console.log(`===> State: ${state}, CSRF: ${CSRF}`);

  const data = {};
  const details = {
    params: {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code
    },
    headers: {
      Accept: 'application/json'
    }
  };

  axios.post('https://github.com/login/oauth/access_token', data, details)
    .then(response => {
      console.log(`===> Response status: ${ response.status }`);
      console.log(`===> Response data: ${ JSON.stringify(response.data) }`);

      if ('error' in response.data) {
        throw Error(JSON.stringify(response.data));
      }

      const { access_token, token_type, scope } = response.data;

      res.render('pages/logged_in', { token: JSON.stringify(response.data) });
    })
    .catch(error => {
      res.render('pages/logged_in', { token: error });
    });
});

module.exports = router;
