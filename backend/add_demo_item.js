require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

async function seedDemoItem() {
  try {
    const mongoUri = process.env.MONGO_URI;
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for Demo Item creation...');

    const demoProduct = {
      name: 'BlackDistrict™ Demo Test Item (Rs. 1)',
      price: 1,
      compareAtPrice: 99,
      images: [
        '/image/collection-shirt.png'
      ],
      description: 'Special 1 Rupee demo item for testing Razorpay live checkout and payments.',
      sizes: ['Free Size'],
      onSale: true,
      availability: true,
      category: 'shirt'
    };

    // Remove existing demo item if any, then insert fresh
    await Product.deleteMany({ name: /Demo Test Item/i });
    const inserted = await Product.create(demoProduct);

    console.log('Successfully created Demo Rs. 1 item:', inserted._id);
    mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('Error creating demo item:', err);
    process.exit(1);
  }
}

seedDemoItem();
