import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const chattyData = {
  currentUser: {
    name: "Bob"
  }, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: []
}

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

  userMessage(message) {
    this.WSconn.send(JSON.stringify(message));
    console.log("message from user",message);
  }

  addMessage = (message) => {

    const newMessage = { username: message.username, content: message.content};

    this.userMessage({message:newMessage});

  }

  componentDidMount() {

    this.WSconn.onopen = (event) => {
      console.log('Connect in server.')
    }

    this.WSconn.onmessage = (event) => {
      const chattyDataArray = [];
      const chattyData = JSON.parse(event.data);
      chattyDataArray.push(chattyData.message);
      this.setState({messages: this.state.messages.concat(chattyDataArray)});
    }
  }

  render() {
      return (
        <div>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
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