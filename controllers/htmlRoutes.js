const router = require('express').Router();
const path = require('path');
const withAuth = require('../utils/auth');

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/login.html'))
})

router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/about.html'))
})

router.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/contact.html'))
})

router.get('/crud', withAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/crud.html'))
})

router.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/blog.html'))
})

router.get('/resources', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/resources.html'))
})

router.get('/teambio', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/teambio.html'))
})

router.get('/stanley', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/stanley.html'))
})
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/blog.html'))
})

module.exports = router;