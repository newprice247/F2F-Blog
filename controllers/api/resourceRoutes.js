const router = require('express').Router();
const {User, Resource} = require('../../models');

router.get('/', async (req, res) => {
    try {
        const resourceData = await Resource.findAll({
            include: [{model: User, attributes: ['username']}],
            exclude: [{model: User, attributes: ['password']}]
        });
        res.status(200).json(resourceData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) =>{
    try {
        const resourceData = await Resource.findByPk(req.params.id, {
            include: [{model: User, attributes: ['username']}],
            exclude: [{model: User, attributes: ['password']}]
        });
        if (!resourceData) {
            res.status(404).json({message: 'No resource found with this id!'});
            return;
        }
        res.status(200).json(resourceData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) =>{
    try {
        const resourceData = await Resource.create(req.body);
        res.status(200).json(resourceData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;