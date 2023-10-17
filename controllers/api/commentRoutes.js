const router = require('express').Router();
const {User, Content, Comment} = require('../../models');

// Handles getting all comments for the blog page and attaching them to the content they belong to
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [
                {model: User, attributes: ['username']},
                {model: Content}
            ],
            exclude: [{model: User, attributes: ['password']}]
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Handles creating new comments and attaching them to the logged in user as well as the content they belong to
router.post('/', async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,});
  
      res.status(200).json(newComment);
      // }
    } catch (err) {
      res.status(400).json(err);
    }
  });
module.exports = router