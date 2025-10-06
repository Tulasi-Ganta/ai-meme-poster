// const express = require('express');
// const cors = require('cors');
// const axios = require('axios');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const apiKey = process.env.GEMINI_API_KEY;

// // Gemini caption generator
// const generateCaption = async (imageDescription) => {
//   try {
//     const response = await axios.post(
//       'https://api.gemini.google.com/v1/generate',
//       {
//         prompt: `Generate a funny meme top and bottom text for this image: "${imageDescription}". Return JSON like { "top": "", "bottom": "" }`,
//         model: 'gemini-2.5-flash',
//       },
//       {
//         headers: {
//           'Authorization': `Bearer ${apiKey}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//     // Gemini returns JSON as string, try parse
//     let json;
//     try {
//       json = JSON.parse(response.data.output || response.data);
//     } catch {
//       json = { top: "Funny top", bottom: "Funny bottom" };
//     }
//     return json;
//   } catch (err) {
//     console.error('Gemini error:', err.response?.data || err.message);
//     return { top: "Funny top", bottom: "Funny bottom" };
//   }
// };

// // Caption endpoint
// app.post('/api/generate-caption', async (req, res) => {
//   const { imageDescription } = req.body;
//   if (!imageDescription) return res.status(400).json({ error: 'Description required' });

//   const caption = await generateCaption(imageDescription);
//   res.json(caption);
// });

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`Backend running on ${PORT}`));


// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();

// // ✅ CORS: allow your Netlify frontend
// app.use(cors({
//   origin: "https://dashing-boba-9b6a2b.netlify.app", 
//   methods: ["GET","POST"]
// }));

// app.use(express.json());

// // Fake caption generator for demo
// const generateCaption = async (imageDescription) => {
//   return {
//     top: `Top caption for ${imageDescription}`,
//     bottom: `Bottom caption for ${imageDescription}`
//   };
// };

// // Caption endpoint
// app.post('/api/generate-caption', async (req, res) => {
//   const { imageDescription } = req.body;
//   if (!imageDescription) {
//     return res.status(400).json({ error: 'Description required' });
//   }

//   const caption = await generateCaption(imageDescription);
//   res.json(caption);
// });

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`Backend running on ${PORT}`));



const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

// ✅ CORS: allow your Netlify frontend
app.use(cors({
  origin: "https://dashing-boba-9b6a2b.netlify.app", 
  methods: ["GET","POST"]
}));

app.use(express.json());

// Gemini AI caption generator
const apiKey = process.env.GEMINI_API_KEY;

const generateCaption = async (imageDescription) => {
  try {
    const response = await axios.post(
      'https://api.gemini.google.com/v1/generate',
      {
        prompt: `Generate a funny meme top and bottom text for this image: "${imageDescription}". Return JSON like { "top": "", "bottom": "" }`,
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

  } catch (err) {
    console.error('Gemini error:', err.response?.data || err.message);
    // fallback captions
    return { top: "Funny top", bottom: "Funny bottom" };
  }
};

// Caption API route
app.post('/api/generate-caption', async (req, res) => {
  const { imageDescription } = req.body;
  if (!imageDescription) return res.status(400).json({ error: 'Description required' });

  const caption = await generateCaption(imageDescription);
  res.json(caption);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
