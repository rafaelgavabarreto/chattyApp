import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        {
          this.props.messages.map(chattyObj =>
            <Message chattyUsername= {chattyObj.username}
                     chattyMessage = {chattyObj.content} />)
        }
      </main>
        )}
  }

export default MessageList;