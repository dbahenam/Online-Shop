const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let database;

async function connectToDB() {
  client = await MongoClient.connect('mongodb://127.0.0.1:27017');
  database = client.db('rts');
}

function getDB() {
  if (!database) {
    throw { message: 'Error connecting to database' };
  }
  return database;
}

module.exports = {
  connectToDB: connectToDB,
  getDB: getDB,
};
