import mongoose from 'mongoose';

const bioSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match:
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    schoolAddress: {
      type: String,
      required: true,
    },
    homeAddress: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
    contactNumber1: {
      type: Number,
      required: true,
    },
    contactNumber2: {
      type: Number,
      required: false,
    },
    unit: {
      type: String,
      required: true,
      enum: ['House of Honour', 'Ushering', 'Technical', 'Evangelism'],
    },
    dob: {
      type: Date,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female'],
    },
    campus: {
      type: String,
      required: true,
      enum: ['Gidan-Kwano', 'Bosso'],
    },
  },
  {
    timestamps: true,
  },
);

bioSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

export default mongoose.model('BioData', bioSchema);
