import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    userRole: {
      type: String,
      default: () => 'Admin',
    },
    isAdmin: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Admin', adminSchema);
