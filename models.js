const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: 'place_tracker_db',
  dialect: 'postgres',
  operatorsAliases: false,
  define: {
    underscored: true
  }
});

const Place = sequelize.define('places', {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  visited: Sequelize.BOOLEAN,
  address: Sequelize.STRING
});

const User = sequelize.define('users', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

module.exports = {
  sequelize,
  Place,
  User
}
