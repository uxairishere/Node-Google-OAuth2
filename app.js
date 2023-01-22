require('dotenv').config();
const express = require('express');
require('./auth');
function isLoggedIn(req,res,next) {
    req.user ? next() : res.sendStatus(401);
}
const app = express();
const session = require('express-session');
const passport = require('passport');

app.use(session({secret: process.env.SESSION_SECRET}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req,res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/auth/google',
    passport.authenticate('google', {scope: ['email', 'profile']})
)

app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure',
    })
)

app.get('/auth/faliure', (req,res) => {
    res.send('something went wrong'); 
})

app.get('/protected', isLoggedIn , (req,res) => {
    res.send('Hello you are logged in! <a href="/logout">Logout</a><br/>');
});

app.get('/logout', (req,res) => {
    req.session.destroy()
    res.redirect('/');
})

app.listen(5000, () => {
    console.log('Listening on port 5000');
})