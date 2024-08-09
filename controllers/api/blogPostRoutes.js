// Imports
const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a blog post
router.post('/', withAuth, async (req, res) => {
    try {
        const newBlogPost = await BlogPost.create({
            ...req.body,
            user_id: req.session.user_id
        })

        res.status(200).json(newBlogPost);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Edit an existing blog
router.post('/:id', withAuth, async (req, res) => {
    try {
        const blogPostData = await BlogPost.update(req.body, {
            where: {
                id: req.params.id
            }
        })

        if (!blogPostData) {
            res.status(400).json({message: `There is no blog post with that id.`})
            return;
        } 

        res.status(200).json(blogPostData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Delete a blog post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const blogPostData = await BlogPost.destroy({
            where: {
                id: req.params.id
            }
        })

        if (!blogPostData) {
            errors.status(400).json({message: `There is no blog post with that if.`});
            return;
        }

        console.log('Blog post deleted!');
        res.status(200).json(blogPostData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Export
module.exports = router;