import * as React from 'react';
import Comment from 'containers/comments/_Comment';
import { compose } from 'react-apollo';
import withCurrentUser from 'queries/currentUserQuery';

import NEW_COMMENT_SUBSCRIPTION from 'graphql/recipes/newCommentSubscription.graphql';

// typings
import { RecipeFragment, CommentFragment, User } from 'types';

interface IProps {
  subscribeToMore: Function;
  currentUser: User;
  receiver: User;
  recipe: RecipeFragment;
}

class CommentList extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.subscribeToNewComment = this.subscribeToNewComment.bind(this);
  }

  public componentWillMount() {
    this.subscribeToNewComment(this.props.currentUser?.id, this.props.receiver.id,this.props.recipe.id);
  }

  private subscribeToNewComment(senderId: string, receiverId: string, recipeId: string) {
    this.props.subscribeToMore({
      document: NEW_COMMENT_SUBSCRIPTION,
      variables: {
        senderId: senderId,
        receiverId: receiverId,
        recipeId: recipeId
      },
      updateQuery(state: any, { subscriptionData }: any) {
        if (!subscriptionData.data || !subscriptionData.data.newComment) return false;
        const newComment: CommentFragment = subscriptionData.data.newComment as CommentFragment;
        // To prevent duplicates, we add an extra check to verify that we did not already add the comment to our store
        if (isAlreadyPresent(state.recipe.comments, newComment)) return false;

        return {
          recipe: {
            ...state.recipe,
            comments: [...state.recipe.comments, newComment]
          }
        };
      }
    });
  }

  public render() {

    const { comments } = this.props.recipe;
    if (!comments || comments.length === 0) {
      return null;
    }

    return comments.map((comment: CommentFragment) => {
      return <div key={comment.id}>    
        {this.props.currentUser && ((this.props.currentUser.id === comment.sender.id) ||
          (this.props.currentUser.id === comment.receiver.id)) ? (
          <>
            <Comment key={comment.id} comment={comment} />
          </>          
          ) : null}
        
      </div>;
    });
  }
}

// Pending element has a temporary id. Unlike a classic id, it's not a number
function isPending(el: any): boolean {
  return isNaN(parseInt(el.id, 10));
}

function isSameComment(comment1: CommentFragment, comment2: CommentFragment): boolean {
  return comment1.body === comment2.body && comment1.sender.id === comment2.sender.id;
}

function isAlreadyPresent(comments: Array<CommentFragment>, newComment: CommentFragment): boolean {
  if (comments.find((c: CommentFragment) => c.id === newComment.id)) return true;
  // A new comment is created with optimistic UI.
  // The new comment is perhaps already present as pending comment with temporary id
  const pendingComment: CommentFragment | undefined = comments.find((c: CommentFragment) => isPending(c));
  if (pendingComment && isSameComment(pendingComment, newComment)) return true;
  return false;
}


export default compose(withCurrentUser)(CommentList);
