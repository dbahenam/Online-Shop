const db = require('../database/database');
const mongodb = require('mongodb');

class Product {
  constructor(productData) {
    this.name = productData.name;
    this.summary = productData.summary;
    this.price = +productData.price;
    this.description = productData.description;
    this.image = productData.image; // name of image
    this.imagePath = `product-data/images/${productData.image}`; // path of image on storage
    this.imageUrl = `/products/assets/images/${productData.image}`; // for frontend (misdirection to user)
    if (productData._id) {
      this.id = productData._id.toString(); // mongodb id for updating
    }
  }

  static async getAll() {
    const products = await db.getDB().collection('products').find().toArray();
    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }

  static async getByID(productID) {
    const objectID = new mongodb.ObjectId(productID);
    let theProduct;
    try {
      theProduct = await db
        .getDB()
        .collection('products')
        .findOne({ _id: objectID });
    } catch (error) {
      error.code = 404;
    }
    if (!theProduct) {
      const error = new Error('Could not find a Product with that id.');
      error.code = 404;
      throw error;
    }
    return theProduct;
  }

  async updateImage(image) {
    this.image = image;
    this.imagePath = `product-data/images/${this.image}`; // path of image on storage
    this.imageUrl = `/products/assets/images/${this.image}`; // for frontend
  }

  static async deleteByID(productID) {
    const objectID = new mongodb.ObjectId(productID);
    try {
      await db.getDB().collection('products').deleteOne({ _id: objectID });
    } catch (error) {
      error.code = 404;
      return;
    }
  }

  async save() {
    const productData = {
      name: this.name,
      price: this.price,
      summary: this.summary,
      description: this.description,
      image: this.image, // image name
    };
    if (!this.id) {
      await db.getDB().collection('products').insertOne(productData);
    } else {
      const productID = new mongodb.ObjectId(this.id);
      if (!this.image) {
        delete productData.image;
      }
      await db.getDB().collection('products').updateOne(
        { _id: productID },
        {
          $set: productData,
        }
      );
    }
  }
}

module.exports = Product;
