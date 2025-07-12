import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  const upload = async () => {
    if (!file) return setResult("Please select a file first");
    
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      const res = await axios.post("http://localhost:4000/upload", formData);
      setResult("✅ Uploaded with hash: " + res.data.hash);
    } catch (err) {
      setResult("❌ Error: " + (err.response?.data?.error || err.message));
    }
  };

  const verify = async () => {
    if (!file) return setResult("Please select a file first");
    
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      const res = await axios.post("http://localhost:4000/verify", formData);
      setResult(res.data.valid ? "✅ File is Verified" : "❌ File is Tampered");
    } catch (err) {
      setResult("❌ Error: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: '0 auto' }}>
      <h1>Secure File Upload & Verify</h1>
      <input 
        type="file" 
        onChange={(e) => setFile(e.target.files[0])} 
        style={{ margin: '10px 0' }}
      />
      <br />
      <button 
        onClick={upload} 
        style={{ padding: '8px 16px', marginRight: 10 }}
      >
        Upload to Blockchain
      </button>
      <button 
        onClick={verify} 
        style={{ padding: '8px 16px' }}
      >
        Verify File
      </button>
      <br /><br />
      <div style={{ 
        padding: 15, 
        background: '#f0f0f0',
        borderRadius: 5,
        minHeight: 40
      }}>
        {result}
      </div>
    </div>
  );
}

export default App;