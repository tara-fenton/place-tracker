const express = require('express');

const PORT = process.env.PORT || 3001;

const { Place } = require('./models');
const app = express();

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Place Tracker API'
  });
});

app.get('/places', async (req, res) => {
  try {
    const places = await Place.findAll({});
    res.json(places);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message});
  }
});

app.get('/places/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const place = await Place.findByPk(id);
    res.json(place);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message});
  }
});

app.post('/places', async (req, res) => {
  try {
    //post
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message});
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});