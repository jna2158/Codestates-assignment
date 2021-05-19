import React from "react";
import Nav from "./Nav";
import VideoPlayer from "./VideoPlayer";
import VideoList from "./VideoList";
import { fakeData } from './__test__/fakeData';
import { render } from "enzyme";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: fakeData,
      commercialVideo: fakeData[0]
    }
    this.changeCurrentVideo = this.changeCurrentVideo.bind(this);
  }

  changeCurrentVideo(videoTitle) {
    this.setState({
      commercialVideo: videoTitle
    })
  }

  render() {
    return(
      <div>
        <Nav />
        <div className="parent">
          <VideoPlayer video={this.state.commercialVideo}/>
          <VideoList videos={this.state.videos} changeVideo={this.changeCurrentVideo}/>
        </div>
      </div>
    )
  }
}

export default App;
