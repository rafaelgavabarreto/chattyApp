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
    super(props);
    // this is the *only* time you should assign directly to state:
    // this.state = { loading: true };
    this.handleNewMessage = this.handleNewMessage.bind(this);
    this.state = chattyData;
  }

  handleNewMessage = (chattyNewMessage) => {

    const newMessage = {username: chattyNewMessage.username, content: chattyNewMessage.content};

    const messages = this.state.messages.concat([newMessage]);

    this.setState({messages});

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
          <ChatBar handleNewMessage={this.handleNewMessage}
           currentUser={this.state.currentUser}
           onEnter={this.handleSubmit}/>
        </div>
        );
  }
}

export default App;