const express = require('express');
const { Place } = require('../models');
const placesRouter = express();

placesRouter.get('/', async (req, res) => {
  try {
    const places = await Place.findAll({});
    res.json(places);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message});
  }
});

placesRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const place = await Place.findByPk(id);
    res.json(place);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message});
  }
});

placesRouter.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const place = await Place.findByPk(id);
    if (place) await place.destroy();
    res.json({ message: `Student with id ${id} deleted`});
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message});
  }
});

placesRouter.post('/', async (req, res) => {
  try {
    const place = await Place.create(req.body);
    res.json(place);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message});
  }
});

module.exports = {
  placesRouter
};
