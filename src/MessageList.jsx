import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        {
          this.props.messages.map((chatObj, index) =>
            <Message index= {index}
<<<<<<< HEAD
            chattyUsername= {chattyObj.username}
            chattyMessage={chattyObj.content} />)
=======
            chattyUsername= {chatObj.username}
            chattyMessage={chatObj.content} />)
>>>>>>> 1287d3f6888baaa2eab167ee7fa1150fe5bed26d
        }
        <div className="message system"/>
      </main>
        )}
  }

export default MessageList;