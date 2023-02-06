class Cart {
  constructor(items = [], totalItems = 0, totalPrice = 0) {
    this.items = items;
    this.totalItems = totalItems;
    this.totalPrice = totalPrice;
  }

  addItem(product, quantity = 1) {
    const cartItem = {
      product: product,
      quantity: quantity,
      totalPrice: product.price * quantity,
    };
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].product.id === product.id) {
        cartItem.quantity = this.items[i].quantity + quantity;
        cartItem.totalPrice = cartItem.quantity * product.price;
        this.items[i] = cartItem;
        this.totalItems += quantity;
        this.totalPrice += product.price;
        return;
      }
    }
    this.items.push(cartItem);
    this.totalItems += quantity;
    this.totalPrice += cartItem.totalPrice;
  }

  removeItem(product) {
    const cartItem = {
      product: product,
      quantity: -1,
      totalPrice: product.price,
    };
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].product.id === product.id) {
        cartItem.quantity = this.items[i].quantity - 1;
        if (cartItem.quantity === 0) {
          this.items.splice(i, 1);
          this.totalItems--;
          this.totalPrice -= product.price;
          return;
        } else {
          cartItem.totalPrice = this.items[i].totalPrice - product.price;
          this.items[i] = cartItem;
          this.totalItems--;
          this.totalPrice -= product.price;
          return;
        }
      }
    }
  }
}

module.exports = Cart;
