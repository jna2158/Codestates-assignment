import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryString: ''
    }
    this.changeInput = this.changeInput.bind(this);
  }

  changeInput(event) {
    this.setState({
      queryString: event.target.value
    })
  }

  render() {
    return(
      <div className="search-bar form-inline">
        <input className="form-control" type="text" onChange={this.changeInput}/>
        <button className="btn hidden-sm-down" onClick={() => {this.props.handleButtonClick(this.state.queryString)}}>
          검색
        </button>
      </div>
    )
  }
};

export default Search;
