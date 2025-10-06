



// const express = require('express');
// const cors = require('cors');
// const axios = require('axios');
// require('dotenv').config();

// const app = express();

// // ✅ Allow CORS from your frontend
// app.use(cors({
//   origin: "https://dashing-boba-9b6a2b.netlify.app",
//   methods: ["GET", "POST"]
// }));

// app.use(express.json());

// // Gemini AI caption generator
// const apiKey = process.env.GEMINI_API_KEY;

// // Generate unique captions for any image
// const generateCaption = async () => {
//   try {
//     const response = await axios.post(
//       'https://api.gemini.google.com/v1/generate',
//       {
//         prompt: `Generate two funny meme captions for an image: a top caption and a bottom caption. Return JSON like {"top":"...","bottom":"..."}. Do NOT include filenames in the captions.`,
//         model: 'gemini-2.5-flash'
//       },
//       {
//         headers: {
//           'Authorization': `Bearer ${apiKey}`,
//           'Content-Type': 'application/json',
//         }
//       }
//     );

//     // Parse AI response
//     let json;
//     try {
//       json = JSON.parse(response.data.output || response.data);
//     } catch {
//       json = { top: "Funny top caption", bottom: "Funny bottom caption" };
//     }

//     return json;

//   } catch (err) {
//     console.error('Gemini error:', err.response?.data || err.message);
//     // fallback random captions
//     const topOptions = [
//       "When life surprises you",
//       "Guess what happens next",
//       "Oops, unexpected!"
//     ];
//     const bottomOptions = [
//       "You won't believe this!",
//       "Absolutely hilarious!",
//       "Can't stop laughing!"
//     ];
//     const randomTop = topOptions[Math.floor(Math.random() * topOptions.length)];
//     const randomBottom = bottomOptions[Math.floor(Math.random() * bottomOptions.length)];
//     return { top: randomTop, bottom: randomBottom };
//   }
// };

// // API route
// app.post('/api/generate-caption', async (req, res) => {
//   const caption = await generateCaption();
//   res.json(caption);
// });

// // Start server
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`Backend running on ${PORT}`));



const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ Allow CORS from your Netlify frontend
app.use(cors({
  origin: "https://dashing-boba-9b6a2b.netlify.app",
  methods: ["GET", "POST"]
}));

app.use(express.json());

// -------------------------------
// Improved Random Captions Generator
// -------------------------------
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

// -------------------------------
// API route
// -------------------------------
app.post('/api/generate-caption', async (req, res) => {
  const caption = await generateCaption();
  res.json(caption);
});

// -------------------------------
// Start server
// -------------------------------
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
