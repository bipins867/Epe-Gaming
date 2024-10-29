import React from 'react';
import './TournamentHighlights.css';

export const TournamentHighlights = () => {
  return (
    <section className="tournament-highlights" id="highlights">
      <h2>Tournament Highlights</h2>
      {/* Video grid container */}
      <div className="highlights-video-grid">
        <div className="video-item">
          <video className="highlights-video" controls autoPlay loop muted>
          <source src="/Assets/Videos/ERGL.mp4" type="video/mp4" />
          <source src="/Assets/Videos/ERGL.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="video-item">
          <video className="highlights-video" controls autoPlay loop muted>
            <source src="/Assets/Videos/MRM1.mp4" type="video/mp4" />
            <source src="/Assets/Videos/MRM1.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="video-item">
          <video className="highlights-video" controls autoPlay loop muted>
          <source src="/Assets/Videos/MRM2.mp4" type="video/mp4" />
          <source src="/Assets/Videos/MRM2.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="video-item">
          <video className="highlights-video" controls autoPlay loop muted>
          <source src="/Assets/Videos/SNHK.mp4" type="video/mp4" />
          <source src="/Assets/Videos/SNHK.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="video-item">
          <video className="highlights-video" controls autoPlay loop muted>
          <source src="/Assets/Videos/VK.mp4" type="video/mp4" />
          <source src="/Assets/Videos/VK.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <p>Check out some of our best tournaments and amazing players in action.</p>
    </section>
  );
};
