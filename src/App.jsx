import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const chattyData = {
  currentUser: {
    name: "Anonymous"
  }, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: []
}

var usersOnLine = 0;

class App extends Component {

  // Set initial state so the component is initially "loading"
  constructor(props) {
    super(props);

    this.addMessage = this.addMessage.bind(this);
    this.state = chattyData;

    this.userMessage = this.userMessage.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.WSconn = new WebSocket("ws://localhost:3001");
  }

  componentDidMount() {
    this.WSconn.onopen = (event) => {
      console.log('Connected to server')
    }

    this.WSconn.onmessage = (event) => {
      const chattyDataArray = [];
      const chattyData = JSON.parse(event.data);

      usersOnLine = chattyData.onlineUsers;

      switch(chattyData.type) {
        case "IncomingMessage": {
          this.setState({
            messages: this.state.messages.concat(chattyData)
          })
        }
          break;
        case "IncomingNotification": {
          this.setState({
            messages: this.state.messages.concat(chattyData)
          })
        }
          break;
        default:
          throw new Error("Unknown event type " + chattyData.message.type);
      }
      this.setState({messages: this.state.messages.concat(chattyDataArray)});
    }
  }

  userMessage(message) {
    this.WSconn.send(JSON.stringify(message));
    console.log("message from user",message);
  }

  addMessage = (message) => {

    if(this.state.currentUser.name !== message.username) {
      const notification = {type:"postNotification", content: `${this.state.currentUser.name} changed their name to ${message.username}`};
      this.state.currentUser.name = message.username;
      this.userMessage({message: notification});
    }
    const newMessage = {type: "postMessage", username: message.username, content: message.content};
    this.userMessage({message: newMessage});
  }

  render() {
      return (
        <div>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty App</a>
            {
              usersOnLine ? <a className="navbar-brand"> {usersOnLine} users online</a> : <a className="navbar-brand"> 0 users online</a>
            }
          </nav>
          <MessageList messages={this.state.messages}/>
          <ChatBar addMessage={this.addMessage}
           currentUser={this.state.currentUser}
           />
        </div>
        );
  }
}

export default App;