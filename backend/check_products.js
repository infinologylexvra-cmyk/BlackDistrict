require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

async function checkProds() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const prods = await Product.find({});
    console.log('PRODUCTS IN DB:', prods.map(p => ({ id: p._id, name: p.name, price: p.price, category: p.category })));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
checkProds();
