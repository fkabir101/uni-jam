const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const session = require('express-session');
const morgan = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy


const app = express();


const PORT = process.env.PORT || 3001;

//for logging in

app.use(morgan('dev')); // for logging

//To keep track of user's login status
app.use(session({secret: "keyboard dog", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('client/build'));//not sure about this
app.use(routes);

//set up passport to authenticate
const User = require('./models/Users');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/unifight", { useNewUrlParser: true });

app.listen(PORT, function(){
  console.log(`Listening on port: ${PORT}`)
})