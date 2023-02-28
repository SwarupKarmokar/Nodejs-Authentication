// importing all neccessery pakage and file 
const express = require('express');
const cookieParser = require('cookie-parser');
var expressLayouts = require('express-ejs-layouts');
const port = 8000;

const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./passport/passport-local-strategy');
const MongoStore = require('connect-mongo');

// google authentication 
const passportGoogle = require('./passport/passport-google-oauth2-strategy')

// middleware for flash message 
const flash = require('connect-flash');
const customMware = require('./middleware/middleware');
const bodyParser = require('body-parser');

// CREATING SERVER APP 
const app = express();

// ADDING STATIC FILE 
app.use(express.static('assets'));

// passport.use(strategy);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// connecting layouts 
app.use(expressLayouts);

// setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// creating session 
app.use(session({
    name: 'issueTracker',
    secret: '#skey',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({

        mongoUrl: 'mongodb://127.0.0.1:27017/password_db',
        autoRemove: 'disabled'

    },
        function (err) {
            console.log(err || 'error in connect - mongodb setup ok');
        }
    )
}));

// middleware for passport setup 
app.use(passport.initialize());
app.use(passport.session());


app.use(passport.setAuthenticatedUser)

app.use(flash());
app.use(customMware.setFlash)
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// CONNECTING ROUTES 
app.use('/', require('./routes'));


// CONNECTION WITH PORT 
app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`yup server is running at port: http://localhost:${port} `);
})