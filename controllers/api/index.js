// Imports
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogPostRoutes');
const commentRoutes = require('./commentRoutes');

// Middleware
router.use('/users', userRoutes);
router.use('/blog', blogRoutes);
router.use('/comment', commentRoutes);

// Export routes
module.exports = router;