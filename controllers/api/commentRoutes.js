const router = require('express').Router();
const {User, Content, Comment} = require('../../models');
const withAuth = require('../../utils/auth');


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



router.post('/', async (req, res) => {
    try {
      // if (!req.session.logged_in) {
      //   res.redirect('/login');
      // } else {
      const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,});
  
      res.status(200).json(newComment);
      // }
    } catch (err) {
      res.status(400).json(err);
    }
  });

//   router.get('/login', async (req, res) => {
//     try {
//         res.sendFile(path.join(__dirname, '../../public/login.html'));
//     } catch (err) {
//         res.status(500).json(err);
//     }
// }
// );
module.exports = router