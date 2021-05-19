import React from 'react';
import VideoListEntry from './VideoListEntry';


const VideoList = (props) => {
  return (
    <div className="video-list media">
    {
      props.videos.map((video) => <VideoListEntry
      key={video.id.videoId}
      video={video}
      changeVideo = {props.changeVideo}/>)
    }
    </div>
  )
};

export default VideoList;
