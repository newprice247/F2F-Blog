const router = require('express').Router();
const userRoutes = require('./userRoutes');
const contentRoutes = require('./contentRoutes');

router.use('/users', userRoutes);
router.use('/content', contentRoutes);

module.exports = router;