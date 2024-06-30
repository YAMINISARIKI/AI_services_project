import React, { useState, useEffect } from 'react';
import '../css/txt2aud.css';
// import '../css/prmt2aud.css'; // Assuming the loading animation CSS is in the same file
import axios from 'axios';

const TextToAudio = () => {
  useEffect(() => {
    if (!localStorage.getItem('user')) {
      alert('Please Login Your Account');
      window.location.href = '/login';
    }
  }, []);

  const [inputText, setInputText] = useState('');
  const [voiceType, setVoiceType] = useState('male');
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleVoiceChange = (e) => {
    setVoiceType(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAudioUrl('');

    try {
      const response = await axios.post('https://space-club.onrender.com/txt2aud', { text: inputText, voice: voiceType });
      setAudioUrl(response.data.audio_out);
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
            <h1>Text to Audio</h1>
          </header>
          <main className="main-content">
            <form className="input-form" onSubmit={handleFormSubmit}>
              <label htmlFor="inputText">Enter your text:</label>
              <textarea
                id="inputText"
                value={inputText}
                onChange={handleInputChange}
                placeholder="Type something..."
                required
              />
              <div className="voice-options">
                <label>
                  <input
                    type="radio"
                    value="male"
                    checked={voiceType === 'male'}
                    onChange={handleVoiceChange}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    value="female"
                    checked={voiceType === 'female'}
                    onChange={handleVoiceChange}
                  />
                  Female
                </label>
              </div>
              <button type="submit" disabled={loading}>
                {/* {loading ? 'Generating...' : 'Generate Audio'} */}
                Generate Audio
              </button>
            </form>
            {audioUrl && (
              <div className="audio-container">
                <h2>Generated Audio:</h2>
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

export default TextToAudio;
