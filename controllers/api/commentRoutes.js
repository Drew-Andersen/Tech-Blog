// Imports
const router = require('express').Router();
const { BlogPost, Comment, User } = require('../../models');

// Create a comment
router.post('/', async (req, res) => {
    try {
        console.log('Made it to comment.');
        const comment = await Comment.create({
            comment_body: req.bofy.comment_body,
            blogPost_id: req.body.blogPost_id,
            user_id: req.session.body.user_id || req.body.user_id
        })

        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Gets all comments
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: BlogPost,
                    attributes: ['id']
                }
            ]
        })
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Update a comment
router.put('/:id', async (req, res) => {
    try {
        const updatedComment = await Comment(req.body, {
            where: {
                id: req.params.id
            }
        })

        if (!updatedComment[0]) {
            res.status(400).json({message: `No comment with that id.`});
            return;
        } 

        console.log('Comment updated');
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Delete a comment
router.delete('/:id', async (req, res) => {
    try {
        const comment = await Comment.destrpy({
            where: {
                id: req.params.id
            }
        })

        if (!comment) {
            res.status(400).json({message: `No comment with that id.`});
            return;
        }
        console.log('Comment deleted');
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Export
module.exports = router;