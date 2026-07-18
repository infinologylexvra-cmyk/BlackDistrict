const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const run = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/finelegends';
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected...');

    try {
      await mongoose.connection.db.collection('users').dropIndex('email_1');
      console.log('Successfully dropped the unique email_1 index!');
    } catch (err) {
      console.log('Index drop info:', err.message);
      console.log('Dropping users collection to reset indexes completely...');
      try {
        await mongoose.connection.db.collection('users').drop();
        console.log('Successfully dropped users collection!');
      } catch (dropErr) {
        console.log('Collection drop info:', dropErr.message);
      }
    }

    mongoose.connection.close();
    console.log('Completed Index cleanup.');
    process.exit(0);
  } catch (err) {
    console.error('Index cleanup error:', err.message);
    process.exit(1);
  }
};

run();
