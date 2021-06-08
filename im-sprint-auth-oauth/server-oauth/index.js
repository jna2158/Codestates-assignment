const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8080;

const handleCallback = require('./controller/callback')
const handleImages = require('./controller/images')

app.use(express.json());

app.use(
  cors({ origin: true })
);

app.post('/callback', handleCallback);

app.get('/images', handleImages)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
