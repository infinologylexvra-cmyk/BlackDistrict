const mongoose = require('mongoose');

const mongoUri = 'mongodb+srv://infinologylexvra_db_user:NlbYPLVTVTVx3twq@blackdistrict.p4cfadf.mongodb.net/?appName=BlackDistrict';

mongoose.connect(mongoUri)
  .then(async () => {
    console.log('MongoDB Connected');

    const CategorySchema = new mongoose.Schema({
      name: String,
      label: String,
    }, { timestamps: true });

    const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

    // Wiping old categories and creating Curated Combos category
    await Category.deleteMany({});
    console.log('Deleted old categories.');

    const comboCat = new Category({
      name: 'combo',
      label: 'Curated Combos'
    });
    await comboCat.save();
    console.log('Saved Curated Combos category in MongoDB!');

    process.exit(0);
  })
  .catch(err => {
    console.error('MongoDB error:', err);
    process.exit(1);
  });
