const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Content extends Model { }

Content.init(
    {
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        },
        title: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        content: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'content',
    }
    );

module.exports = Content;