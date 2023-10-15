const User = require('./User');

const Admin = require('./Admin');

const Content = require('./Content');

const Comment = require('./Comment')

const Resource = require('./Resource');

const Image = require('./Image')

const ContentImage = require('./ContentImage')

User.hasMany(Content, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

User.hasMany(Resource, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Image, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Content.hasMany(Comment, {
    foreignKey: 'content_id',
    onDelete: 'CASCADE'
})

Content.belongsTo(User, {
    foreignKey: 'user_id'
});

Content.hasOne(ContentImage, {
    foreignKey: 'content_id',
    onDelete: 'CASCADE'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

Comment.belongsTo(Content, {
    foreignKey: 'content_id'
})

Resource.belongsTo(User, {
    foreignKey: 'user_id'
});

Image.belongsTo(User, {
    foreignKey: 'user_id'
});

ContentImage.belongsTo(Content, {
    foreignKey: 'content_id'
})



module.exports = { User, Admin, Content, Resource, Image, Comment, ContentImage }