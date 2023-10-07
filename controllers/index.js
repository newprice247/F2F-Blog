const router = require('express').Router();
const apiRoutes = require('./api');
const htmlRoutes = require('./htmlRoutes');
const webRoutes = require('./web');

router.use('/api', apiRoutes);

router.use('/', htmlRoutes);

router.use('/images', webRoutes)

module.exports = router;