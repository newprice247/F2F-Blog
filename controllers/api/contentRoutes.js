const router = require('express').Router();
const {User, Content} = require('../../models');

router.get('/', async (req, res) => {
    try {
        const contentData = await Content.findAll({
            include: [{model: User}],
            exclude: [{model: User, attributes: ['password']}]
        });
        res.status(200).json(contentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;