const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
  // COMBOS
  {
    name: 'Old Money Classic Combo (Brown & Beige)',
    price: 2099,
    compareAtPrice: 2999,
    images: [
      '/image/collection-signature.webp',
      '/image/beige-pant-2.jpg',
      '/image/beige-pant-3.jpg'
    ],
    description: 'Effortless sophistication in a single set, curated for the man who values heritage over trends. Experience the weight of premium fabric and our artisanal craftsmanship, delivered to your door in our signature Deep Plum box.',
    sizes: ['S', 'M', 'L', 'XL'], // For shirts/combos we can have shirt size
    onSale: true,
    availability: true,
    category: 'combo'
  },
  {
    name: 'Old Money Classic Combo (Blue & Beige)',
    price: 2099,
    compareAtPrice: 2999,
    images: [
      '/image/collection-combo.png',
      '/image/beige-pant-2.jpg'
    ],
    description: 'Effortless sophistication in a single set, curated for the man who values heritage over trends. Crafted from premium lotus linen and textured linen canvas.',
    sizes: ['S', 'M', 'L', 'XL'],
    onSale: true,
    availability: true,
    category: 'combo'
  },
  {
    name: 'Old Money Classic Combo (Olive & Beige)',
    price: 2099,
    compareAtPrice: 2999,
    images: [
      '/image/collection-gurkha.jpg',
      '/image/beige-pant-2.jpg'
    ],
    description: 'A striking duo matching our signature olive popover linen shirt and tailored beige linen trousers. Timeless summer luxury.',
    sizes: ['S', 'M', 'L', 'XL'],
    onSale: true,
    availability: true,
    category: 'combo'
  },
  {
    name: 'Old Money Classic Combo (Maroon & Beige)',
    price: 2099,
    compareAtPrice: 2999,
    images: [
      '/image/collection-winterwear.jpg',
      '/image/beige-pant-2.jpg'
    ],
    description: 'Artisanal styling matching maroon linen shirts and light-sand linen drawstring pants.',
    sizes: ['S', 'M', 'L', 'XL'],
    onSale: true,
    availability: true,
    category: 'combo'
  },

  // PANTS
  {
    name: 'FineLegends™ Classic Beige Pant',
    price: 1299,
    compareAtPrice: 1999,
    images: [
      '/image/beige-pant-1.jpg',
      '/image/beige-pant-2.jpg',
      '/image/beige-pant-3.jpg'
    ],
    description: 'Designed with a casual yet tailored fit, these pants feature a drawstring waist, side seam pockets, and a faux fly, crafted from a breathable blend of viscose and cotton.',
    sizes: ['28', '30', '32', '34', '36', '38'],
    onSale: true,
    availability: true,
    category: 'pant'
  },
  {
    name: 'FineLegends™ Classic White Pants',
    price: 1299,
    compareAtPrice: 1999,
    images: [
      '/image/white-pants-1.png',
      '/image/white-pants-2.png',
      '/image/white-pants-3.png'
    ],
    description: 'These are regular straight cotton pants featuring a concealed elastic band, drawstring, zip fly, and button closure, with a composition of 98% cotton and 2% elastane.',
    sizes: ['28', '30', '32', '34', '36', '38'],
    onSale: true,
    availability: true,
    category: 'pant'
  },
  {
    name: 'FineLegends™ Classic Black Pant',
    price: 1299,
    compareAtPrice: 1999,
    images: [
      '/image/black-pant-1.webp',
      '/image/black-pant-2.png',
      '/image/black-pant-3.jpg',
      '/image/black-pant-4.jpg'
    ],
    description: 'Similar to the beige version, these are breathable solid drawstring pants with a casual, tailored fit.',
    sizes: ['28', '30', '32', '34', '36', '38'],
    onSale: true,
    availability: true,
    category: 'pant'
  },
  {
    name: 'Classic Gurkha Pants',
    price: 1299,
    compareAtPrice: 1999,
    images: [
      '/image/collection-gurkha.jpg',
      '/image/white-pants-2.png'
    ],
    description: 'Inspired by traditional military design, our Gurkha pants feature double buckle waist adjusters and single front pleats for a refined silhouette.',
    sizes: ['28', '30', '32', '34', '36', '38'],
    onSale: true,
    availability: true,
    category: 'pant'
  },

  // SHIRTS
  {
    name: 'FineLegends™ Cuban Classic Shirt',
    price: 1699,
    compareAtPrice: 2499,
    images: [
      '/image/collection-shirt.png',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500'
    ],
    description: 'A breathable summer classic designed for hot climates, featuring our signature Cuban collar and premium lightweight cotton blend.',
    sizes: ['S', 'M', 'L', 'XL'],
    onSale: true,
    availability: true,
    category: 'shirt'
  },
  {
    name: 'FineLegends™ Linen Signature Shirt',
    price: 1999,
    compareAtPrice: 2999,
    images: [
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500'
    ],
    description: 'Crafted from premium flax linen, this shirt features a relaxed silhouette and offers unparalleled breathability and clean, structured drape.',
    sizes: ['S', 'M', 'L', 'XL'],
    onSale: true,
    availability: true,
    category: 'shirt'
  },
  {
    name: 'FineLegends™ Retro Resort Shirt',
    price: 1299,
    compareAtPrice: 1999,
    images: [
      'https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=500',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'
    ],
    description: 'Evoke Mediterranean elegance with our retro-inspired resort shirt. The perfect layering piece for coastal getaways.',
    sizes: ['S', 'M', 'L', 'XL'],
    onSale: true,
    availability: true,
    category: 'shirt'
  },

  // WINTERWEAR
  {
    name: 'Old Money Winterwear',
    price: 3499,
    compareAtPrice: 4999,
    images: [
      '/image/collection-winterwear.jpg'
    ],
    description: 'Premium heavy knitted cardigans and wool-blend scarves designed to keep you warm and elegant during the winter months.',
    sizes: ['S', 'M', 'L', 'XL'],
    onSale: true,
    availability: true,
    category: 'winterwear'
  }
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/finelegends';
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected for Seeding...');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products.');

    // Insert new products
    await Product.insertMany(products);
    console.log('Successfully seeded database with all category products!');

    mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err.message);
    process.exit(1);
  }
};

seedDatabase();
