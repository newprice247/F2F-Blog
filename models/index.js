const User = require('./User');

const Admin = require('./Admin');

const Content = require('./Content');

const Resource = require('./Resource');

User.hasMany(Content, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Resource, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Content.belongsTo(User, {
    foreignKey: 'user_id'
});

Resource.belongsTo(User, {
    foreignKey: 'user_id'
});



module.exports = { User, Admin, Content, Resource }