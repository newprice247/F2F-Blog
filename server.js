require('dotenv').config();

const express = require('express')
const sequelize = require('./config/connection')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const path = require('path')

const routes = require('./controllers')

const app = express()
const models = require('./models')
// const initRoutes = require('./controllers/web')
// initRoutes(app)

const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'f2f-secret',
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict'
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}

// const cors=require("cors");
// const corsOptions ={
//    origin:'*', 
//    credentials:true,            //access-control-allow-credentials:true
//    optionSuccessStatus:200,
// }

// app.use(cors(corsOptions)) // Use this after the variable declaration
// // const hbs = exphbs.create({ })

app.use(session(sess))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(routes)


sequelize.sync( ).then(() => {
    app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`))
    })