const router = require('express').Router();
const passport = require('passport');
const userController = require('./controller');
const LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy({usernameField:'email', passwordField: 'password'}, userController.localStrategy))

router.post('/register', userController.register);

router.post('/login', userController.login);

router.post('/logout', userController.logout);

router.get('/me', userController.me);

router.patch('/users/:id', userController.update);

router.delete('/users/:id', userController.deleteUser);

module.exports = router;