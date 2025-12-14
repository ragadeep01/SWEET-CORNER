import mongoose from "mongoose";

const customerOfferSchema = new mongoose.Schema({
  sweet: { type: mongoose.Schema.Types.ObjectId, ref: 'Sweet', required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quantity: { type: Number, required: true },
  offeredPrice: { type: Number },   // optional; customer can propose price
  message: { type: String, default: '' },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

export default mongoose.model('CustomerOffer', customerOfferSchema);
