const Post = require('../models/Post');
const { sendEmail } = require('../utils/mailer');
const Subscriber = require('../models/Subscriber');

// Slug-to-category mapping
const categoryMap = {
  'ai-tools': 'AI Tools',
  'digital-marketing': 'Digital Marketing',
  'blogging': 'Blogging',
  'seo': 'SEO',
  'online-business': 'Online Business',
};

exports.createPost = async (req, res) => {
  const { title, content, imageUrl, category } = req.body;
  try {
    const slug = title.toLowerCase().replace(/ /g, '-');
    const post = new Post({ title, content, imageUrl, slug, category });
    await post.save();

    // Notify subscribers
    const subscribers = await Subscriber.find();
    subscribers.forEach(sub => {
      sendEmail(sub.email, 'New Post Published', `Check out our new post: ${title}\nhttps://growwithdigitals.com/post/${slug}`);
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { category } = req.query;
    let queryCategory = category;
    
    // Convert slug to proper category name if slug is provided
    if (category && categoryMap[category]) {
      queryCategory = categoryMap[category];
    }

    const query = queryCategory ? { category: queryCategory } : {};
    const posts = await Post.find(query).sort({ createdAt: -1 }); // Latest posts first
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    post.views += 1;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ slug: req.params.slug });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    post.likes += 1;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};