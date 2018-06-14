import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const chattyData = {
  currentUser: {
    name: "Anonymous",
    color: "#a3fd7f"
  }, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: []
}

var usersOnLine = 0;

// Generate a random color for username
function getRandomColor() {
  return '#'+Math.random().toString(16).substr(-6);
};

var newColor = getRandomColor();

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
      console.log('Connected to server');
      usersOnLine = chattyData.onlineUsers;
    }

    this.WSconn.onmessage = (event) => {
      const chattyDataArray = [];
      const chattyData = JSON.parse(event.data);

      usersOnLine = chattyData.onlineUsers;

      switch(chattyData.type) {
        case "IncomingMessage": {
          this.setState({
            messages: this.state.messages.concat(chattyData);
          })
        }
          break;
        case "IncomingNotification": {
          this.setState({
            messages: this.state.messages.concat(chattyData);
          })
        }
          break;
        default:
          throw new Error("Unknown event type " + chattyData.message.type);
      }
      this.setState({messages: this.state.messages.concat(chattyDataArray)});
    }
  }

  // receive a nwq message from user
  userMessage(message) {
    this.WSconn.send(JSON.stringify(message));
    console.log("message from user",message);
  }

  // Add a new message in system
  addMessage = (message) => {
    if(this.state.currentUser.name !== message.username) {
      const notification = {type:"postNotification", content: `${this.state.currentUser.name} changed their name to ${message.username}`};
      this.state.currentUser.name = message.username;
      this.userMessage({message: notification});
    }
    const newMessage = {type: "postMessage", username: message.username, content: message.content, color: newColor};
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
          <MessageList messages={this.state.messages}
          users={this.state.users}/>
          <ChatBar addMessage={this.addMessage}
           currentUser={this.state.currentUser}
           />
        </div>
        );
  }
}

export default App;