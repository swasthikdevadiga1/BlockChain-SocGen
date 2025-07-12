import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setResult(null); 
    setError(false);
  };

  const handleApiCall = async (endpoint) => {
    if (!file) {
      setResult("Please select a file first.");
      setError(true);
      return;
    }
    
    setLoading(true);
    setResult(null);
    setError(false);
    
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      const res = await axios.post(`http://localhost:4000/${endpoint}`, formData);
      if (endpoint === 'upload') {
        setResult({
          message: "✅ File uploaded successfully!",
          hash: res.data.hash,
        });
      } else {
        setResult({
          message: res.data.valid ? "✅ File is Verified" : "❌ File is Tampered",
        });
      }
    } catch (err) {
      setResult(err.response?.data?.error || err.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Secure File Upload & Verify on Blockchain</h1>
      
      <label className="file-input-wrapper" htmlFor="file-upload">
        {file ? `Selected: ${file.name}` : "Click to choose a file"}
        <input id="file-upload" type="file" onChange={handleFileChange} />
      </label>

      {file && (
        <div className="file-info">
          <strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB
        </div>
      )}

      <div className="button-group">
        <button onClick={() => handleApiCall('upload')} disabled={!file || loading}>
          Upload
        </button>
        <button onClick={() => handleApiCall('verify')} disabled={!file || loading}>
          Verify
        </button>
      </div>

      {loading && <div className="loader"></div>}

      {result && (
        <div className={`result ${error ? 'error' : ''}`}>
          <p>{result.message || result}</p>
          {result.hash && (
            <p>
              <strong>Hash:</strong> {result.hash}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;