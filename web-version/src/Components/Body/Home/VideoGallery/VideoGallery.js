import React from 'react';
import './VideoGallery.css';

export const VideoGallery = () => {
  return (
    <section className="video-gallery" id="videos">
      <h2>Gameplay Videos</h2>
      <div className="video-grid">
        <iframe src="https://www.youtube.com/embed/sample1" title="Video 1" />
        <iframe src="https://www.youtube.com/embed/sample2" title="Video 2" />
        <iframe src="https://www.youtube.com/embed/sample3" title="Video 3" />
        <iframe src="https://www.youtube.com/embed/sample4" title="Video 4" />
      </div>
    </section>
  );
};

