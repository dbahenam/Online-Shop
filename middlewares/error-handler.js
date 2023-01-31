function handleErrors(error, req, res, next) {
  console.log('in error mw: ', error.code);
  console.log(error);
  if (error.code === 404) {
    return res.render('errors/404');
  }
  return res.render('errors/500');
}

module.exports = handleErrors;
