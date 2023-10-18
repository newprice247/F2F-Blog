const router = require('express').Router();
const {User, Content, Comment, ContentImage} = require('../../models');

// Handles getting all content for the blog page, as well as the comments and images associated with each blog post
router.get('/', async (req, res) => {
    try {
        const contentData = await Content.findAll({
            include: [{model: User, attributes: ['username', 'id']}, {model: Comment, include: [{model: User, attributes: ['username']}]}, {model: ContentImage}],
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
            {model: Comment, include: [{model: User, attributes: ['username']}]}],
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

// Handles creating new content and attaching it to the logged in user
router.post('/', async (req, res) => {
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

  // Handles editing content from the POST page
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

// Handles deleting content from the POST page
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