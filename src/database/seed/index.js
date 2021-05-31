import 'dotenv/config';
import seeder from 'mongoose-seed';

// Data array containing seed data - documents organized by Model
const data = [
  {
    model: 'Admin',
    documents: [
      {
        username: 'president',
        password:
          '$2b$10$vewFOuFlpa9c5wgkaxONlu/x9R3E4XqDR49sZH5T0LR7bjZ8xeFfq',
        userRole: 'Super Administrator',
        isAdmin: true,
      },
    ],
  },
  {
    model: 'BioData',
    documents: [
      {
        firstName: 'Jane',
        lastName: 'Doe',
        department: 'Chemical Engineering',
        email: 'janedoe@livemail.com',
        schoolAddress: 'Estate Arizona',
        homeAddress: 'Block E, Livelyhood estate',
        level: 500,
        contactNumber1: 8112891128,
        contactNumber2: 8126794444,
        unit: 'House of Honour',
        dob: '1999-05-29',
        origin: 'Rivers',
        gender: 'Male',
        campus: 'Gidan-Kwano',
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        department: 'Mathematics',
        email: 'doe.john@hotmail.com',
        schoolAddress: 'Unity Villa',
        homeAddress: 'Block A, Rail road',
        level: 400,
        contactNumber1: 8146724733,
        unit: 'Drama',
        dob: '1996-05-29',
        origin: 'Gombe',
        gender: 'Female',
        campus: 'Bosso',
      },
    ],
  },
];

const dbUri = process.env.MONGODB_URI;
seeder.connect(dbUri, { useUnifiedTopology: true }, () => {
  seeder.loadModels([
    'src/database/models/admin',
    'src/database/models/biodata',
  ]);

  // Clear specified collections
  seeder.clearModels(['Admin', 'BioForm'], () => {
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, (err, done) => {
      seeder.disconnect();
    });
  });
});
