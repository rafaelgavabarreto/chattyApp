import React, { Component } from 'react';

//Class of notification
class Notification extends Component {
    render() {
        return (
            <div class="message system">
              {this.props.content}
            </div>
        );
    }
}

export default Notification;