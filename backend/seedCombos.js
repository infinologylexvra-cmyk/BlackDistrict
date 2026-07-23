const mongoose = require('mongoose');

const mongoUri = 'mongodb+srv://infinologylexvra_db_user:NlbYPLVTVTVx3twq@blackdistrict.p4cfadf.mongodb.net/?appName=BlackDistrict';

mongoose.connect(mongoUri)
  .then(async () => {
    console.log('MongoDB Connected');

    const ProductSchema = new mongoose.Schema({
      name: String,
      price: Number,
      compareAtPrice: Number,
      images: [String],
      description: String,
      sizes: [String],
      onSale: Boolean,
      availability: Boolean,
      category: String,
    }, { timestamps: true });

    const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

    // Add 3 new products
    const newProducts = [
      {
        name: 'Riviera Resort Combo',
        price: 2999,
        compareAtPrice: 4299,
        images: ['/image/riviera_combo.jpg'],
        description: 'A premium men\'s combination set: a beige linen shirt and white trousers. Resort wear, bright Mediterranean vibe.',
        sizes: ['S / 30', 'M / 32', 'L / 34', 'XL / 36'],
        onSale: true,
        availability: true,
        category: 'combo'
      },
      {
        name: 'Midnight Silk Evening Shirt',
        price: 2499,
        compareAtPrice: 3499,
        images: ['/image/midnight_silk_shirt.jpg'],
        description: 'A luxurious deep midnight navy silk button-down shirt. Elegant, sophisticated evening wear.',
        sizes: ['S', 'M', 'L', 'XL'],
        onSale: true,
        availability: true,
        category: 'shirt'
      },
      {
        name: 'Emerald Linen Signature Set',
        price: 3199,
        compareAtPrice: 4599,
        images: ['/image/emerald_combo.jpg'],
        description: 'An emerald green linen shirt and beige tailored trousers combo. Studio lighting, luxury brand aesthetic.',
        sizes: ['S / 30', 'M / 32', 'L / 34', 'XL / 36'],
        onSale: true,
        availability: true,
        category: 'combo'
      }
    ];

    for (const p of newProducts) {
      const prod = new Product(p);
      await prod.save();
      console.log('Added:', p.name);
    }
    
    console.log('Done!');
    process.exit(0);
  })
  .catch(err => {
    console.error('MongoDB error:', err);
    process.exit(1);
  });
