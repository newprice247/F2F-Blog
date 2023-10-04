const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Admin extends Model { }

Admin.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        }
    },
    {
        hooks: {
            //Sets up beforeCreate and beforeUpdate hooks to hash the password before the object is created or updated
            beforeCreate: async (newAdminData) => {
                newAdminData.password = await bcrypt.hash(newAdminData.password, 10);
                return newAdminData;
            },
            beforeUpdate: async (updatedAdminData) => {
                updatedAdminData.password = await bcrypt.hash(updatedAdminData.password, 10);
                return updatedAdminData;
            },
        },
  
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'admin'
    }
);

module.exports = Admin;