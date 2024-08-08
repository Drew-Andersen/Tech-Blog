// Imports
const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json(err);
    }
})