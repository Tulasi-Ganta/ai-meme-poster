const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: "https://dashing-boba-9b6a2b.netlify.app",
  methods: ["GET", "POST"]
}));

app.use(express.json());


// Improved Random Captions Generator

const generateCaption = async () => {
  const topPhrases = [
    "Guess what happens next",
    "You won't believe this",
    "When life surprises you",
    "Oops, unexpected",
    "Look at this!"
  ];
  const bottomPhrases = [
    "Absolutely hilarious!",
    "I can't stop laughing!",
    "What even is this?!",
    "This is so funny!",
    "Don't miss this!"
  ];

  const randomTop = topPhrases[Math.floor(Math.random() * topPhrases.length)];
  const randomBottom = bottomPhrases[Math.floor(Math.random() * bottomPhrases.length)];

  return { top: randomTop, bottom: randomBottom };
};


// API route

app.post('/api/generate-caption', async (req, res) => {
  const caption = await generateCaption();
  res.json(caption);
});

// Start server

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
