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

    // 1. Delete all existing products
    await Product.deleteMany({});
    console.log('Deleted all old products.');

    // 2. Seed only Combos at Rs 999
    const newCombos = [
      {
        name: 'Classic Beige Pant & Shirt Set',
        price: 999,
        compareAtPrice: 1999,
        images: ['/image/beige-pant-1.jpg', '/image/beige-pant-2-hd.jpg', '/image/beige-pant-3.jpg'],
        description: 'A complete combination featuring our tailored beige trousers and a matching premium shirt. Designed for a casual yet sophisticated fit.',
        sizes: ['S / 30', 'M / 32', 'L / 34', 'XL / 36'],
        onSale: true,
        availability: true,
        category: 'combo'
      },
      {
        name: 'Classic White Pants & Linen Shirt Combo',
        price: 999,
        compareAtPrice: 1999,
        images: ['/image/white-pants-1.png', '/image/white-pants-2.png', '/image/white-pants-3.png'],
        description: 'A premium summer-ready set consisting of regular straight cotton white pants and a breathable linen shirt.',
        sizes: ['S / 30', 'M / 32', 'L / 34', 'XL / 36'],
        onSale: true,
        availability: true,
        category: 'combo'
      },
      {
        name: 'Classic Black Pant & Evening Shirt Combo',
        price: 999,
        compareAtPrice: 1999,
        images: ['/image/black-pant-1-hd.jpg', '/image/black-pant-2-hd.jpg'],
        description: 'An ultra HD solid drawstring black pant paired with a premium evening shirt for a complete sophisticated look.',
        sizes: ['S / 30', 'M / 32', 'L / 34', 'XL / 36'],
        onSale: true,
        availability: true,
        category: 'combo'
      },
      {
        name: 'Blue Linen Summer Shirt & Trouser Combo',
        price: 999,
        compareAtPrice: 3499,
        images: ['/image/blue-linen-shirt.jpg'],
        description: 'Lightweight blue linen shirt paired with comfortable matching trousers, perfect for summer outings and beach vacations.',
        sizes: ['S / 30', 'M / 32', 'L / 34', 'XL / 36'],
        onSale: true,
        availability: true,
        category: 'combo'
      },
      {
        name: 'Riviera Resort Combo Set',
        price: 999,
        compareAtPrice: 4299,
        images: ['/image/riviera_combo.jpg'],
        description: 'A premium men\'s combination set: a beige linen shirt and white trousers. Resort wear, bright Mediterranean vibe.',
        sizes: ['S / 30', 'M / 32', 'L / 34', 'XL / 36'],
        onSale: true,
        availability: true,
        category: 'combo'
      },
      {
        name: 'Emerald Linen Signature Set',
        price: 999,
        compareAtPrice: 4599,
        images: ['/image/emerald_combo.jpg'],
        description: 'An emerald green linen shirt and beige tailored trousers combo. Studio lighting, luxury brand aesthetic.',
        sizes: ['S / 30', 'M / 32', 'L / 34', 'XL / 36'],
        onSale: true,
        availability: true,
        category: 'combo'
      },
      {
        name: 'Midnight Silk Evening Shirt & Pant Set',
        price: 999,
        compareAtPrice: 3499,
        images: ['/image/midnight_silk_shirt.jpg'],
        description: 'A luxurious deep midnight navy silk button-down shirt paired with tailored dark trousers. Elegant, sophisticated evening wear.',
        sizes: ['S / 30', 'M / 32', 'L / 34', 'XL / 36'],
        onSale: true,
        availability: true,
        category: 'combo'
      },
      {
        name: 'Stone Grey Chino Pants & Shirt Combo',
        price: 999,
        compareAtPrice: 2499,
        images: ['/image/grey-chino-pants.jpg'],
        description: 'Premium slim-fit stone grey chino trousers combined with a breathable cotton shirt. Crafted for modern elegance and comfort.',
        sizes: ['S / 30', 'M / 32', 'L / 34', 'XL / 36'],
        onSale: true,
        availability: true,
        category: 'combo'
      }
    ];

    for (const p of newCombos) {
      const prod = new Product(p);
      await prod.save();
      console.log('Added Combo:', p.name);
    }
    
    console.log('Database successfully migrated to Combo-Only store model at price Rs. 999.');
    process.exit(0);
  })
  .catch(err => {
    console.error('MongoDB error:', err);
    process.exit(1);
  });
