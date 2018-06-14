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

  //take care of the user
  handleUsername = (event) => {
    if(event.key === 'Enter') {
      this.props.currentUser(this.state);
      this.setState({username: event.target.value});
    }
  }

  //take care of the user when change
  handleUsernameChange = (event) => {
    this.setState({username: event.target.value});
  }

  //take care of the content.. the message
  handleContent = (event) => {
    this.setState({content: event.target.value});
  }

  // Take care of submit from the user if the user click enter
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