const db = require('../database/database');
const mongodb = require('mongodb');

class Order {
  constructor(cart, userData, status = 'pending', date, orderID) {
    this.productData = cart;
    this.userData = userData;
    this.status = status; // pending, fulfilled or cancelled
    this.date = new Date(date);
    if (this.date) {
      this.formattedDate = this.date.toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    }
    this.id = orderID;
  }

  static async findByUserID(uid) {
    const userID = new mongodb.ObjectId(uid);
    const orders = await db
      .getDB()
      .collection('orders')
      .find({ 'userData._id': userID })
      .toArray();
    return orders;
  }

  async save() {
    if (this.id) {
      //updating
    } else {
      // new order
      const orderDocument = {
        userData: this.userData,
        productData: this.productData,
        date: new Date(),
        status: this.status,
      };
      await db.getDB().collection('orders').insertOne(orderDocument);
    }
  }
}

module.exports = Order;
