const router = require('express').Router();
const apiRoutes = require('./api');
const htmlRoutes = require('./htmlRoutes');
const imageRoutes = require('./image');

router.use('/api', apiRoutes);

router.use('/', htmlRoutes);

router.use('/images', imageRoutes)

module.exports = router;