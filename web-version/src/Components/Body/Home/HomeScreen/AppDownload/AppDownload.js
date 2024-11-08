import React from 'react';
import './AppDownload.css';

export const AppDownload = () => {
  return (
    <section className="app-download" id="download">
      <h2>Download Our App</h2>
      <img src="/path/to/download-banner.jpg" alt="Download App Banner" className="download-image" />
      <p>Join tournaments on the go! Available on Android and iOS.</p>
      <div className="download-buttons">
        <button className="download-btn">Download for Android</button>
        <button className="download-btn">Download for iOS</button>
      </div>
    </section>
  );
};


