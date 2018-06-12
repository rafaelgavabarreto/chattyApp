import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        {
          this.props.messages.map((chattyObj, index) =>
            <Message index= {index}
            chattyUsername= {chattyObj.username}
            chattyMessage={chattyObj.content} />)
        }
        <div className="message system"/>
      </main>
        )}
  }

export default MessageList;