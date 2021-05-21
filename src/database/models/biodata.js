import mongoose from 'mongoose';

const bioSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: 'This field is required',
      trim: true,
    },
    department: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
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
    },
    dob: {
      type: String,
    },
    origin: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    campus: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('BioForm', bioSchema);
