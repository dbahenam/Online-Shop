function routeProtection(req, res, next) {
  // if (!res.locals.isAuth) {
  //   res.redirect('errors/401');
  //   return;
  // }

  if (req.path.startsWith('/admin') && !res.locals.isAdmin) {
    res.redirect('/errors/403');
  }

  next();
}

module.exports = routeProtection;
