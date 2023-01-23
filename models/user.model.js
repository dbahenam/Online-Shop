const db = require('../database/database');
const bcrypt = require('bcrypt');

class User {
  constructor(email, password) {
    this.email = email;
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
  static async save(email, password) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = {
      email: email,
      password: hashedPassword,
    };
    await db.getDB().collection('users').insertOne(user);
  }
}

module.exports = User;
