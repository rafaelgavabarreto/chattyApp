import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const chattyData = {
  currentUser: {
    name: "Bob"
  }, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [{
    username: "Bob",
    content: "Has anyone seen my marbles?",
  }, {
    username: "Anonymous",
    content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
  }]
}


class App extends Component {

  // Set initial state so the component is initially "loading"
  constructor(props) {
    this.state = {
      currentUser: {name: "Bob"},
      messages: [] // messages coming from the server will be stored here as they arrive
    };
    // this is the *only* time you should assign directly to state:
    // this.state = { loading: true };
    this.addMessage = this.addMessage.bind(this);
    this.state = chattyData;
    // this.userMessage = this.message.bind(this);
    this.userMessage = this.userMessage.bind(this);
    this.WSconn = new WebSocket("ws://localhost:3001");
  }

  userMessage(message) {
    this.WSconn.send(JSON.stringify(message));
    console.log("message from user",message);
  }

  addMessage = (chattyNewMessage) => {

    const newMessage = {username: chattyNewMessage.username, content: chattyNewMessage.content};

    const messages = this.state.messages.concat([newMessage]);

    this.setState({messages});

    this.userMessage({message:chattyNewMessage});

  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages});
    }, 3000);
  }

  render() {
      return (
        <div>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
          </nav>
          <MessageList messages={this.state.messages}/>
          <ChatBar currentUser={this.state.currentUser.name}/>
          <ChatBar addMessage={this.addMessage}
           currentUser={this.state.currentUser}
           onEnter={this.handleSubmit}/>
        </div>
        );
  }
}

export default App;