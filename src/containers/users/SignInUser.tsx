import * as React from 'react';
import { Mutation, MutationResult, compose } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { required } from 'components/form/validation';

import RenderField from 'components/form/RenderField';
import SubmitField from 'components/form/SubmitField';
import withFlashMessage from 'components/flash/withFlashMessage';
import withCurrentUser from 'queries/currentUserQuery';

import SIGN_IN from 'graphql/auth/signInMutation.graphql';
import './login_page.scss';


// typings
import { FlashMessageVariables, SignInData, SignInVariables, User } from 'types';

class SignInMutation extends Mutation<SignInData, SignInVariables> { }

interface IProps {
  redirect: (path: string, message?: FlashMessageVariables) => void;
  currentUser: User;
  currentUserLoading: boolean;
}

class SignInUser extends React.Component<IProps, {}> {
  private signInForm: any;

  constructor(props: IProps) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  public componentWillMount() {
    this.redirectIfUserIsAuthenticated();
  }

  public componentWillReceiveProps(nextProps: IProps) {
    this.redirectIfUserIsAuthenticated(nextProps);
  }

  private redirectIfUserIsAuthenticated(props?: IProps) {
    const { currentUser, currentUserLoading } = props || this.props;
    if (!currentUserLoading && currentUser) {
      this.props.redirect('/', { error: 'You are already logged' });
    }
  }

  private submitForm(signIn: Function, client: ApolloClient<any>) {
    return async (values: SignInVariables) => {
      const response: MutationResult<SignInData> = await signIn({ variables: values });
      const { signIn: payload } = response.data!;
      if (!payload.errors && payload.user && payload.user.email) {
        const emailURIEncoded = encodeURIComponent(payload.user.email);
        await client.resetStore();
        this.props.redirect(`/users/welcome/${emailURIEncoded}`);
      } else {
        window.localStorage.removeItem('letzell:token');
        if (payload.errors.noYetConfirmed) {
          const emailURIEncoded = encodeURIComponent(values.email);
          this.props.redirect(`/users/confirmation-needed/${emailURIEncoded}`);
        } else {
          this.signInForm.form.change('password', '');
          this.props.redirect('/users/signup', { notice: 'You are not in our system. No worries, it is easy to join.' });
        }
      }
    };
  }


  public render() {
    return (
      <SignInMutation mutation={SIGN_IN}>
        {(signIn, { loading, client }) => (
          <>
            <div className="uk-flex uk-flex-center uk-flex-middle sc-login-page-wrapper">
              <div className="uk-width-2-3@s uk-width-1-2@m uk-width-1-3@l uk-width-1-4@xl">
                <div className="uk-card">
                  <div className="uk-card-body">
                    <div className="sc-login-page-logo uk-margin-remove">
                      <h2 className="uk-text-lead uk-margin-remove">Welcome back!</h2>
                      <h3 className="uk-text-meta uk-margin-remove">Enter your email and we will send you to code to signin.</h3>
                    </div>
                    <div id="sc-login-form">
                      <div className="sc-login-page-inner">
                      <Form
                          onSubmit={this.submitForm(signIn, client)}
                          ref={(input: any) => {
                            this.signInForm = input;
                          }}
                          render={({ handleSubmit }: any) => (
                            <form onSubmit={handleSubmit}>
                              <Field name="email" label="Email Address" component={RenderField} displayLabel validate={required} type="text" />
                              <SubmitField value="To Log in" block={true} cancel={false} loading={loading} />
                            </form>
                          )}
                        />                      
                        <div className="uk-margin-small-top">
                          <div className="uk-margin-small-top uk-text-center">                            
                            <span className="sc-color-primary">Don't have an account?</span>
                            <div>
                              <Link className="sc-text-semibold" to="/users/signup">Sign Up</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </SignInMutation>
    );
  }
}

export default compose(
  withCurrentUser,
  withFlashMessage
)(SignInUser);
