import * as React from 'react';
import classnames from 'classnames';
import { Browser } from 'react-kawaii';
import { Form, Field } from 'react-final-form';
import { Mutation, MutationResult, compose } from 'react-apollo';
import { ApolloClient } from 'apollo-client';

import { required } from 'components/form/validation';
import withFlashMessage from 'components/flash/withFlashMessage';

import CONFIRM_ACCOUNT from 'graphql/users/confirmAccountMutation.graphql';
import RESEND_CONFIRMATION from 'graphql/users/resendConfirmationMutation.graphql';
import maskEmail from 'utils/emailUtils';

// typings
import {
  FlashMessageVariables,
  ConfirmAccountData,
  ConfirmAccountVariables,
  ResendConfirmationData,
  ResendConfirmationVariables
} from 'types';
class ResendConfirmationMutation extends Mutation<ResendConfirmationData, ResendConfirmationVariables> { }
class ConfirmAccountMutation extends Mutation<ConfirmAccountData, ConfirmAccountVariables> { }

interface IProps {
  redirect: (path: string, message?: FlashMessageVariables) => void;
  error: (text: string) => void;
  notice: (text: string) => void;
  match: any;
}

interface IState {
  email: string;
  isWelcome: boolean;
}

class ConfirmationNeeded extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);

    this.state = { email: '', isWelcome: false };
    this.submitForm = this.submitForm.bind(this);
    this.onResendConfirmation = this.onResendConfirmation.bind(this);
  }

  public componentWillMount() {
    const {
      params: { email: emailEncoded },
      url
    } = this.props.match;
    const isWelcome: boolean = /welcome\/(.)+/.test(url);
    this.setState({ email: decodeURIComponent(emailEncoded), isWelcome });
  }

  private submitForm(confirmAccount: Function, client: ApolloClient<any>) {
    return async (values: ConfirmAccountVariables) => {
      const { email } = this.state;
      const code: string = values.code;

      const response: MutationResult<ConfirmAccountData> = await confirmAccount({ variables: { email, code } });
      const { confirmAccount: payload } = response.data!;
      if (!payload.errors && payload.result && payload.result.token) {
        window.localStorage.setItem('letzell:token', payload.result.token);
        await client.resetStore();
        this.props.redirect('/', { notice: 'Your account has been validated.' });
      } else {
        if (payload.errors.alreadyConfirmed) {
          this.props.redirect('/users/signin', {
            error: 'This account has already been validated. You can log in.'
          });
        } else {
          this.props.error(Object.values(payload.errors)[0] as string);
          return payload.errors;
        }
      }
    };
  }

  private onResendConfirmation(resendConfirmation: Function) {
    return async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      const { email } = this.state;
      const response: MutationResult<ResendConfirmationData> = await resendConfirmation({ variables: { email } });
      const {
        resendConfirmation: { errors }
      } = response.data!;
      if (!errors) {
        this.props.notice("The confirmation email has been resent");
      } else {
        if (errors.alreadyConfirmed) {
          this.props.redirect('/users/signin', {
            error: 'This account has already been validated. You can log in.'
          });
        } else {
          this.props.error(Object.values(errors)[0] as string);
        }
      }
    };
  }

  public render() {
    const { email, isWelcome } = this.state;

    return (
      <>
        {

        }

        <div className="uk-flex uk-flex-center uk-flex-middle sc-login-page-wrapper">
          <div className="uk-width-2-3@s uk-width-1-2@m uk-width-1-2@l uk-width-1-2@xl">
            <div className="uk-card">
              <div className="uk-card-body">
                <div className="sc-login-page-logo uk-margin-remove">
                  <h2 className="uk-text-lead uk-margin-remove">{isWelcome ? 'Welcome to listMaxx !' : 'Validate your account'}</h2>
                  <div className="is-centered" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                    <Browser size={120} mood="happy" color="#83D1FB" />
                  </div>
                  <p className="uk-text-lead">
                    A 7-digit code has been sent to your email address: <br />
                    <strong>{maskEmail(email)}</strong>. <br />
                    Enter the code below to validate your account.
                  </p>
                  <ConfirmAccountMutation mutation={CONFIRM_ACCOUNT}>
                    {(confirmAccount, { loading, client }) => (
                      <Form
                        onSubmit={this.submitForm(confirmAccount, client)}
                        render={({ handleSubmit }: any) => (
                          <div className="login-form">
                            <div className="form-panel">
                              <form onSubmit={handleSubmit} className="confirmation-form">
                                <div className="field has-addons">
                                  <Field name="code" validate={required}>
                                    {({ input, meta }: any) => (
                                      <div className="control">
                                        <input
                                          className={classnames('uk-input uk-form-width-small', { 'uk-text-danger': meta.touched && meta.invalid })}
                                          type="text"
                                          {...input}
                                          placeholder="1234567"
                                          maxLength={7}
                                        />
                                        {meta.touched && meta.error && <p className="help uk-text-danger">{meta.error}</p>}
                                      </div>
                                    )}
                                  </Field>
                                  <div className="control">
                                    <button
                                      className={classnames('sc-button sc-button-medium sc-button-primary', { 'uk-spinner': loading })}
                                      name="commit"
                                    >
                                      Validate
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        )}
                      />
                    )}
                  </ConfirmAccountMutation>
                  <ResendConfirmationMutation mutation={RESEND_CONFIRMATION}>
                    {(resendConfirmation, { loading }) => (
                      <p className="resend-confirmation is-size-6 has-text-centered has-text-grey">
                        Email may take a minute or two to arrive. <br /> Haven't received it? <br /> Need a
                        new code? <br />
                        <button
                          className={classnames('sc-button sc-button-small', {
                            'is-spinner': loading
                          })}
                          onClick={this.onResendConfirmation(resendConfirmation)}
                        >
                          Resend email
                        </button>
                      </p>
                    )}
                  </ResendConfirmationMutation>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default compose(withFlashMessage)(ConfirmationNeeded);
