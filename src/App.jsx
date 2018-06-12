import React, { Component } from 'react';
import Message from './Message.jsx';
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
    this.state = { loading: true };
  }

  // Called after the component was rendered and it was attached to the
  // DOM. This is a good place to make AJAX requests or setTimeout.
  componentDidMount() {
    // After 3 seconds, set `loading` to false in the state.
    setTimeout(() => {
      this.setState({ loading: false }); // this triggers a re-render!
    }, 3000)
  }

  render() {
    if (this.state.loading) {
      return <h1> Loading... </h1>
    } else {
      return <h1> Hello React: </h1>
    }
  }
}

export default App;