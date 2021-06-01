import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
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
      default: () => true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Admin', adminSchema);
