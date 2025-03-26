const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  comment: { type: String, required: true },
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', commentSchema);