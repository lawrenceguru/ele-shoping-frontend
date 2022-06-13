import * as React from 'react';
import { Query, compose } from 'react-apollo';
import withCurrentUser from 'queries/currentUserQuery';
import { History } from 'history';
import produce from "immer";

import MESSAGES from 'graphql/messages/messagesQuery.graphql';
import NEW_MESSAGE_SUBSCRIPTION from 'graphql/messages/newMessageSubscription.graphql';


// typings
import { MessageFragment, MessagesData, MessagesVariables, User } from 'types';
import CreateMessage from './CreateMessage';
import MessagePreview from './MessagePreview';
class MessagesQuery extends Query<MessagesData, MessagesVariables> { }

interface IProps {
    // subscribeToMore: Function;
    match: any;
    currentUser: User;
    history: History;
}

class ListMessages extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
        this.subscribeToNewMessage = this.subscribeToNewMessage.bind(this);
    }
    state = {
        hasMoreItems: true
    };

    private subscribeToNewMessage(subscribeToMore: any, receiverId: string, listingId: string) {
        subscribeToMore({
            document: NEW_MESSAGE_SUBSCRIPTION,
            variables: {
                receiverId: receiverId,
                listingId: listingId
            },
            updateQuery(state: any, { subscriptionData }: any) {

                if (!subscriptionData.data || !subscriptionData.data.newMessage) return false;
                const newMessage: MessageFragment = subscriptionData.data.newMessage as MessageFragment;

                // To prevent duplicates, we add an extra check to verify that we did not already add the comment to our store
                if (state.userMessages.find((message: MessageFragment) => message.id === newMessage.id)) {
                    return state;
                }

                return produce(state, (next: any) => {
                    next.userMessages.unshift(newMessage);
                });

            }
        });

    }

    public render() {
        return (
            <section className="uk-section uk-section-small">
                <div className="uk-container">
                    <div className="uk-grid-medium" data-uk-grid>

                        <MessagesQuery query={MESSAGES}
                            variables={{
                                limit: 20, offset: 0,
                                senderId: this.props.match.params.senderId,
                                receiverId: this.props.match.params.receiverId,
                                listingId: this.props.match.params.listingId
                            }}>

                            {({ data, subscribeToMore, loading }) => {

                                if (!data || !data.userMessages) return null;
                                if (loading) return <div data-uk-spinner />;

                                this.subscribeToNewMessage(subscribeToMore, this.props.match.params.receiverId, this.props.match.params.listingId);

                                return (
                                    <>
                                        <div className="uk-width-1-1@l">
                                            <div className="sc-chat-card uk-card uk-height-1-1">
                                                <div className="uk-grid-divider uk-grid-collapse uk-height-1-1 uk-grid uk-grid-stack" data-uk-grid=""
                                                    data-uk-height-match="target: > div > div > .uk-card-header">
                                                    <div className="uk-flex-1 uk-height-1-1 uk-first-column">
                                                        <div className="uk-flex uk-flex-column uk-height-1-1">
                                                            <div className="uk-card-header sc-chat-header sc-padding sc-padding-medium-ends">
                                                                <div className="uk-flex uk-flex-middle">
                                                                    <div className="uk-flex-1">
                                                                        <h3 className="uk-card-title">Messages</h3>
                                                                    </div>
                                                                    <div className="sc-actions uk-margin-remove">
                                                                        <div className="sc-dropdown">
                                                                            <a href="#" className="sc-actions-icon" aria-expanded="true"></a>
                                                                            <div className="uk-width-small uk-dropdown" data-uk-dropdown="mode:click">
                                                                                <ul className="uk-nav uk-dropdown-nav">
                                                                                    <li><a href="#">Help</a></li>
                                                                                    <li><a href="#">Report</a></li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="uk-card-body sc-padding-remove md-bg-grey-200 uk-overflow-auto uk-height-large">
                                                                <div id="sc-chat" className="sc-chat-body sc-light">
                                                                    {data.userMessages!.map(message => (
                                                                        <MessagePreview key={message.id} message={message} />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            {(this.props.currentUser && this.props.currentUser.id === this.props.match.params.senderId) ?
                                                                <CreateMessage receiverId={this.props.match.params.receiverId}
                                                                    listingId={this.props.match.params.listingId} />
                                                                :
                                                                <CreateMessage receiverId={this.props.match.params.senderId}
                                                                    listingId={this.props.match.params.listingId} />
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="uk-width-1-4@l uk-height-1-1 sc-js-column uk-visible@m">
                                                        <div className="uk-flex uk-flex-column uk-height-1-1">
                                                            <div className="uk-card-body uk-flex-1 sc-js-el-hide sc-padding sc-padding-medium-ends">
                                                                <ul id="sc-user-list"
                                                                    className="uk-list uk-list-divider sc-list-clickable sc-js-chat-users-list sc-list-align sc-sequence-show-processed uk-scrollspy-inview false"
                                                                    data-sc-sequence-show="{&quot;animation&quot;: &quot;uk-animation-slide-bottom-medium&quot;, &quot;delay&quot;: 1.2}"
                                                                ></ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                        {/* <div className="uk-width-1-1 uk-width-expand@m">
                                            <div className="uk-card uk-card-default uk-card-small tm-ignore-container">
                                                <header className="uk-card-header">
                                                    <ul className="uk-breadcrumb uk-flex-center uk-margin-remove">
                                                        <li><a onClick={() => history.back()}>Inbox</a></li>
                                                        <li><span>Messages</span></li>
                                                    </ul>
                                                </header>
                                                <div className="uk-width-1-1@l">
                                                    <div className="sc-chat-card uk-card uk-height-1-1">
                                                        <div className="uk-grid-divider uk-grid-collapse uk-height-1-1 uk-grid" data-uk-grid=""
                                                            data-uk-height-match="target: > div > div > .uk-card-header">
                                                            <div className="uk-flex-1 uk-height-1-1 uk-first-column">
                                                                <div className="uk-flex uk-flex-column uk-height-1-1">
                                                                    <div className="uk-card-body sc-padding-remove md-bg-grey-200" data-sc-scrollbar="visible-y">
                                                                        <div id="sc-chat" className="sc-chat-body sc-light">
                                                                            {data.userMessages!.map(message => (
                                                                                <MessagePreview key={message.id} message={message} />
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                    {(this.props.currentUser && this.props.currentUser.id === this.props.match.params.senderId) ?
                                                                        <CreateMessage receiverId={this.props.match.params.receiverId}
                                                                            listingId={this.props.match.params.listingId} />
                                                                        :
                                                                        <CreateMessage receiverId={this.props.match.params.senderId}
                                                                            listingId={this.props.match.params.listingId} />
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                    </>
                                );
                            }}
                        </MessagesQuery>
                    </div>
                </div>
            </section>
        );
    }
}

export default compose(withCurrentUser)(ListMessages);
