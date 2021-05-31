import mongoose from 'mongoose';

const bioSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      get: capitalizeFirstLetter,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      get: capitalizeFirstLetter,
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

bioSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

function capitalizeFirstLetter(v) {
  return v.charAt(0).toUpperCase() + v.substr(1);
}

export default mongoose.model('BioForm', bioSchema);
