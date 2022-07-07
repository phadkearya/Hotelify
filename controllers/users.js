const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const newRegisteredUser = await User.register(user, password);
        req.login(newRegisteredUser, (err) => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Hotelify!');
            res.redirect('/hotels')
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}
    
module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || '/hotels';
    // console.log(req.session.returnTo);
    // console.log(redirectUrl);
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'You have been successfully logged out!');
        res.redirect('/hotels')
    });
}