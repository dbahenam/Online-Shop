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

  static mapToOrderObjects(ordersDocument) {
    return ordersDocument.map(function (orderDoc) {
      return new Order(
        orderDoc.productData,
        orderDoc.userData,
        orderDoc.status,
        orderDoc.date,
        orderDoc._id
      );
    });
  }

  static async getAll() {
    const orders = await db.getDB().collection('orders').find().toArray();
    return this.mapToOrderObjects(orders);
  }

  static async findByUserID(uid) {
    const userID = new mongodb.ObjectId(uid);
    const orders = await db
      .getDB()
      .collection('orders')
      .find({ 'userData._id': userID })
      .sort({ _id: -1 })
      .toArray();
    return this.mapToOrderObjects(orders);
  }

  static async findByOrderID(oid) {
    const orderID = new mongodb.ObjectId(oid);
    const orderDoc = await db
      .getDB()
      .collection('orders')
      .findOne({ _id: orderID });
    const order = new Order(
      orderDoc.productData,
      orderDoc.userData,
      orderDoc.status,
      orderDoc.date,
      orderDoc._id
    );

    return order;
  }

  async save() {
    if (this.id) {
      const orderID = new mongodb.ObjectId(this.id);
      await db
        .getDB()
        .collection('orders')
        .updateOne({ _id: orderID }, { $set: { status: this.status } });
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
