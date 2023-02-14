function handleErrors(error, req, res, next) {
  console.log(error);
  if (error.code === 404) {
    return res.render('shared/errors/404');
  }
  return res.render('shared/errors/500');
}

module.exports = handleErrors;
