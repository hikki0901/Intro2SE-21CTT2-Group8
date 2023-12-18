import React, { useState } from 'react';
import "../CSS/video.css"
   
function Video() {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  
    const handleNext = () => {
      setCurrentVideoIndex((currentVideoIndex + 1) % videos.length);
    };
  
    const handlePrevious = () => {
      setCurrentVideoIndex((currentVideoIndex - 1 + videos.length) % videos.length);
    };

    const videos = [
        { url: 'https://www.youtube.com/embed/DLYb3IgQ1Qk?si=FbfywPNxPG3VgPOc', title: 'The psychological weight loss strategy | Laurie Coots' },
        { url: 'https://www.youtube.com/embed/P-0QNLl5fIY?si=IEigyNQWyyVo1epr', title: 'Diet Science: Techniques to Boost Your Willpower and Self-Control | Sylvia Tara | Big Think' },
        { url: 'https://www.youtube.com/embed/O9ouhTy2QBU?si=627IliN_opTpz8up', title: 'How to Stay Motivated to Lose Weight: 5 Science Backed Steps' },
        { url: 'https://www.youtube.com/embed/QI6JlL1cU-Q?si=6RDgx-Iiy690-UTp', title: 'WEIGHT LOSS MOTIVATION | how to keep going when you want to quit' },
        { url: 'https://www.youtube.com/embed/Q4yUlJV31Rk?si=h7oQUWMbLSruiizE', title: 'How to make healthy eating unbelievably easy | Luke Durward | TEDxYorkU' }
      ];      

    return(
        <div className='video'>
            <div className='heading'>
                <h1>Your Motivation of The Week</h1>
            </div>
            <div className='video-content'>
                <button onClick={handlePrevious}>←</button>
                <iframe width="672" height="378" src={videos[currentVideoIndex].url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                <button onClick={handleNext}>→</button>
            </div>
            <div className='title'>
                <h2>{videos[currentVideoIndex].title}</h2>
            </div>
        </div>
    );
}

export default Video;