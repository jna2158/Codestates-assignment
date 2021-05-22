import React from 'react';
import VideoListEntry from './VideoListEntry';

const VideoList = ({ videos, handleClickEntry }) => {
  if (videos.length === 0) {
    return '비디오 목록이 없습니다'
  }

  return (
    <div className="video-list media">
      {videos.map(video =>
        <VideoListEntry video={video} key={video.etag} handleClick={handleClickEntry} />
      )}
    </div>
  )
};

export default VideoList;
