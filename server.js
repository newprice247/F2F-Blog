require('dotenv').config();

const express = require('express')
const sequelize = require('./config/connection')
// const session = require('express-session')
// const SequelizeStore = require('connect-session-sequelize')(session.Store)

const path = require('path')

// const exphbs = require('express-handlebars')
const routes = require('./controllers')

const app = express()
const PORT = process.env.PORT || 3001;

// const sess = {
//     secret: 'Tech Blog Secret',
//     resave: false,
//     saveUninitialized: true,
//     store: new SequelizeStore({
//         db: sequelize
//     })
// }

// const hbs = exphbs.create({ })

// app.use(session(sess))

// app.engine('handlebars', hbs.engine)
// app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(routes)


app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, './public/html/login.html'))
})

app.get('/about.html', (req, res) => {
    res.sendFile(path.join(__dirname, './public/html/about.html'))
})

app.get('/contact.html', (req, res) => {
    res.sendFile(path.join(__dirname, './public/html/contact.html'))
})

app.get('/crud.html', (req, res) => {
    res.sendFile(path.join(__dirname, './public/html/crud.html'))
})

app.get('/blog.html', (req, res) => {
    res.sendFile(path.join(__dirname, './public/html/blog.html'))
})

app.get('/resources.html', (req, res) => {
    res.sendFile(path.join(__dirname, './public/html/resources.html'))
})

app.get('/teambio.html', (req, res) => {
    res.sendFile(path.join(__dirname, './public/html/teambio.html'))
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/html/blog.html'))
})

sequelize.sync( ).then(() => {
    app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`))
    })