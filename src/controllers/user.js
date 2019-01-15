const ctrl = {};
const { User } = require('../models');
const md5 = require('md5');

ctrl.signin = (req, res) => {
    res.render('users/signin');
};

ctrl.signup = (req, res) => {
    res.render('users/signup');
};

ctrl.logout = (req, res) => {
    req.logOut();
    res.redirect('/');
};

ctrl.create = async (req, res) => {
    const { name, email, username, password, confirm_password } = req.body;
    const errors = [];
    if (name.length <= 0) {
        errors.push({
            text: 'Please insert your name'
        });
    }
    if (email.length <= 0) {
        errors.push({
            text: 'Please insert your email'
        });
    }
    if (username.length <= 0) {
        errors.push({
            text: 'Please insert your username'
        });
    }
    if (password != confirm_password) {
        errors.push({
            text: 'Passwords do not match'
        });
    }
    if (password.length < 4) {
        errors.push({
            text: 'Password must have at least 4 characters'
        });
    }
    if (errors.length > 0) {
        res.render('users/signup', { errors, name, email, username });
    } else {
        const errors = [];
        const emailUser = await User.findOne({
            email: email
        });
        const usernameUser = await User.findOne({
            username: username
        });
        if (emailUser || usernameUser) {
            if (emailUser) {
                errors.push({
                    text: 'Email already in use'
                });
                res.render('users/signup', { errors, name, username });
            } else {
                if (usernameUser) {
                    errors.push({
                        text: 'Username already in use'
                    });
                    res.render('users/signup', { errors, name, email });
                }
            }
        } else {
            const newUser = new User({ name, email, username, password });
            newUser.password = await newUser.encryptPassword(password);
            newUser.profilePic = req.file.secure_url;
            await newUser.save();
            req.flash('success_msg', 'Sign up successfull');
            res.redirect('/users/signin');
        }
    }
};

ctrl.profile = (req, res) => {
    res.render('users/profile');
};

module.exports = ctrl;