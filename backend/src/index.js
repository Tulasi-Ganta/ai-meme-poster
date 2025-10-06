
// const express = require('express');
// const cors = require('cors');
// const axios = require('axios');
// require('dotenv').config();

// const app = express();

// // ✅ Allow CORS from your Netlify frontend
// app.use(cors({
//   origin: "https://dashing-boba-9b6a2b.netlify.app", // replace with your frontend URL
//   methods: ["GET", "POST"]
// }));

// app.use(express.json());

// // -------------------------------
// // Gemini AI caption generator
// // -------------------------------
// const apiKey = process.env.GEMINI_API_KEY;

// const generateCaption = async (imageDescription) => {
//   try {
//     const response = await axios.post(
//       'https://api.gemini.google.com/v1/generate',
//       {
//         prompt: `Generate a unique, funny meme top and bottom text for this image: "${imageDescription}". Return JSON like { "top": "", "bottom": "" }`,
//         model: 'gemini-2.5-flash',
//       },
//       {
//         headers: {
//           'Authorization': `Bearer ${apiKey}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     // Parse response JSON safely
//     let json;
//     try {
//       json = JSON.parse(response.data.output || response.data);
//     } catch {
//       json = { top: `Funny top for ${imageDescription}`, bottom: `Funny bottom for ${imageDescription}` };
//     }

//     return json;

//   } catch (err) {
//     console.error('Gemini error:', err.response?.data || err.message);
//     // fallback random captions
//     const topOptions = [
//       `Look at this ${imageDescription}!`,
//       `OMG! ${imageDescription}`,
//       `When ${imageDescription} appears...`,
//       `Everyone sees ${imageDescription} and...`,
//       `Can't believe this ${imageDescription}!`
//     ];
//     const bottomOptions = [
//       `Don't forget to laugh!`,
//       `This is so funny!`,
//       `I can't stop laughing!`,
//       `What even is this?!`,
//       `You won't believe it!`
//     ];
//     const randomTop = topOptions[Math.floor(Math.random() * topOptions.length)];
//     const randomBottom = bottomOptions[Math.floor(Math.random() * bottomOptions.length)];
//     return { top: randomTop, bottom: randomBottom };
//   }
// };

// // -------------------------------
// // API route
// // -------------------------------
// app.post('/api/generate-caption', async (req, res) => {
//   const { imageDescription } = req.body;
//   if (!imageDescription) {
//     return res.status(400).json({ error: 'Description required' });
//   }

//   const caption = await generateCaption(imageDescription);
//   res.json(caption);
// });

// // -------------------------------
// // Start server
// // -------------------------------
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`Backend running on ${PORT}`));





const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

// ✅ Allow CORS from your Netlify frontend
app.use(cors({
  origin: "https://dashing-boba-9b6a2b.netlify.app",
  methods: ["GET", "POST"]
}));

app.use(express.json());

// -------------------------------
// AI Caption generator
// -------------------------------
const apiKey = process.env.GEMINI_API_KEY;

const generateCaption = async (imageDescription) => {
  try {
    // If Gemini API is configured
    if (apiKey) {
      const response = await axios.post(
        'https://api.gemini.google.com/v1/generate',
        {
          prompt: `You are a funny meme generator. Create a creative and unique top and bottom caption for a meme based on this image description: "${imageDescription}". Return JSON in this format: { "top": "", "bottom": "" }`,
          model: 'gemini-2.5-flash',
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Gemini may return JSON as string
      let json;
      try {
        json = JSON.parse(response.data.output || response.data);
      } catch {
        json = { top: "Funny top", bottom: "Funny bottom" };
      }

      return json;
    }

    // ✅ Fallback: Random captions without image filename
    const topOptions = [
      "When life gives you lemons...",
      "That moment when you realize...",
      "Everyone's reaction is priceless...",
      "You won't believe this!",
      "The funniest thing you'll see today..."
    ];
    const bottomOptions = [
      "And you just can't stop laughing!",
      "How did this even happen?!",
      "Absolutely hilarious!",
      "This made my day!",
      "Can't believe my eyes!"
    ];

    const randomTop = topOptions[Math.floor(Math.random() * topOptions.length)];
    const randomBottom = bottomOptions[Math.floor(Math.random() * bottomOptions.length)];

    return { top: randomTop, bottom: randomBottom };

  } catch (err) {
    console.error('Caption generation error:', err.response?.data || err.message);
    return { top: "Funny top", bottom: "Funny bottom" };
  }
};

// -------------------------------
// Caption API route
// -------------------------------
app.post('/api/generate-caption', async (req, res) => {
  // ✅ Ignore filename entirely
  const { imageDescription } = req.body;
  const description = imageDescription || "a funny meme image";

  const caption = await generateCaption(description);
  res.json(caption);
});

// -------------------------------
// Start server
// -------------------------------
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
