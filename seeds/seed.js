require('dotenv').config();

const sequelize = require('../config/connection');
const { User, Admin, Content } = require('../models');

const userData = require('./userData.json');
const adminData = require('./adminData.json');
const contentData = require('./contentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    
    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    await Admin.create(adminData, {
        individualHooks: true,
        returning: true,
    });

    await Content.bulkCreate(contentData, {
        individualHooks: true,
        returning: true,
    });
}

seedDatabase();
    