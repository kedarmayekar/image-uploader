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
      const response = await fetch(process.env.REACT_APP_BE_URL, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setUploadStatus(JSON.stringify(data));
      if (response.ok) {
        setUploadStatus('Image uploaded successfully!');
        document.getElementsByClassName('browse_image')[0].value = null;
        setSelectedImage(null);
      } else {
        setUploadStatus('Error uploading image: ' + data.message);
      }
      setTimeout(() => {
        setUploadStatus(null);
      }, 7000);
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
     {uploadStatus && <div className="upload-image-status"><p>{uploadStatus}</p></div>}
    </div>
  );
};


export default CloudImageUploader;
