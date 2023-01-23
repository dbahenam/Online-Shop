function getData(req) {
  let data = req.session.inputData;
  if (!data) {
    data = {
      hasError: false,
      message: '',
      email: '',
      confirmEmail: '',
    };
  }
  req.session.inputData = null; // reset (flash== only once)
  return data;
}

function flashData(req, data, action) {
  req.session.inputData = {
    hasError: true,
    message: 'Error, Please check your input and try again.',
    ...data,
  };
  req.session.save(action);
}

module.exports = {
  flashData: flashData,
  getData: getData,
};
