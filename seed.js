const { Place } = require('./models');

async function seed() {
  const places = await Place.bulkCreate([
    {
      name: 'La Cabana',
      description: 'tropical island',
      visited: true,
      address: 'Aruba',
    },
    {
      name: 'Empire State Building',
      description: 'skyscrapper',
      visited: true,
      address: '350 5th Ave New York, NY',
    },
    {
      name: 'Howl at the Moon',
      description: 'saloon',
      visited: false,
      address: 'New Orleans',
    },
  ]);
  process.exit()
}

seed();
