import React from "react";
import Nav from "./Nav";
import VideoPlayer from "./VideoPlayer";
import VideoList from "./VideoList";
import LoadingIndicator from "./LoadingIndicator";
import { fakeData } from './__test__/fakeData';
//let url = `https://ur8ist29gg.execute-api.us-east-1.amazonaws.com/dev/youtube-data`
//let key = 'AIzaSyBFePDlFaJ_gdaGVLjwZjiCFapuW5HV014'

class App extends React.Component {
  constructor(props) {  
    super(props)
    this.state = {
      videos: [],
      currentVideo: null,
      isLoading: true
    }
    this.setCurrentVideo = this.setCurrentVideo.bind(this)
    this.searchVideo = this.searchVideo.bind(this)
  }

  componentDidMount() {
    // side effect를 일으키는 searchVideo 함수는 componentDidMount에서 처리합니다.
    this.searchVideo('코드스테이츠')
  }

  setCurrentVideo(video) {
    this.setState({
      currentVideo: video
    })
  }

  searchVideo(queryString) {
    let url = `https://www.googleapis.com/youtube/v3/search?key=${key}&part=snippet&q=${queryString}`
  
    this.setState({
      isLoading: true,
    })
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          videos: res.items,
          isLoading: false,
        })
    }, 2000)
  }

  render() {
    return (
      <div>
        <Nav handleButtonClick={this.searchVideo}/>
        {this.state.isLoading ?
          <LoadingIndicator />
          :
          <div className="parent">
            <VideoPlayer video={this.state.currentVideo} />
            <VideoList videos={this.state.videos} handleClickEntry={this.setCurrentVideo} />
          </div>
        }
      </div>
    )
  }
}

export default App;
