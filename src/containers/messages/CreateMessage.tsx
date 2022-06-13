import * as React from 'react';
import { Mutation, MutationResult, compose } from 'react-apollo';
import { Form, Field } from 'react-final-form';

import RenderField from 'components/form/RenderField';
import SubmitField from 'components/form/SubmitField';
import withCurrentUser from 'queries/currentUserQuery';
import withFlashMessage from 'components/flash/withFlashMessage';

import CREATE_MESSAGE from 'graphql/messages/createMessageMutation.graphql';
import MESSAGES from 'graphql/messages/messagesQuery.graphql';

// typings
import { DataProxy } from 'apollo-cache';
import { MessagesData, CreateMessageVariables, CreateMessageData, User } from 'types';
class CreateMessageMutation extends Mutation<CreateMessageData, CreateMessageVariables> { }

interface IProps {
  receiverId: string;
  listingId: string;
  deleteFlashMessage: () => void;
  currentUser: User;
  notice: (text: string) => void;
}

interface IStates {
  body: string;
}

class CreateMessage extends React.Component<IProps, IStates> {
  private createMessageForm: any;

  constructor(props: IProps) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.updateCache = this.updateCache.bind(this);
  }

  private submitForm(createMessage: Function) {
    return async (values: CreateMessageVariables) => {
      const { listingId, currentUser, receiverId } = this.props;
      const response: MutationResult<CreateMessageData> = await createMessage({
        variables: { ...values, currentUser, receiverId, listingId }
      });

      const {
        createMessage: { errors }
      } = response.data!;

      if (!errors) {
        this.props.deleteFlashMessage();
        this.createMessageForm.form.change('body', '');
        // this.props.notice('Your message has been to the seller. You should hear back from them soon. .');
      } else {
        return errors;
      }
    };
  }

  // const newListing = createListing.newListing;
  // if (!newListing) return;
  // const data = cache.readQuery({ query: LISTINGS, variables: { limit: 24, offset: 0, keywords: this.props.keywords } }) as ListingsData;
  // if (!data.listings) return;
  // data.listings.unshift(newListing);
  // cache.writeQuery({ query: LISTINGS, variables: { limit: 24, offset: 0, keywords: this.props.keywords }, data });

  private updateCache(cache: DataProxy, { data: { createMessage } }: any) {

    const { currentUser, receiverId, listingId } = this.props;
    const senderId = currentUser.id;
    if (!createMessage) return;
    const newMessage = createMessage.newMessage;
    if (!newMessage) return;
    const data = cache.readQuery({
      query: MESSAGES,
      variables: {
        limit: 20, offset: 0,
        senderId: senderId,
        receiverId: receiverId,
        listingId: listingId
      }
    }) as MessagesData;
    if (!data.userMessages) return;
    // data.userMessages.unshift(newMessage);
    data.userMessages.sort((a, b) => a.insertedAt < b.insertedAt ? -1 : a.insertedAt > b.insertedAt ? 1 : 0);
    cache.writeQuery({
      query: MESSAGES,
      variables: {
        limit: 20, offset: 0,
        senderId: senderId,
        receiverId: receiverId,
        listingId: listingId
      }, data
    })
  }

  public render() {
    return (
      <>
        <CreateMessageMutation mutation={CREATE_MESSAGE} update={this.updateCache}>
          {(createMessage, { loading }) => (
            <Form
              onSubmit={this.submitForm(createMessage)}
              ref={(input: any) => {
                this.createMessageForm = input;
              }}
              render={({ handleSubmit, pristine }: any) => (
                <form onSubmit={handleSubmit}>
                  <div className="uk-flex uk-flex-middle">
                    <div className="uk-flex-1">
                      <div className="uk-margin-small-top uk-margin-xsmall-right">
                        <Field name="body" component={RenderField} type="text" />
                      </div>
                    </div>
                    <SubmitField loading={loading} cancel={false} disabled={pristine} value="Message" />
                  </div>
                </form>
              )}
            />
          )}
        </CreateMessageMutation>
      </>

    );
  }
}

export default compose(
  withCurrentUser,
  withFlashMessage
)(CreateMessage);
