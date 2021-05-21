import mongoose from 'mongoose';

import 'database/models/index';

class MongooseService {
  constructor() {
    this.count = 0;
    this.mongooseOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      useFindAndModify: false,
      useCreateIndex: true,
    };
    this.DBUrl = process.env.MONGODB_URI;
  }

  connectWithRetry = () => {
    console.log('Attempting MongoDB connection (will retry if needed)');
    mongoose
      .connect(this.DBUrl, this.mongooseOptions)
      .then(() => {
        console.log('MongoDB is connected');
      })
      .catch((err) => {
        const retrySeconds = 5;
        console.log(
          `MongoDB connection unsuccessful (will retry #${++this
            .count} after ${retrySeconds} seconds):`,
          err,
        );
        setTimeout(this.connectWithRetry, retrySeconds * 1000);
      });
  };
}

export default new MongooseService();
