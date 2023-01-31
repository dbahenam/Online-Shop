const express = require('express');
const path = require('path');
const db = require('./database/database');
const csrf = require('csurf');
const expressSession = require('express-session');

const routeProtection = require('./middlewares/routeProtection');
const errorHandler = require('./middlewares/error-handler');
const checkAuthStatus = require('./middlewares/checkAuth');
const addCsrfToken = require('./middlewares/csrf-token');
const cartMiddleware = require('./middlewares/cart');
const sessionConfig = require('./config/sessions');

const baseRoutes = require('./routes/base.routes');
const authRoutes = require('./routes/auth.routes');
const prodRoutes = require('./routes/prod.routes');
const adminRoutes = require('./routes/admin.routes');
const cartRoutes = require('./routes/cart.routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));
app.use('/products/assets', express.static('product-data'));

app.use(expressSession(sessionConfig.configSession()));
app.use(csrf());
app.use(cartMiddleware);

app.use(addCsrfToken);
app.use(checkAuthStatus);

app.use(baseRoutes);
app.use(prodRoutes);
app.use(authRoutes);
app.use('/cart', cartRoutes);
app.use(routeProtection);
app.use('/admin', adminRoutes);

// app.use(function (req, res, next) {
//   let error = new Error('Not Found');
//   error.code = 404;
//   next(error);
// });

app.use(errorHandler);

app.get('/', function (req, res) {
  res.render('index');
});

db.connectToDB()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log('Failed to connect to the database');
    console.log(error);
  });
