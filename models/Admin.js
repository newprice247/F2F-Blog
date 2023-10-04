const{ Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Admin extends Model {}

Admin.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [12]
            }
        }
    },
    {
        hooks: {
            //Sets up beforeCreate and beforeUpdate hooks to hash the password before the object is created or updated
            async beforeCreate(newAdminData) {
                newAdminData.password = await bcrypt.hash(newAdminData.password, 10);
                return newAdminData
            },
            async beforeUpdate(updatedAdminData) {
                updatedAdminData.password = await bcrypt.hash(updatedAdminData.password, 10);
                return updatedAdminData
            }
    }
},
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName:'admin'
    }
); 


module.exports = Admin;