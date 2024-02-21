import React from 'react';
import './App.css';
import HeroSection from './HeroSection';
import CloudImageUploader from './CloudImageUploader';

function App() {
  return (
    <React.StrictMode>
      <HeroSection />
      <CloudImageUploader/>
    </React.StrictMode>
  );
}

export default App;
