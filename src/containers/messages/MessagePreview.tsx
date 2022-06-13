import React, { Component } from 'react';
import { compose } from 'react-apollo';
import Timeago from "react-timeago";
import Gravatar from "react-gravatar";

import withCurrentUser from 'queries/currentUserQuery';

// typings
import { MessageFragment, User } from 'types';

interface IProps {
  message: MessageFragment;
  currentUser: User;
}

class MessagePreview extends Component<IProps, {}> {

  render() {
    const { message, currentUser } = this.props;
    return <div>
      {(currentUser.id === message.sender?.id) ?
        <div className="sc-chat-messages-wrapper my">
          <a href="#" className="sc-chat-message-avatar">
          {/* <p className="uk-text-small uk-text-secondary">{message.sender.firstName}</p> */}
          <Gravatar
              md5={message.sender.gravatarMd5}
              className="sc-avatar-initials"
              size={30}
            />
          </a>
          <ul className="sc-chat-messages">
            <li data-message-time="10:21">
              <p className="sc-chat-message-content">{message.body}</p>
              <time><Timeago date={`${message.insertedAt}`} /></time>
            </li>
          </ul>
        </div>
        :
        <div className="sc-chat-messages-wrapper">
          <a href="#" className="sc-chat-message-avatar">
          {/* <p className="uk-text-small uk-text-secondary">{message.sender.firstName}</p> */}
          <Gravatar
              md5={message.sender.gravatarMd5}
              className="sc-avatar-initials"
              size={30}
            />
          </a>
          <ul className="sc-chat-messages">
            <li data-message-time="10:48">
              <p className="sc-chat-message-content">{message.body}
              </p>
              <time><Timeago date={`${message.insertedAt}`} /></time>
            </li>
          </ul>
        </div>
      }

    </div>
  }
}

export default compose(withCurrentUser)(MessagePreview);