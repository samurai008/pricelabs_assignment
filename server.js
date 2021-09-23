const express = require('express');
const fetchListings = require('./fetchListings');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/listings', async (req, res) => {
  const result = await fetchListings({
    ...req.body,
    server: true,
  });

  res.json(result.listOfProperties);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
