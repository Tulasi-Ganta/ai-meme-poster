
// import { useState, useRef } from "react";
// import html2canvas from "html2canvas";
// import "./App.css";

// export default function App() {
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [caption, setCaption] = useState({ top: "", bottom: "" });
//   const [loading, setLoading] = useState(false);
//   const memeRef = useRef();

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   const generateCaption = async () => {
//     if (!image) return alert("Please select an image!");
//     setLoading(true);
//     try {
//       const res = await fetch(
//         "https://ai-meme-poster-2.onrender.com/api/generate-caption",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       const data = await res.json();
//       setCaption(data);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to generate caption.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadMeme = async () => {
//     if (!memeRef.current) return;
//     const canvas = await html2canvas(memeRef.current);
//     const link = document.createElement("a");
//     link.download = "meme.png";
//     link.href = canvas.toDataURL("image/png");
//     link.click();
//   };

//   return (
//     <div className="container">
//       <h1>AI Meme & Poster Creator</h1>
//       <input type="file" accept="image/*" onChange={handleImageChange} />

//       <div className="buttons">
//         <button onClick={generateCaption} disabled={loading}>
//           {loading ? "Generating..." : "Generate Caption"}
//         </button>
//         {caption.top && (
//           <button onClick={downloadMeme}>Download Meme</button>
//         )}
//       </div>

//       {preview && (
//         <div className="meme" ref={memeRef}>
//           <img src={preview} alt="Preview" />
//           <div className="top-text">{caption.top}</div>
//           <div className="bottom-text">{caption.bottom}</div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import "./App.css";

export default function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState({ top: "", bottom: "" });
  const [loading, setLoading] = useState(false);
  const memeRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const generateCaption = async () => {
    if (!image) return alert("Please select an image!");
    setLoading(true);
    try {
      const res = await fetch(
        "https://ai-meme-poster-2.onrender.com/api/generate-caption",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageDescription: image.name }),
        }
      );
      const data = await res.json();
      setCaption(data);
    } catch (err) {
      console.error(err);
      alert("Failed to generate caption.");
    } finally {
      setLoading(false);
    }
  };

  const downloadMeme = async () => {
    if (!memeRef.current) return;
    const canvas = await html2canvas(memeRef.current);
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="container">
      <h1>AI Meme & Poster Creator</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />

      <div className="buttons">
        <button onClick={generateCaption} disabled={loading}>
          {loading ? "Generating..." : "Generate Caption"}
        </button>
        {caption.top && <button onClick={downloadMeme}>Download Meme</button>}
      </div>

      {preview && (
        <div className="meme" ref={memeRef}>
          <img src={preview} alt="Preview" />
          <div className="top-text">{caption.top}</div>
          <div className="bottom-text">{caption.bottom}</div>
        </div>
      )}
    </div>
  );
}
