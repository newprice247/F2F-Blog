const router = require('express').Router();
const userRoutes = require('./userRoutes');
const contentRoutes = require('./contentRoutes');
const resourceRoutes = require('./resourceRoutes');
const commentRoutes = require('./commentRoutes')

router.use('/users', userRoutes);
router.use('/content', contentRoutes);
router.use('/resources', resourceRoutes);
router.use('/comments', commentRoutes)


module.exports = router;