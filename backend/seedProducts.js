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

    // 1. Delete old Classic Black Pant
    const delRes = await Product.deleteMany({ name: 'Classic Black Pant' });
    console.log('Deleted old black pants:', delRes.deletedCount);

    // 2. Add New Classic Black Pant (HD)
    const newBlackPant = new Product({
      name: 'Classic Black Pant',
      price: 1299,
      compareAtPrice: 1999,
      images: ['/image/black-pant-1-hd.jpg', '/image/black-pant-2-hd.jpg', '/image/black-pant-3-hd.jpg', '/image/black-pant-4-hd.jpg'],
      description: 'Premium ultra HD solid drawstring pants with a casual, tailored fit and breathable fabric.',
      sizes: ['28', '30', '32', '34', '36', '38'],
      onSale: true,
      availability: true,
      category: 'pant'
    });
    await newBlackPant.save();
    console.log('Added Classic Black Pant (HD)');

    // 3. Add 5 New Shirts & Pants
    const newProducts = [
      {
        name: 'Blue Linen Summer Shirt',
        price: 2499,
        compareAtPrice: 3499,
        images: ['/image/blue-linen-shirt.jpg'],
        description: 'Lightweight blue linen shirt, perfect for summer outings and beach vacations.',
        sizes: ['S', 'M', 'L', 'XL'],
        onSale: true,
        availability: true,
        category: 'shirt'
      },
      {
        name: 'Stone Grey Chino Pants',
        price: 1899,
        compareAtPrice: 2499,
        images: ['/image/grey-chino-pants.jpg'],
        description: 'Premium slim-fit stone grey chino trousers crafted for modern elegance and comfort.',
        sizes: ['28', '30', '32', '34', '36'],
        onSale: true,
        availability: true,
        category: 'pant'
      },
      {
        name: 'Olive Green Safari Shirt',
        price: 2199,
        compareAtPrice: 2899,
        images: ['/image/olive-safari-shirt.jpg'],
        description: 'Rugged yet refined olive green short-sleeve safari shirt with double chest pockets.',
        sizes: ['S', 'M', 'L', 'XL'],
        onSale: true,
        availability: true,
        category: 'shirt'
      },
      {
        name: 'Navy Blue Pleated Trousers',
        price: 2299,
        compareAtPrice: 3199,
        images: ['/image/navy-blue-trousers.jpg'],
        description: 'Relaxed-fit pleated trousers in deep navy blue, ideal for both casual and formal wear.',
        sizes: ['30', '32', '34', '36', '38'],
        onSale: true,
        availability: true,
        category: 'pant'
      },
      {
        name: 'Striped Cuban Collar Shirt',
        price: 1999,
        compareAtPrice: 2599,
        images: ['/image/striped-cuban-shirt.jpg'],
        description: 'Beige and navy striped short-sleeve Cuban collar shirt, offering a timeless summer aesthetic.',
        sizes: ['S', 'M', 'L', 'XL'],
        onSale: true,
        availability: true,
        category: 'shirt'
      }
    ];

    for (const p of newProducts) {
      const prod = new Product(p);
      await prod.save();
      console.log('Added:', p.name);
    }
    
    // 4. Update the beige pant 2 image in DB if it exists
    const beige = await Product.findOne({ name: 'Classic Beige Pant' });
    if (beige) {
      let updatedImages = beige.images.map(img => img === '/image/beige-pant-2.jpg' ? '/image/beige-pant-2-hd.jpg' : img);
      beige.images = updatedImages;
      await beige.save();
      console.log('Updated Beige Pant images in DB');
    }

    console.log('Done!');
    process.exit(0);
  })
  .catch(err => {
    console.error('MongoDB error:', err);
    process.exit(1);
  });
