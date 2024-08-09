// Imports
const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        // Gets all blog posts and join with user data and comment data
        const blogPostData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    attributes: ['comment_body']
                }
            ]
        })

        // Serialize the data
        const blogPosts = blogPostData.map((blogPost) => {
            blogPost.get({ plain: true });
        })

        // Pass serialized data and session into template
        res.render('homepage', {
            blogPosts,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

// Route to find a single post by means of id
router.get('/blogPost/:id', withAuth, async (req, res) => {
    try {
        blogPostData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    include: [User]
                }
            ]
        })

        const blogPost = blogPostData.get({ plain: true });
        console.log(blogPost);

        res.render('blogPost', {
            ...blogPost,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

// Route to let user access the dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: BlogPost,
                    include: [User]
                },
                {
                    model: Comment
                }
            ]
        })

        const user = userData.get({ plain: true });
        console.log(user);

        res.render('dashboard', {
            ...user,
            logged_in: true
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

// Renders create.handlebars -- redirects to /login if not logged in
router.get('/create', async (req, res) => {
    try {
        if (req.session.logged_in) {
            res.render('create', {
                logged_in: req.session.logged_in,
                userId: req.session.user_id
            })
            return
        } else {
            res.redirect('/login');
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

// Route to edit an existing blog post
router.get('/create/:id', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    modle: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    include: [User]
                }
            ]
        })

        const blogPost = blogPostData.get({ plain: true });
        console.log(blogPost);

        if (req.session.logged_in) {
            res.render('edit', {
                ...blogPost,
                logged_in: req.session.logged_in,
                userId: req.session.user_id
            })
            return
        } else {
            res.redirect('/login');
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

// If user is logged in -- redirect them to request another route
router.all('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return
    }
    res.render('login');
})

module.exports = router;