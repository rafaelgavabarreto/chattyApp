import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        {
          this.props.messages.map((chatObj, index) =>
            <Message index= {index}
            chattyUsername= {chatObj.username}
            chattyMessage={chatObj.content} />)
        }
        <div className="message system"/>
      </main>
        )}
  }

export default MessageList;