import logo from './logo.svg';
import './App.css';
import React from "react";

function App() {
  return (
    <div className="App">
      <Twittler/>
    </div>
  );
}

class Twittler extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: [
        {
          uuid: 1,
          writer: "김코딩",
          date: "2020-10-10",
          content: "안녕 리액트"
        },
        {
          uuid: 2,
          writer: "박해커",
          date: "2020-10-12",
          content: "좋아 코드스테이츠!"
        }
      ]
    }
    this.uuidNumber = 3;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({newTweet: event.target.value});
  }

  handleSubmit() {
    let year = new Date().getFullYear();
    let month = new Date().getMonth()+1;
    let day = new Date().getDate();
    let a = new Date().toLocaleDateString

    if(day < 10) {day = `0${day}`};
    if(month < 10) {month = `0${month}`};

    this.setState({
      tweets: this.state.tweets.concat({
        uuid: this.uuidNumber,
        writer: 'jiwon',
        date: `${year}-${month}-${day}`,
        content: this.state.newTweet
      })
    })
    this.uuidNumber++;
  }

  render() {
    return (
      <div>
          <div>작성자: jiwon</div>
          <div id="writing-area">
            <textarea value={this.state.newTweet} onChange={this.handleChange}></textarea>
            <button className="button" onClick={this.handleSubmit}>새 글 쓰기</button>
          </div>
        <ul id="tweet">
          {
            this.state.tweets.map(el => (
              <SingleTweet
                key = {el.uuid} 
                writer = {el.writer}
                date = {el.date}
                content = {el.content}
              />
            ))
          }
        </ul>
      </div>
    )
  }
}

function SingleTweet(props) {
  return (
    <li className="tweetList">
      <div className="writer">{props.writer}</div>
      <div className="date">{props.date}</div>
      <div className="content">{props.content}</div>
    </li>
  )
}

export default App;
