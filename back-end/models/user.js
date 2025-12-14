import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Buyer', 'Seller'], required: true, default: 'customer' },
  profile: {
    type: mongoose.Schema.Types.Mixed, // flexible object for address, avatar, etc.
    default: {}
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
