const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guestPostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, default: 'pending' }, // pending, approved, rejected
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('GuestPost', guestPostSchema);