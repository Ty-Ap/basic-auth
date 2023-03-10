'use strict';

require('dotenv').config();
const {Sequelize, DataTypes} = require('sequelize');
const user = require('./user');
const Collection = require('./collection');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

const sequelizeDatabase = new Sequelize(DATABASE_URL);

const userModel = user(sequelizeDatabase, DataTypes);

module.exports = {
  sequelizeDatabase,
  userCollection: new Collection(userModel),
};