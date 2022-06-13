import * as React from 'react';
import { compose } from 'react-apollo';
import withCurrentUser from 'queries/currentUserQuery';

// import formatDate from 'utils/dateUtils';

// typings
import { CommentFragment, User } from 'types';

interface IProps {
  comment: CommentFragment;
  currentUser: User;
}

class Comment extends React.Component<IProps, {}> {
  public render() {

    const { currentUser, comment } = this.props;

    return (
      <>
        {currentUser && currentUser.id === comment.sender.id ?
          <div className="uk-text-left">
              You
            <div className="uk-text-meta">
              {comment.body}
            </div>
            <br/>
          </div>
          : null}

        {currentUser && currentUser.id === comment.receiver.id ?
          <div className="uk-text-right">
              {comment.sender.firstName}
            <div className="uk-text-meta">
              {comment.body}
            </div>
          </div>
          : null}

        {/* <div className={'comment'}>        
        <div className="comment-content">{comment.body}</div>
        <div className="comment-meta">
          <span className="comment-author">
            <div>
            {comment.sender.firstName} ??? {comment.receiver.firstName}  
            </div>
            Commented by: <em>{comment.sender.firstName} </em>
          </span>
          <span className="date">{formatDate(comment.inserted_at)}</span>
        </div>
      </div> */}
      </>
    );
  }
}

export default compose(withCurrentUser)(Comment);
