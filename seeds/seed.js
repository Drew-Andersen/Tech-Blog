// Imports
const sequelize = require("../config/connection");
const { User, BlogPost, Comment } = require('../models');

// Require the json files
const userData = require('./userData.json');
const commentData = require('./commentData.json');
const blogPostData = require('./blogPostData.json');

// Seeds database with user/blog/comment Data
const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true
    });

    for (const blogPost of blogPostData) {
        await BlogPost.create({
            ...blogPost,
            user_id: users[Math.floor(Math.random() * users.length)].id
        })
    }

    const comments = await Comment.bulkCreate(commentData);

    process.exit(0);
}

// Seed the database
seedDatabase();