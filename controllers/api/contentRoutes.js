const router = require('express').Router();
const {User, Content, Comment} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const contentData = await Content.findAll({
            include: [{model: User, attributes: ['username', 'id']}],
            exclude: [{model: User, attributes: ['password']}]
        });
        res.status(200).json(contentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) =>{
    try {
        const contentData = await Content.findByPk(req.params.id, {
            include: [{model: User, attributes: ['username']},
            {model: Comment, attributes: ['comment', 'created_at', 'user_id']}],
            exclude: [{model: User, attributes: ['password']}]
        });
        if (!contentData) {
            res.status(404).json({message: 'No content found with this id!'});
            return;
        }
        res.status(200).json(contentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// router.post('/', async (req, res) =>{
//     try {
//         const contentData = await Content.create(req.body);
//         res.status(200).json(contentData);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

router.post('/', withAuth, async (req, res) => {
    try {
      const newContent = await Content.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newContent);
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.put('/:id', async (req, res) =>{
    try {
        const contentData = await Content.update(req.body, {
            where: {id: req.params.id}
        });
        if (!contentData) {
            res.status(404).json({message: 'No content found with this id!'});
            return;
        }
        res.status(200).json(contentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) =>{
    try {
        const contentData = await Content.destroy({
            where: {id: req.params.id}
        });
        if (!contentData) {
            res.status(404).json({message: 'No content found with this id!'});
            return;
        }
        res.status(200).send('Content deleted!');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;