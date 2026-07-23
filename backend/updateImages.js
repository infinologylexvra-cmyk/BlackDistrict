const mongoose = require('mongoose');

const mongoUri = 'mongodb+srv://infinologylexvra_db_user:NlbYPLVTVTVx3twq@blackdistrict.p4cfadf.mongodb.net/?appName=BlackDistrict';

mongoose.connect(mongoUri)
  .then(async () => {
    console.log('MongoDB Connected');

    const ProductSchema = new mongoose.Schema({
      name: String,
      images: [String],
    }, { strict: false });

    const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

    // Update Classic Beige Pant & Shirt Set -> use a beige/white shirt image
    await Product.updateOne(
      { name: 'Classic Beige Pant & Shirt Set' },
      { $set: { images: ['/image/collection-shirt.png'] } }
    );

    // Update Classic White Pants & Linen Shirt Combo -> use a white/blue shirt image
    await Product.updateOne(
      { name: 'Classic White Pants & Linen Shirt Combo' },
      { $set: { images: ['/image/collection-summer-edit.jpg'] } }
    );

    // Update Classic Black Pant & Evening Shirt Combo -> use the black silk shirt image
    await Product.updateOne(
      { name: 'Classic Black Pant & Evening Shirt Combo' },
      { $set: { images: ['/image/midnight_silk_shirt.jpg'] } }
    );

    // Update Stone Grey Chino Pants & Shirt Combo -> use an olive or striped shirt image
    await Product.updateOne(
      { name: 'Stone Grey Chino Pants & Shirt Combo' },
      { $set: { images: ['/image/olive-safari-shirt.jpg'] } }
    );

    console.log('Images updated to feature shirts instead of pants!');
    process.exit(0);
  })
  .catch(err => {
    console.error('MongoDB error:', err);
    process.exit(1);
  });
