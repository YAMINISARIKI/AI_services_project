import React, { useState, useEffect } from 'react';
import '../css/aud2txt.css';
import axios from 'axios';

const Aud2txt = () => {
  useEffect(() => {
    if (!localStorage.getItem('user')) {
      alert('Please Login Your Account');
      window.location.href = '/login';
    }
  }, []);

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please select an audio file first');
      return;
    }

    setLoading(true);
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result.split(',')[1];
      sendBase64ToBackend(base64);
    };

    reader.onerror = (error) => {
      console.error('Error converting audio file to Base64:', error);
      setLoading(false);
    };

    reader.readAsDataURL(selectedFile);
  };

  const sendBase64ToBackend = async (base64) => {
    try {
      const response = await axios.post('https://space-club.onrender.com/aud2txt', { audio: base64 });
      setResponse(response.data.transcription);
      console.log(response.data);
    } catch (error) {
      console.error('Error sending Base64 to backend:', error);
      alert('Failed to convert audio to text');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    {loading ? (
      <div class="container11">
        <div class="preloader11">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="shadow11"></div>
    </div>
    ):(
    <div className="audio-to-text">
      <header className="header">
        <h1>Audio to Text</h1>
      </header>
      <main className="main-content1">
        <form className="input-container" onSubmit={handleFileUpload}>
          <label htmlFor="audioFile">Upload your audio file:</label>
          <input
            type="file"
            id="audioFile"
            accept="audio/*"
            onChange={handleFileChange}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Converting...' : 'Convert and Send'}
          </button>
        </form>
        {loading && (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        )}
        {response && (
          <div className="output-container">
            <h2>Transcription:</h2>
            <div className="transcription-box">
              <p>{response}</p>
            </div>
          </div>
        )}
      </main>
    </div>
    )}
    </>
  );
};

export default Aud2txt;
