const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: 'place_tracker_db',
  dialect: 'postgres',
  operatorsAliases: false,
  define: {
    underscored: true
  }
});

const Places = sequelize.define('places', {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  visited: Sequelize.BOOLEAN,
  address: Sequelize.STRING
});

module.exports = {
  sequelize,
  Places
}
