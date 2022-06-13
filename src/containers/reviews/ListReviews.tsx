import * as React from 'react';
import { Query, compose } from 'react-apollo';
import withCurrentUser from 'queries/currentUserQuery';

import REVIEWS from 'graphql/reviews/reviewsQuery.graphql';

// typings
import { ReviewsData, ReviewsVariables } from 'types';
import Loading from 'components/Loading';
import { Rating } from '@mui/material';
import formatDate from 'utils/dateUtils';
class ReviewsQuery extends Query<ReviewsData, ReviewsVariables> { }

interface IProps {
    userId: string;
}

class ListReviews extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
        this.loadMoreReviews = this.loadMoreReviews.bind(this);
    }
    state = {
        hasMoreItems: true
    };
    private loadMoreReviews(data: ReviewsData, fetchMore: Function) {
        return async (event: React.MouseEvent<HTMLElement>) => {
            event.preventDefault();
            fetchMore({
                variables: { offset: data.userReviews && data.userReviews.length },
                updateQuery(state: any, { fetchMoreResult }: { fetchMoreResult: ReviewsData }) {
                    const { userReviews, userReviewStats } = fetchMoreResult;
                    if (!userReviews) return false;
                    return {
                        userReviews: [...state.userReviews, ...userReviews],
                        userReviewStats
                    };
                }
            });
        };
    }


    public render() {

        return (
            <ReviewsQuery query={REVIEWS} variables={{ limit: 5, offset: 0, userId: this.props.userId }}>
                {({ data, loading, fetchMore }) => {

                    if (!data || !data.userReviews) return null;
                    if (loading) return <Loading />;
                    if (data.userReviews.length === 0) return (
                        <>
                            <div className="uk-flex uk-flex-center">
                                <h4 className="uk-margin-medium-top uk-text-danger uk-h3"> Whoops! No Reviews found.</h4>
                            </div>
                        </>
                    );

                    return (
                        <section>
                            <div className="uk-grid-small uk-grid-divider" data-uk-grid>

                                <div className="uk-width-1-1 uk-width-1-5@s uk-text-center tm-reviews-column">
                                    <div className="uk-text-meta uk-text-uppercase">average rating</div>
                                    <div className="uk-heading-primary">{data.userReviewStats.averageReview}</div>
                                    <div className="uk-flex uk-flex-center">
                                        <ul className="uk-iconnav tm-rating">
                                            <Rating name="read-only" value={data.userReviewStats.averageReview} readOnly />({data.userReviewStats.totalReviews})
                                        </ul>
                                    </div>
                                    <div className="uk-margin-small-top uk-text-meta">based on {data.userReviewStats.totalReviews} reviews</div>
                                </div>
                                <div className="uk-width-1-1 uk-width-expand@s">
                                    <div className="uk-grid-small uk-grid-divider uk-child-width-1-1" data-uk-grid>
                                        {data.userReviews.map((review) =>
                                            <article key={review.id}>
                                                <section className="uk-grid-small uk-child-width-1-1" data-uk-grid>
                                                    <header>
                                                        <div className="uk-h4 uk-margin-remove">{review.author.firstName} {review.author.lastName}</div>
                                                        <time className="uk-text-meta">{formatDate(review.insertedAt, 'long')}</time>
                                                    </header>
                                                    <div>
                                                        <ul className="uk-iconnav uk-margin-bottom tm-rating">
                                                            <Rating name="read-only" value={review.rating} readOnly />
                                                        </ul>
                                                        <div><p>{review.body}</p></div>
                                                    </div>
                                                </section>
                                            </article>
                                        )}
                                    </div>
                                    <div className="uk-text-center">
                                        {data.userReviews && data.userReviews.length < data.userReviewStats.totalReviews ? (
                                            <button className="sc-button sc-button-primary" onClick={this.loadMoreReviews(data, fetchMore)}>
                                                More Reviews
                                            </button>
                                        ) : null}
                                    </div>                                
                                </div>
                            </div>
                        </section>
                    )
                }}
            </ReviewsQuery>
        );
    }
}
export default compose(withCurrentUser)(ListReviews);
