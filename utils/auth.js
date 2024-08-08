// User Auth
const withAuth = (req, res, next) => {
    console.log(req.session.loggedIn);

    // If the user is NOT logged in, redirct them to the login page
    if (!req.session/loggedIn) {
        res.redirect('/login')
    } else {
        next();
    }
}

// Export Auth
module.exports = withAuth;