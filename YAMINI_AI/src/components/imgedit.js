import React, { useState } from 'react';
import axios from 'axios';
import '../css/editimg.css';

const ImageEdit = () => {
  const [file, setFile] = useState(null);
  const [resultImageUrl, setResultImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file.');
      return;
    }

    setLoading(true);
    setResultImageUrl('');

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result.split(',')[1];

      try {
        const response = await axios.post('https://space-club.onrender.com/editimg', { data: base64String });
        setResultImageUrl(response.data);
      } catch (error) {
        console.error('Error editing the image:', error);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await axios.get(resultImageUrl, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'edited_image.png'); // You can change the file name and extension
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Failed to download image.');
    } finally {
      setDownloading(false);
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
        <div className="image-edit-container">
          <h1 className="title">Image Edit Service</h1>
          <form onSubmit={handleSubmit} className="image-edit-form">
            <label htmlFor="fileInput">Upload Image:</label>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
            <button type="submit" disabled={loading} className="submit-button">
              Edit Image
            </button>
          </form>

          {resultImageUrl && (
            <div className="image-comparison">
              <div className="image-wrapper">
                <h2>Original Image</h2>
                <img src={URL.createObjectURL(file)} alt="Original" className="image" />
              </div>
              <div className="image-wrapper">
                <h2>Edited Image</h2>
                <img src={resultImageUrl} alt="Edited" className="image" />
                <button onClick={handleDownload} className="download-button" disabled={downloading}>
                  {downloading ? 'Downloading...' : 'Download Edited Image'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageEdit;
