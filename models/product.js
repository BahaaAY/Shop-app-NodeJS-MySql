const db = require("./../util/database.js");


module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute('INSERT INTO products ( title,description, price,imageUrl) VALUES (?,?,?,?)',[this.title,this.description,this.price,this.imageUrl]);
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }
  static editProduct(editedProduct, successCB, errCB)
  {
  }
  
  static deleteProductByID(id)
  {
  }

  static findProductByID(id)
  {
    return db.execute('SELECT * FROM products WHERE products.id = ?' , [id]);
  }
};
