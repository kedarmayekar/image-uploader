// ImageUploadComponent.js

import React, { useState } from 'react';
import './CloudImageUploader.css';

function ImageUploadComponent() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(process.env.REACT_APP_BE_URL, {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      if (response.ok) {
        setUploadStatus('Image uploaded successfully!');
        document.getElementsByClassName('browse_image')[0].value = null;
        setFile(null);
      } else {
        setUploadStatus('Error uploading image: ' + data.message);
      }
      setTimeout(() => {
        setUploadStatus(null);
      }, 7000);
      // Handle response as needed
    } catch (error) {
      console.error(error);
      setUploadStatus('Error uploading image: ' + error.message);
    }

  };

  return (
    <div className="cloud-image-uploader">
      <input className='browse_image' type="file" onChange={handleFileChange} />
      <button className='upload_image' onClick={handleUpload}>Upload</button>
      {uploadStatus && <div className="upload-image-status"><p>{uploadStatus}</p></div>}
    </div>
  );
}

export default ImageUploadComponent;