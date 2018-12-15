const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

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

User.beforeCreate( async (user, options) => {
  const password_digest = await bcrypt.hash(user.password, 10);
  user.password = password_digest;
});

module.exports = {
  sequelize,
  Place,
  User
}
