import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export const Exercise = mongoose.model('Exercise', schema);
