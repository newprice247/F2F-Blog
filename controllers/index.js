const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// router.get('/', async (req, res) => {
//     res.send('This is the default API route.')
// });

module.exports = router;