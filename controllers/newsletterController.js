const Subscriber = require('../models/Subscriber');

exports.subscribe = async (req, res) => {
  const { email } = req.body;
  try {
    let subscriber = await Subscriber.findOne({ email });
    if (subscriber) return res.status(400).json({ message: 'Already subscribed' });

    subscriber = new Subscriber({ email });
    await subscriber.save();
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};