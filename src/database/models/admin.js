import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
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
  },
  isAllowed: {
    type: Boolean,
  },
});

adminSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
adminSchema.set('toJSON', {
  virtuals: true,
});

export default mongoose.model('Admin', adminSchema);
