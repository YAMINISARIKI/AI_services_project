import React, { useState, useEffect } from 'react';
import '../css/txt2vid.css';
// import '../css/prmt2aud.css'; // Assuming the loading animation CSS is in the same file
import axios from 'axios';

const Txt2vid = () => {
  useEffect(() => {
    if (!localStorage.getItem('user')) {
      alert('Please Login Your Account');
      window.location.href = '/login';
    }
  }, []);

  const [inputText, setInputText] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVideoUrl('');

    try {
      const response = await axios.post('https://space-club.onrender.com/txt2vid', { text: inputText });
      setVideoUrl(response.data);
    } catch (error) {
      console.error('Error generating video:', error);
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
        <div className="text-to-video">
          <header className="header">
            <h1>Text to Video</h1>
          </header>
          <main className="main-content">
            <form className="input-form" onSubmit={handleFormSubmit}>
              <label htmlFor="inputText">Enter your text:</label>
              <input
                type="text"
                id="inputText"
                value={inputText}
                onChange={handleInputChange}
                placeholder="Type something..."
                required
              />
              <button type="submit" disabled={loading}>
                {/* {loading ? 'Generating...' : 'Generate Video'} */}
                Generate Video
              </button>
            </form>
            {videoUrl && (
              <div className="video-container">
                <h2>Generated Video:</h2>
                <video controls autoPlay loop>
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
};

export default Txt2vid;
