import React, { Component } from 'react';

class ChatBar extends Component {
    constructor(props) {
    super();

    this.state = {username: props.currentUser.name, content: ''}

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleContent = this.handleContent.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsername = (event) => {
    if(event.key === 'Enter') {
      this.props.currentUser(this.state);
      this.setState({username: event.target.value});
    }
  }

  handleUsernameChange = (event) => {
    this.setState({username: event.target.value});
  }

  handleContent = (event) => {
    this.setState({content: event.target.value});
  }

  handleSubmit = (event) => {
    if(event.key === 'Enter') {
      this.props.addMessage(this.state);
      this.setState({content:''});
    }
  }

  render() {

    return (
      <footer className="chatbar">
      
        <input className="chatbar-username"
          value={this.state.username || ''}
          onChange={this.handleUsernameChange}
          onKeyPress={this.handleSubmit}/>

        <input className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          value={this.state.content || ''}
          onChange={this.handleContent}
          onKeyPress={this.handleSubmit}/>

      </footer>
        );
  }
}

export default ChatBar;