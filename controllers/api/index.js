const router = require('express').Router();
const userRoutes = require('./userRoutes');
const contentRoutes = require('./contentRoutes');
const resourceRoutes = require('./resourceRoutes');

router.use('/users', userRoutes);
router.use('/content', contentRoutes);
router.use('/resources', resourceRoutes);


module.exports = router;