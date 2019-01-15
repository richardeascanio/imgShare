const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');

passport.use(new LocalStrategy({
    usernameField: 'username'
}, async (username, password, done) => {
    const user = await User.findOne({
        username: username
    });
    if (!user) {
        return done(null, false, { message: 'User nor found' }); // (err, user, message) message is optional
    } else {
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect password' });
        }
    }
}));

// To store the session of the user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});