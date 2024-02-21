import React, { useState } from 'react';
import './CloudImageUploader.css';

const CloudImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleUploadClick = async () => {
    setUploadStatus('Uploading...');

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadStatus('Image uploaded successfully!');
      } else {
        setUploadStatus('Error uploading image: ' + data.message);
      }
    } catch (error) {
      console.error(error);
      setUploadStatus('Error uploading image: ' + error.message);
    }
  };

  return (
    <div className="cloud-image-uploader">
      <input className='browse_image' type="file" onChange={handleFileChange} />
      <button className='upload_image' onClick={handleUploadClick} disabled={!selectedImage}>
        Upload Image
      </button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default CloudImageUploader;
