const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  console.log("EGDF SDFSD");
  Product.fetchAll().then(([rows, fieldData]) => {
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch(err => console.log("Error Fetch All:", err));
};

exports.getProduct = (req, res, next) => {
  const productID = req.params.productID;
  Product.findProductByID(productID).then(([product,fieldData]) =>{
    res.render('shop/product-detail', {
      pageTitle: product[0].title,
      path: '/products',
      product: product[0],

    });
  });


};


exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(([rows, fieldData]) => {
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(err => console.log("Error Fetch All:", err));
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cartProducts) => {
    const total = Cart.getCartPrice(cartProducts);
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      cartProducts: cartProducts,
      cartTotal: total,

    });


  });

};
exports.addToCart = (req, res, next) => {
  console.log('Product Added: ', req.body.productID);
  Cart.addProduct(req.body.productID, () => {
    res.redirect('/cart');
  });
};

exports.deleteCartItem = (req, res, next) => {

  const productID = req.body.productID;
  Cart.deleteProductByID(productID, () => {
    res.redirect('/cart');
  }, () => {

  })
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
