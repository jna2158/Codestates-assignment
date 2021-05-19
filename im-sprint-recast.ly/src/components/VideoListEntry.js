import { render } from 'enzyme';
import React from 'react';
//클릭 이벤트 핸들러 함수 정의

function VideoListEntry(props) {
  console.log(props.video)
  function clickVideoName() {
    props.changeVideo(props.video);
  }
  return (
    <div className="video-list-entry">
      <div className="media-left media-middle">
        <img className="media-object" src={props.video.snippet.thumbnails.default.url} alt="" />
      </div>
      <div className="media-body">
        <div className="video-list-entry-title" onClick={clickVideoName}>{props.video.snippet.title}</div>
        <div className="video-list-entry-detail">{props.video.snippet.description}</div>
      </div>
    </div>
  )
};

export default VideoListEntry;
