const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model { }

User.init(
  {
    // /////////////////////////////////////////////////////////////////////////
    // INFO NEEDS TO BE EDITED TO RESEMBLE: comment, url, & tag name
      
    // id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   primaryKey: true,
    //   autoIncrement: true,
    // },
    // username: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // email: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   unique: true,
    //   validate: {
    //     isEmail: true,
    //   },
    // },
    // password: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     len: [6],
    //   },
    // },
    },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'resources',
  }
);

module.exports = resources;