import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
  car: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  total_price: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
});

export default mongoose.model('Rental', rentalSchema);