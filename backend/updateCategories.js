const mongoose = require('mongoose');

const mongoUri = 'mongodb+srv://infinologylexvra_db_user:NlbYPLVTVTVx3twq@blackdistrict.p4cfadf.mongodb.net/?appName=BlackDistrict';

mongoose.connect(mongoUri)
  .then(async () => {
    console.log('MongoDB Connected');

    const ProductSchema = new mongoose.Schema({
      name: String,
      category: String,
    }, { strict: false });

    const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

    // Update to 'pant' category
    await Product.updateMany(
      { name: { $in: [
        'Classic Beige Pant & Shirt Set',
        'Classic White Pants & Linen Shirt Combo',
        'Classic Black Pant & Evening Shirt Combo',
        'Stone Grey Chino Pants & Shirt Combo'
      ] } },
      { $set: { category: 'pant' } }
    );

    // Update to 'shirt' category
    await Product.updateMany(
      { name: { $in: [
        'Midnight Silk Evening Shirt & Pant Set',
        'Blue Linen Summer Shirt & Trouser Combo',
        'Emerald Linen Signature Set',
        'Riviera Resort Combo Set'
      ] } },
      { $set: { category: 'shirt' } }
    );

    console.log('Updated categories for combos to be split between shirt and pant!');
    process.exit(0);
  })
  .catch(err => {
    console.error('MongoDB error:', err);
    process.exit(1);
  });
