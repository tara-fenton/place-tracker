const express = require('express');
const bcrypt = require('bcrypt');
const { passport, sign } = require('../auth');
const { User } = require('../models');

const usersRouter = express();

usersRouter.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

usersRouter.get('/:id', async (req, res) => {
  try {
    const thisUser = await User.findByPk(req.params.id);
    res.json(thisUser);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

usersRouter.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    const { id, username, password } = user.dataValues;
    const token = sign({
      id,
      username,
      password
    });
    res.json({user, token});
  } catch(e) {
    console.log(e);
    res.status(500).json({msg: e.message});
  }
});

usersRouter.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.find({ where: { name } });
    const passwordValid = await bcrypt.compare(password, user.password);
    const { id } = user;
    if (passwordValid) {
      const token = sign({
        id,
        name,
      });
      res.json({ token });
    } else {
      throw Error('Invalid credentials');
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

// usersRouter.get('/currentuser', passport.authenticate('jwt', { session: false }), (req, res) => {
//   res.json({ msg: 'logged in', user: req.user });
// });

// usersRouter.delete('/:id', async (req, res) => {
//   try {
//     const deleteThis = await User.destroy({ where: { id: req.params.id } });
//     res.json(deleteThis);
//   } catch (e) {
//     // eslint-disable-next-line no-console
//     console.error(e);
//     res.status(500).json({ message: e.message });
//   }
// });
//
// usersRouter.put('/:id', async (req, res) => {
//   try {
//     const info = req.body;
//     const user = await User.findByPk(req.params.id);
//     user.update(info);
//     res.json(user);
//   } catch (e) {
//     // eslint-disable-next-line no-console
//     console.error(e);
//     res.status(500).json({ message: e.message });
//   }
// });

module.exports = {
  usersRouter
};
