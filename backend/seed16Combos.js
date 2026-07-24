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

    // 2. Define 16 new combo products using c1.jpg to c16.jpg
    const comboProducts = [
      {
        name: 'Aura Linen Combo Set',
        price: 999,
        compareAtPrice: 1999,
        images: ['/image/c1.jpg'],
        description: 'A hand-tailored premium linen shirt paired with lightweight drawstring trousers. Designed for a sleek, resort-ready aesthetic.',
        sizes: ['S / 30', 'M / 32', 'L / 34', 'XL / 36'],
        onSale: true,
        availability: true,
        category: 'combo'
      },
      {
        name: 'Monaco Resort Shirt & Pant Set',
        price: 999,
        compareAtPrice: 2199,
        images: ['/image/c2.jpg'],
        description: 'Crafted from high-grade flax blend fabric, offering unparalleled breathability and clean drape for casual luxury.',
        sizes: ['S / 30', 'M / 32', 'L / 34', 'XL / 36'],
        onSale: true,
        availability: true,
        category: 'combo'
      },
      {
        name: 'Riviera Sunset Linen Combo',
        price: 999,
        compareAtPrice: 2299,
        images: ['/image/c3.jpg'],
        description: 'Mediterranean inspired ensemble combining a Cuban collar shirt with relaxed tailored trousers.',
        sizes: ['S / 30', 'M / 32', 'L / 34', 'XL / 36'],
        onSale: true,
        availability: true,
        category: 'combo'
      },
      {
        name: 'Elegance Silk Blend Combo',
        price: 999,
        compareAtPrice: 2499,
        images: ['/image/c4.jpg'],
        description: 'Sophisticated evening wear featuring a silk-touch button-down paired with slim-fit pleat trousers.',
        sizes: ['S / 30', 'M / 32', 'L / 34', 'XL / 36'],
        onSale: true,
        availability: true,
        category: 'combo'
      },
      {
        name: 'Classic White & Earthy Trousers Set',
        price: 999,
        compareAtPrice: 1999,
        images: ['/image/c5.jpg'],
        description: 'Crisp white top paired with neutral earthy-toned bottoms for effortless daily style.',
        sizes: ['S / 30', 'M / 32', 'L / 34', 'XL / 36'],
        onSale: true,
        availability: true,
        category: 'combo'
      },
      {
        name: 'Midnight Navy Signature Combo',
        price: 999,
        compareAtPrice: 2399,
        images: ['/image/c6.jpg'],
        description: 'Deep navy shirt paired with contrasting light-colored trousers for a sharp, modern contrast look.',
        sizes: ['S / 30', 'M / 32', 'L / 34', 'XL / 36'],
        onSale: true,
        availability: true,
        category: 'combo'
      },
      {
        name: 'Olive Safari & Chino Combo Set',
        price: 999,
        compareAtPrice: 2199,
        images: ['/image/c7.jpg'],
        description: 'Rustic olive tone shirt combined with tailored stone chinos, perfect for weekend getaways.',
        sizes: ['S / 30', 'M / 32', 'L / 34', 'XL / 36'],
        onSale: true,
        availability: true,
        category: 'combo'
      },
      {
        name: 'Breeze Linen Short-Sleeve Combo',
        price: 999,
        compareAtPrice: 1999,
        images: ['/image/c8.jpg'],
        description: 'Lightweight short-sleeve resort collar shirt with matching relaxed linen pants.',
        sizes: ['S / 30', 'M / 32', 'L / 34', 'XL / 36'],
        onSale: true,
        availability: true,
        category: 'combo'
      },
      {
        name: 'Old Money Gurkha Combo Set',
        price: 999,
        compareAtPrice: 2599,
        images: ['/image/c9.jpg'],
        description: 'Double-buckle Gurkha styled trousers matched with a minimalist linen shirt.',
        sizes: ['S / 30', 'M / 32', 'L / 34', 'XL / 36'],
        onSale: true,
        availability: true,
        category: 'combo'
      },
      {
        name: 'Sandstone Vacation Combo',
        price: 999,
        compareAtPrice: 2099,
        images: ['/image/c10.jpg'],
        description: 'Warm sandstone hues in a lightweight textured fabric. The ideal summer travel outfit.',
        sizes: ['S / 30', 'M / 32', 'L / 34', 'XL / 36'],
        onSale: true,
        availability: true,
        category: 'combo'
      },
      {
        name: 'Charcoal Minimalist Combo Set',
        price: 999,
        compareAtPrice: 2399,
        images: ['/image/c11.jpg'],
        description: 'Monochromatic dark charcoal aesthetic, crafted for dinner dates and evening events.',
        sizes: ['S / 30', 'M / 32', 'L / 34', 'XL / 36'],
        onSale: true,
        availability: true,
        category: 'combo'
      },
      {
        name: 'Striped Resort & Linen Pant Set',
        price: 999,
        compareAtPrice: 2199,
        images: ['/image/c12.jpg'],
        description: 'Subtle vertical striped short-sleeve shirt paired with clean off-white linen trousers.',
        sizes: ['S / 30', 'M / 32', 'L / 34', 'XL / 36'],
        onSale: true,
        availability: true,
        category: 'combo'
      },
      {
        name: 'Azure Blue Coastal Combo',
        price: 999,
        compareAtPrice: 2299,
        images: ['/image/c13.jpg'],
        description: 'Sky blue breathable linen top with crisp cream cotton drawstring pants.',
        sizes: ['S / 30', 'M / 32', 'L / 34', 'XL / 36'],
        onSale: true,
        availability: true,
        category: 'combo'
      },
      {
        name: 'Heritage Knit & Trousers Set',
        price: 999,
        compareAtPrice: 2499,
        images: ['/image/c14.jpg'],
        description: 'Micro-textured knit polo combined with relaxed tailored trousers.',
        sizes: ['S / 30', 'M / 32', 'L / 34', 'XL / 36'],
        onSale: true,
        availability: true,
        category: 'combo'
      },
      {
        name: 'Terracotta Summer Linen Combo',
        price: 999,
        compareAtPrice: 2099,
        images: ['/image/c15.jpg'],
        description: 'Rich earthy terracotta shirt matched with light sand trousers.',
        sizes: ['S / 30', 'M / 32', 'L / 34', 'XL / 36'],
        onSale: true,
        availability: true,
        category: 'combo'
      },
      {
        name: 'Executive Black & Beige Combo Set',
        price: 999,
        compareAtPrice: 2599,
        images: ['/image/c16.jpg'],
        description: 'Tailored black linen shirt paired with classic beige trousers for a timeless ensemble.',
        sizes: ['S / 30', 'M / 32', 'L / 34', 'XL / 36'],
        onSale: true,
        availability: true,
        category: 'combo'
      }
    ];

    for (const p of comboProducts) {
      const prod = new Product(p);
      await prod.save();
      console.log('Added Combo:', p.name);
    }
    
    console.log('Successfully seeded 16 Curated Combo products into MongoDB!');
    process.exit(0);
  })
  .catch(err => {
    console.error('MongoDB error:', err);
    process.exit(1);
  });
