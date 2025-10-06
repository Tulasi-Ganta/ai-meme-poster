import { useState, useRef } from "react";
import html2canvas from "html2canvas";

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
      //const res = await fetch("http://localhost:8000/api/generate-caption", {
      const res = await fetch("https://ai-meme-poster-2.onrender.com/api/generate-caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageDescription: image.name }),
      });
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
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>AI Meme & Poster Creator</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <div style={{ marginTop: "20px" }}>
        <button onClick={generateCaption} disabled={loading}>
          {loading ? "Generating..." : "Generate Caption"}
        </button>
      </div>

      {preview && (
        <div ref={memeRef} style={{ position: "relative", display: "inline-block", marginTop: "20px" }}>
          <img src={preview} alt="Preview" style={{ maxWidth: "300px", borderRadius: "8px" }} />
          <div style={{
            position: "absolute",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "white",
            fontWeight: "bold",
            fontSize: "20px",
            textShadow: "2px 2px 4px black",
          }}>{caption.top}</div>
          <div style={{
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "white",
            fontWeight: "bold",
            fontSize: "20px",
            textShadow: "2px 2px 4px black",
          }}>{caption.bottom}</div>
        </div>
      )}

      {caption.top && (
        <div style={{ marginTop: "20px" }}>
          <button onClick={downloadMeme}>Download Meme</button>
        </div>
      )}
    </div>
  );
}
