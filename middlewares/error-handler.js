function handleErrors(error, req, res, next) {
  console.log(error);
  if (error.status === 404) {
    return res.render('errors/404');
  }
  return res.render('errors/500');
}

module.exports = handleErrors;
