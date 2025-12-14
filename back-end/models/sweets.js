import mongoose from 'mongoose';

const cropSchema = new mongoose.Schema({
  name: { type: String, required: true },        // changed from crop_name → name
  category: { type: String, required: true },

  quantity: { type: Number, required: true },
  price: { type: Number, required: true },

  image: String,                                 // single image filename or URL
sellerId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
},

  status: {
    type: String,
    enum: ['available', 'unavailable'],
    default: 'available'
  }
}, { timestamps: true });

export default mongoose.model('Crop', cropSchema);
