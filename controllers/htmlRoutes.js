const router = require('express').Router();
const path = require('path');

router.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/login.html'))
})

router.get('/about.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/about.html'))
})

router.get('/contact.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/contact.html'))
})

router.get('/crud.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/crud.html'))
})

router.get('/blog.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/blog.html'))
})

router.get('/resources.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/resources.html'))
})

router.get('/teambio.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/teambio.html'))
})

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/blog.html'))
})

module.exports = router;