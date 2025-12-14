import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  sweetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sweet', required: true },
  sweetSnapshot: {                                
    name: String,
    category: String,
    price: Number,
    image: String,
  },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quantity: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'preparing', 'completed', 'cancelled'],
    default: 'pending'
  },
  adminCompleted: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
