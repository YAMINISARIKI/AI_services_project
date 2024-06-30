import React, { useState, useEffect } from 'react';
import '../css/txt2img.css';
// import '../css/prmt2aud.css'; // Assuming the loading animation CSS is in the same file
import axios from 'axios';

const Txt2img = () => {
  useEffect(() => {
    if (!localStorage.getItem('user')) {
      alert('Please Login Your Account');
      window.location.href = '/login';
    }
  }, []);

  const [inputText, setInputText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setImageUrl('');

    try {
      const response = await axios.post('https://space-club.onrender.com/txt2img', { text: inputText });
      setImageUrl(response.data);
    } catch (error) {
      console.error('Error generating image:', error);
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
        <div className="text-to-image">
          <header className="header">
            <h1>Text to Image</h1>
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
                {/* {loading ? 'Generating...' : 'Generate Image'} */}
                Generate Image
              </button>
            </form>
            {imageUrl && (
              <div className="image-container">
                <h2>Generated Image:</h2>
                <img src={imageUrl} alt="Generated" />
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
};

export default Txt2img;
