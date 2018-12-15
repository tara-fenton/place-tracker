const { Place, User } = require('./models');

async function createPlaces() {
  await User.destroy({ where: {} });
  try {
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
  } catch(e) {
    console.log(e);
  }
}

async function createUsers() {
  await User.destroy({ where: {} });
  try {
    const user = await User.bulkCreate([
      {
        username: 'tara',
        password: 'tara',
      },
      {
        username: 'john',
        password: 'john',
      }
    ]);
  } catch(e) {
    console.log(e);
  }
}

async function seed() {
  try {
    await createPlaces();
    await createUsers();
  } catch (e) {
    console.log(e);
  } finally {
    process.exit();
  }
}

seed();
