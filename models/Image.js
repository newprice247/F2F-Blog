const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Image extends Model {}

Image.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        data: {
            type: DataTypes.BLOB('long'),
            allowNull: false,
        },

        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            },
            allowNull: true,
        }
    },

    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'image',
    }
);

module.exports = Image;