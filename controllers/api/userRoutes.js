const router = require('express').Router();
const { User, Content, Resource, Image } = require('../../models');

// GET /api/users
router.get('/', async (req, res) => {
    try {
        // Get all users, excluding their password
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
             include: [{model: Content, Resource, Image}]
        });
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Handles user login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
        if (userData.email !== req.body.email) {
            res.statusText = 'Incorrect email';
            res.status(400)
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.statusText = 'Incorrect password';
            res.status(400)
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json({ message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Handles user logout
router.get('/logout', async (req, res) => {
    try {
        if (req.session.logged_in) {
            req.session.destroy(() => {
                res.redirect('/');
            }
            );
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Handles getting user's information for the POST page
router.get('/profile', async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Content, Resource }]
        });
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Handles getting user's blog posts for the POST page
router.get('/postHistory', async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Content }]
        });
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Handles registering a new user
router.post('/register', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json({ message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Checks if user is logged in, so that they can access the POST page and edit their own posts
router.get('/loggedInUser', async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            include: [{ model: Content, Resource }],
            attributes: { exclude: ['password'] }
        });
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE /api/users/":id"
router.delete('/:id', async (req, res) => {
    try {
        // Delete a user by id
        const userData = await User.destroy({
            where: { id: req.params.id }
        });
        // If no user is found, return an error
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;