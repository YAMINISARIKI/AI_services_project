import React, { useState, useEffect } from 'react';
import '../css/prmt2aud.css';
import axios from 'axios';

const Prmt2aud = () => {
  useEffect(() => {
    if (!localStorage.getItem('user')) {
      alert('Please Login Your Account');
      window.location.href = '/login';
    }
  }, []);

  const [inputText, setInputText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAudioUrl('');

    try {
      const response = await axios.post('https://space-club.onrender.com/prmt2aud', { text: inputText });
      setAudioUrl(response.data);
    } catch (error) {
      console.error('Error generating audio:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="container11">
          <div className="preloader11">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="shadow11"></div>
        </div>
      ) : (
        <div className="text-to-audio">
          <header className="header">
            <h1>AI MUSIC GENERATOR</h1>
          </header>
          <main className="main-content">
            <form className="input-form" onSubmit={handleFormSubmit}>
              <label htmlFor="inputText">Enter your Prompt:</label>
              <textarea
                id="inputText"
                value={inputText}
                onChange={handleInputChange}
                placeholder="Type something..."
                required
              />
              <button type="submit" disabled={loading}>
                Generate Music
              </button>
            </form>
            {audioUrl && (
              <div className="audio-container">
                <h2>Generated Music:</h2>
                <audio controls>
                  <source src={audioUrl} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
};

export default Prmt2aud;
