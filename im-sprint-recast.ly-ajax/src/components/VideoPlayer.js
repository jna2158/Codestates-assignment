import React from 'react';

const VideoPlayer = ({ video }) => {
  if (!video) {
    return <div>비디오를 선택하세요</div>
  }

  return (
    <div className="video-player">
      <div className="embed-responsive embed-responsive-16by9">
        <iframe className="embed-responsive-item"
          src={`https://www.youtube.com/embed/${video.id.videoId}`} allowFullScreen></iframe>
      </div>
      <div className="video-player-details">
        <h3>{video.snippet.title}</h3>
        <div>{video.snippet.description}</div>
      </div>
    </div>
  )
}

export default VideoPlayer;
