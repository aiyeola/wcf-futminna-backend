import 'dotenv/config';
import seeder from 'mongoose-seed';

import sampleData from 'database/seed/sampleData';

// Data array containing seed data - documents organized by Model
const data = [
  {
    model: 'Admin',
    documents: [
      {
        username: 'admin',
        password:
          '$argon2i$v=19$m=4096,t=3,p=1$vzrWD7gGrd3WGy4EaJu6Bg$brMu6j3y1PH05NEQr8lfjyx0GoUsUrU7WzcqIRgAlbY',
        userRole: 'Super Administrator',
        isAdmin: true,
      },
    ],
  },
  {
    model: 'BioData',
    documents: sampleData,
  },
];

const dbUri = process.env.MONGODB_URI;
seeder.connect(dbUri, { useUnifiedTopology: true }, () => {
  seeder.loadModels([
    'src/database/models/admin',
    'src/database/models/biodata',
  ]);

  // Clear specified collections
  seeder.clearModels(['Admin', 'BioData'], () => {
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, (err, done) => {
      seeder.disconnect();
    });
  });
});
