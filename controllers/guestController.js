const GuestPost = require('../models/GuestPost');

exports.submitGuestPost = async (req, res) => {
  try {
    const guestPost = new GuestPost(req.body);
    await guestPost.save();
    res.status(201).json({ message: 'Guest post submitted for review' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getGuestPosts = async (req, res) => {
  try {
    const guestPosts = await GuestPost.find();
    res.json(guestPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateGuestPost = async (req, res) => {
  try {
    const guestPost = await GuestPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(guestPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};