import React from 'react';
import './App.css';
import HeroSection from './HeroSection';
import ImageUploadComponent from './CloudUploaderV2';

function App() {
  return (
    <React.StrictMode>
      <HeroSection />
      <ImageUploadComponent/>
    </React.StrictMode>
  );
}

export default App;
