import React, { useState } from 'react';
import axios from 'axios';

const ImageUploader = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    const handleUpload = async() => {
      const formData = new FormData();
        if (selectedImage) {
          formData.append('image', selectedImage);
          console.log('Selected Image:', selectedImage);
          await axios
            .post('http://localhost:5000/upload', { image: selectedImage })
            .then((response) => {
              console.log('Image uploaded successfully:', response.data);
            })
            .catch((error) => {
              console.error('Error uploading image:', error);
            });
            console.log('Image uploaded successfully.');
        }
      };

    return (
        <div>
          <input type="file" onChange={handleImageChange} />
          <button onClick={handleUpload}>Upload Image</button>
          {selectedImage && (
            <div>
              <p>Selected Image Preview:</p>
              <img
                src={selectedImage}
                alt="Selected"
                style={{ maxWidth: '100%', maxHeight: '300px' }}
              />
            </div>
          )}
        </div>
      );
}

export default ImageUploader;