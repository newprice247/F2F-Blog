require('dotenv').config();

const express = require('express')
const sequelize = require('./config/connection')
// const session = require('express-session')
// const SequelizeStore = require('connect-session-sequelize')(session.Store)

const path = require('path')

// const exphbs = require('express-handlebars')
// const routes = require('./controllers')

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

// app.use(routes)

sequelize.sync( ).then(() => {
    app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`))
    })