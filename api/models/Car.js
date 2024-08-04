import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const carSchema = new Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price_per_day: { type: Number, required: true },
  availability_status: { type: Boolean, default: true },
  description: { type: String },
photos: { type: [String] },
});
export default mongoose.model('Car', carSchema);