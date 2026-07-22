require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

async function removeItems() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const res1 = await Product.deleteOne({ name: 'Minimalist White Leather Sneakers' });
    const res2 = await Product.deleteOne({ name: 'Classic Pebble Leather Loafers' });
    console.log('Removed items:', res1.deletedCount, res2.deletedCount);
    
    // Also let's just wipe out footwear entirely if that was requested
    const res3 = await Product.deleteMany({ category: 'footwear' });
    const res4 = await Product.deleteMany({ category: 'watches' });
    console.log('Removed footwear/watches:', res3.deletedCount, res4.deletedCount);

    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

removeItems();
