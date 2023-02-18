function routeProtection(req, res, next) {
  if (req.path.startsWith('/admin') && !res.locals.isAdmin) {
    return res.render('shared/errors/403');
  }
  if (req.path.startsWith('/orders') && !res.locals.isAuth) {
    req.session.cartRedirect = true;
    res.redirect('/login'); // does not stop function execution
    return;
  }

  next();
}

module.exports = routeProtection;
