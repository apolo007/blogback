const Post = require('../models/Post');

exports.generateSitemap = async (req, res) => {
  try {
    const posts = await Post.find();
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.growwithdigitals.com/</loc>
  </url>
  ${posts.map(post => `
    <url>
      <loc>https://www.growwithdigitals.com/post/${post.slug}</loc>
      <lastmod>${post.createdAt.toISOString()}</lastmod>
    </url>
  `).join('')}
</urlset>`;
    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};