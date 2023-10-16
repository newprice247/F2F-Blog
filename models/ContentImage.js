const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class ContentImage extends Model {}

ContentImage.init(
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

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        data: {
            type: DataTypes.BLOB('long'),
            allowNull: false,
        },

        content_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'content',
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
        modelName: 'content_image',
    }
);

module.exports = ContentImage;