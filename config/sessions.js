const expressSession = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(expressSession);

const store = new MongoDBStore({
  uri: 'mongodb://127.0.0.1:27017',
  databaseName: 'rts',
  collection: 'sessions',
});

function configSession() {
  return {
    secret: 'RTS Super Secret',
    cookie: {
      maxAge: (1000 * 60 * 60 * 24) / 12, // 24 hours (* or /)
    },
    store: store,
    resave: false,
    saveUninitialized: false,
  };
}

module.exports = {
  configSession,
};
