import * as React from 'react';
import { Query, Mutation, MutationResult, compose } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { Form, Field } from 'react-final-form';

import withFlashMessage from 'components/flash/withFlashMessage';
import RenderField from 'components/form/RenderField';
import SubmitField from 'components/form/SubmitField';
import { required } from 'components/form/validation';

import USER_FOR_EDITING from 'graphql/users/userForEditingQuery.graphql';
import UPDATE_USER from 'graphql/users/updateUserMutation.graphql';
import CANCEL_ACCOUNT from 'graphql/users/cancelAccountMutation.graphql';

// typings
import {
  FlashMessageVariables,
  CancelAccountData,
  UpdateUserVariables,
  UpdateUserData,
  GetUserForEditingData
} from 'types';
// import ChangeUserPassword from './ChangeUserPassword';
class GetUserForEditingQuery extends Query<GetUserForEditingData> { }
class UpdateUserMutation extends Mutation<UpdateUserData, UpdateUserVariables> { }
class CancelAccountMutation extends Mutation<CancelAccountData> { }

interface IProps {
  redirect: (path: string, message?: FlashMessageVariables) => void;
}

class EditUserProfile extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.onCancelAccount = this.onCancelAccount.bind(this);
  }

  private submitForm(updateUser: Function) {
    return async (values: UpdateUserVariables) => {
      const response: MutationResult<UpdateUserData> = await updateUser({ variables: values });
      const {
        updateUser: { errors }
      } = response.data!;
      if (!errors) {
        this.props.redirect('#0', { notice: 'Your profile has been updated ' });
      } else {
        return errors;
      }
    };
  }

  private onCancelAccount(cancelAccount: Function, _client: ApolloClient<any>) {
    return async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (window.confirm('Are you sure  ?')) {
        const response: MutationResult<CancelAccountData> = await cancelAccount();
        const {
          cancelAccount: { errors }
        } = response.data!;

        if (!errors) {
          window.localStorage.removeItem('letzell:token');
          (window as any).location = '/';
          // await client.resetStore();
          // this.props.redirect('/', { notice: 'Votre compte a bien été supprimé. Nous espérons vous revoir bientôt !' });
        }
      }
    };
  }

  public render() {
    return (
      <GetUserForEditingQuery query={USER_FOR_EDITING} fetchPolicy="network-only">
        {({ data }) => {
          if (!data) return null;
          const currentUser = data.currentUser;

          return (
            <>
              <div className="uk-width-1-1 uk-width-expand@m">
                <div className="uk-card uk-card-default uk-card-small tm-ignore-container">
                  <header className="uk-card-header">
                    <h1 className="uk-h2">Settings</h1>
                  </header>
                  <div className="uk-card-body">
                      <div className="uk-grid-medium uk-child-width-1-1" data-uk-grid>
                        <fieldset className="uk-fieldset">
                          <UpdateUserMutation mutation={UPDATE_USER}>
                            {(updateUser, { loading }) => (
                              <Form
                                onSubmit={this.submitForm(updateUser)}
                                initialValues={currentUser}
                                render={({ handleSubmit, pristine }: any) => (
                                  <form onSubmit={handleSubmit}>
                                    <Field name="firstName" displayLabel label="First Name" component={RenderField} validate={required} />
                                    <Field name="lastName" displayLabel label="Last Name" component={RenderField} validate={required} />
                                    <Field name="primaryPhone" displayLabel label="Primary Phone" component={RenderField} validate={required} />
                                    <Field name="postalCode" displayLabel label="Postal Code" component={RenderField} validate={required} />
                                    <SubmitField loading={loading} disabled={pristine} value="Update" />
                                  </form>
                                )}
                              />
                            )}
                          </UpdateUserMutation>
                        </fieldset>
                        {/* <fieldset className="uk-fieldset">
                          <legend className="uk-h4">Password</legend>
                          <ChangeUserPassword />
                        </fieldset> */}
                        <fieldset className="uk-fieldset">
                          <legend className="uk-h4">Delete your Account?</legend>
                          <CancelAccountMutation mutation={CANCEL_ACCOUNT}>
                            {(cancelAccount, { client }) => (
                              <div className="cancel-account">
                                <a onClick={this.onCancelAccount(cancelAccount, client)}>
                                  <span className="icon">
                                    <i className="fa fa-trash-o" />
                                  </span>
                                  Delete your account
                                </a>
                              </div>
                            )}
                          </CancelAccountMutation>
                        </fieldset>
                      </div>
                  </div>
                </div>
              </div>
            </>
          );
        }}
      </GetUserForEditingQuery>
    );
  }
}

export default compose(withFlashMessage)(EditUserProfile);
