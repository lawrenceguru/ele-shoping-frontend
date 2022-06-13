import * as React from 'react';
import { compose } from 'react-apollo';
import Rating from '@mui/material/Rating';

import withCurrentUser from 'queries/currentUserQuery';
import formatDate from 'utils/dateUtils';

// typings
import { ReviewFragment } from 'types';

interface IProps {
  review: ReviewFragment;
  match: any;
}

class ReviewPreview extends React.Component<IProps, {}> {
  public render() {
    const { review } = this.props;
    return (
      <>
         <article key={review.id}>
            <section className="uk-grid-small uk-child-width-1-1" data-uk-grid>
                <header>
                <div className="uk-h4 uk-margin-remove">{review.author.firstName} {review.author.lastName}</div>
                <time className="uk-text-meta">{formatDate(review.insertedAt, 'short')}</time>
                </header>
                <div>
                <ul className="uk-iconnav uk-margin-bottom tm-rating">
                  <Rating name="read-only" value={review.rating} readOnly />
                </ul>
                <div><p>{review.body}</p></div>
                </div>
            </section>
        </article>
      </>
    );
  }
}

export default compose(withCurrentUser)(ReviewPreview);
