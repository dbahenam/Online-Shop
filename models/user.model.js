const db = require('../database/database');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');

class User {
  constructor(userData) {
    this.email = userData.email;
    this.password = userData.password;
    this.fullName = userData.fullName;
    this.address = {
      street: userData.street,
      postalCode: userData.postalCode,
      city: userData.city,
    };
  }

  static async findByID(uid) {
    const userID = new mongodb.ObjectId(uid);

    const user = await db
      .getDB()
      .collection('users')
      .findOne({ _id: userID }, { projection: { password: 0 } });

    return user; // returns user document
  }
  async fetchUser() {
    const user = await db
      .getDB()
      .collection('users')
      .findOne({ email: this.email });
    if (user) {
      this.password = user.password;
    }
    return;
  }

  async passwordIsValid(password) {
    return await bcrypt.compare(password, this.password);
  }
  static async getUserByEmail(email) {
    return await db.getDB().collection('users').findOne({ email: email });
  }
  static async save(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    const user = {
      email: userData.email,
      password: hashedPassword,
      fullName: userData.fullName,
      address: {
        street: userData.street,
        postalCode: userData.postalCode,
        city: userData.city,
      },
    };
    await db.getDB().collection('users').insertOne(user);
  }
}

module.exports = User;
