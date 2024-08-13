import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  username: { type: String, required: true },
});

export const User = mongoose.model('User', schema);
