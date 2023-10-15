const router = require('express').Router();
const {User, Resource} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const resourceData = await Resource.findAll({
            include: [{model: User, attributes: ['username', 'id']}],
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
        if (req.session.user_id === null) {
            res.redirect('/login');
            return;
          }
        const resourceData = await Resource.create({
            ...req.body,
            user_id: req.session.user_id,
          });
        res.status(200).json(resourceData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;