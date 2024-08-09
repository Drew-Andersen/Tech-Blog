const User = require("./User");
const Comment = require('./Comment');
const BlogPost = require('./Post');

// Sets up relationships between the tables and allows joining using sequelize
User.hasMany(BlogPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

BlogPost.belongsTo(User, {
    foreignKey: 'user_id'
});

BlogPost.hasMany(Comment, {
    foreignKey: 'blogPost_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(BlogPost, {
    foreignKey: 'blogPost_id',
    onDelete: 'CASCADE'
})

// Export relationships
module.exports = { User, Comment, BlogPost };