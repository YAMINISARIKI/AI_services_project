import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/img2text.css';

const Img2text = () => {
  useEffect(() => {
    if (!localStorage.getItem('user')) {
      alert('Please Login Your Account');
      window.location.href = '/login';
    }
  }, []);

  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleExtractText = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file.');
      return;
    }

    setLoading(true);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result.split(',')[1];

        try {
          const response = await axios.post('https://space-club.onrender.com/img2text', { data: base64String });
          setExtractedText(response.data);
        } catch (error) {
          console.error('Error extracting text:', error);
          alert('Failed to extract text from image.');
        } finally {
          setLoading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error reading file:', error);
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
        <div className="text-extraction-container">
          <h1 className="title">Text Extraction from Image</h1>
          <form onSubmit={handleExtractText} className="input-form">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
              required
            />
            <button type="submit" className="extract-button" disabled={loading}>
              Extract Text
            </button>
          </form>
          {extractedText && (
            <div className="result-container">
              <h2 className="result-title">Extracted Text:</h2>
              <p className="extracted-text">{extractedText}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Img2text;
