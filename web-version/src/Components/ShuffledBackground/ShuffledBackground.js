import React from 'react';
import './ShuffledBackground.css';

export const ShuffledBackground = () => {
  return (
    <div className="background">
      <div className="bg-container"> {/* Flex container for sliding effect */}
        <div className="bg-image" style={{ backgroundImage: 'url("/Assets/image/ENGL1.jpg")' }} />
        <div className="bg-image" style={{ backgroundImage: 'url("/Assets/image/ENGL2.jpg")' }} />
        <div className="bg-image" style={{ backgroundImage: 'url("/Assets/image/ENGL3.jpg")' }} />
        <div className="bg-image" style={{ backgroundImage: 'url("/Assets/image/ENGL4.jpg")' }} />
        <div className="bg-image" style={{ backgroundImage: 'url("/Assets/image/MRM1.jpg")' }} />
        <div className="bg-image" style={{ backgroundImage: 'url("/Assets/image/SNHK1.jpg")' }} />
        <div className="bg-image" style={{ backgroundImage: 'url("/Assets/image/SNHK2.jpg")' }} />
        <div className="bg-image" style={{ backgroundImage: 'url("/Assets/image/SNHK3.jpg")' }} />
        <div className="bg-image" style={{ backgroundImage: 'url("/Assets/image/SNHK4.jpg")' }} />
        <div className="bg-image" style={{ backgroundImage: 'url("/Assets/image/SNHK5.jpg")' }} />
        <div className="bg-image" style={{ backgroundImage: 'url("/Assets/image/VK1.jpg")' }} />
        <div className="bg-image" style={{ backgroundImage: 'url("/Assets/image/VK2.jpg")' }} />
        <div className="bg-image" style={{ backgroundImage: 'url("/Assets/image/VK3.jpg")' }} />
        <div className="bg-image" style={{ backgroundImage: 'url("/Assets/image/VK4.jpg")' }} />
      </div>
    </div>
  );
};
