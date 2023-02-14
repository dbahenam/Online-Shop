const authVerification = require('../utils/auth.verify');
const User = require('../models/user.model');
const sessionData = require('../utils/validate-session');

function getSignup(req, res) {
  let inputData = sessionData.getData(req);
  res.render('customer/authorize/signup', { inputData: inputData });
}
function getLogin(req, res) {
  let inputData = sessionData.getData(req);
  res.render('customer/authorize/login', { inputData: inputData });
}

async function signup(req, res, next) {
  const userInput = {
    email: req.body.email,
    confirmEmail: req.body['confirm-email'],
    password: req.body.password,
    fullName: req.body.fullname,
    street: req.body.street,
    postalCode: req.body.postalcode,
    city: req.body.city,
  };
  if (!authVerification.validInput(userInput)) {
    console.log('Error, something wrong with authenticating signup');
    sessionData.flashData(req, userInput, function () {
      res.redirect('signup');
    });
    return;
  }
  const existingUser = await User.getUserByEmail(userInput.email);
  if (existingUser) {
    console.log('error, a user with that information already exists');
    sessionData.flashData(req, userInput, function () {
      res.redirect('signup');
    });
    return;
  }

  try {
    await User.save(userInput);
  } catch (error) {
    next(error);
    return;
  }
  res.redirect('/login');
}

async function login(req, res, next) {
  const userInput = req.body;
  const existingUser = new User(userInput);
  let user;
  try {
    user = await User.getUserByEmail(userInput.email);
  } catch (error) {
    next(error);
    return;
  }
  await existingUser.fetchUser();
  if (!existingUser.password) {
    console.log('error, no user with that email');
    sessionData.flashData(req, userInput, function () {
      res.redirect('/login');
    });
    return;
  }
  if (!(await existingUser.passwordIsValid(userInput.password))) {
    console.log('error, something wrong with your data. please check');
    sessionData.flashData(req, userInput, function () {
      res.redirect('/login');
    });
    return;
  }
  req.session.uid = user._id.toString();
  req.session.isAdmin = user.isAdmin;
  req.session.save(function () {
    if (req.session.cartRedirect) {
      req.session.cartRedirect = null;
      res.redirect('/cart');
    } else {
      res.redirect('/products');
    }
  });
}

function logout(req, res) {
  res.locals.isAuth = false;
  req.session.uid = null;
  res.redirect('/');
}

module.exports = {
  getSignup: getSignup,
  signup: signup,
  getLogin: getLogin,
  login: login,
  logout: logout,
};
