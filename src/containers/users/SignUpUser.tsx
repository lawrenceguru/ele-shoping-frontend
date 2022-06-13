import * as React from 'react';
import { Mutation, MutationResult, compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';

import RenderField from 'components/form/RenderField';
import SubmitField from 'components/form/SubmitField';
import { required } from 'components/form/validation';
import withFlashMessage from 'components/flash/withFlashMessage';

import SIGN_UP from 'graphql/users/signUpMutation.graphql';
import './login_page.scss';

// typings
import { FlashMessageVariables, SignUpData, SignUpVariables } from 'types';
class SignUpMutation extends Mutation<SignUpData, SignUpVariables> { }

interface IProps {
  redirect: (path: string, message?: FlashMessageVariables) => void;
}

class SignUpUser extends React.Component<IProps, {}> {
  private signUpForm: any;

  constructor(props: IProps) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  private submitForm(signUp: Function) {
    return async (values: SignUpVariables) => {
      const response: MutationResult<SignUpData> = await signUp({ variables: values });
      const { signUp: payload } = response.data!;
      if (!payload.errors && payload.user && payload.user.email) {
        const emailURIEncoded = encodeURIComponent(payload.user.email);
        this.props.redirect(`/users/welcome/${emailURIEncoded}`);
      } else {
        this.signUpForm.form.change('password', '');
        this.signUpForm.form.change('passwordConfirmation', '');
        return payload.errors;
      }
    };
  }

  public render() {
    return (
      <SignUpMutation mutation={SIGN_UP}>
        {(signUp, { loading }) => (
          <>
            <div className="uk-flex uk-flex-center uk-flex-middle sc-login-page-wrapper">
              <div className="uk-width-2-3@s uk-width-1-2@m uk-width-1-3@l uk-width-1-4@xl">
                <div className="uk-card">
                  <div className="uk-card-body">
                    <div className="sc-login-page-logo">
                      <h2 className="uk-text-lead uk-margin-remove">Hey there!</h2>
                      <h3 className="uk-text-meta uk-margin-remove">Lets create your account.</h3>
                    </div>
                    <div id="sc-register-form" >
                      <div className="sc-login-page-inner">
                        <Form
                          onSubmit={this.submitForm(signUp)}
                          ref={(input: any) => {
                            this.signUpForm = input;
                          }}
                          render={({ handleSubmit }: any) => (
                            <form onSubmit={handleSubmit}>
                              <Field name="first_name" displayLabel label="First Name" type="text" component={RenderField} validate={required} />
                              <Field name="last_name" displayLabel label="Last Name" type="text" component={RenderField} validate={required} />
                              <Field name="email" label="Email Address" displayLabel type="text" component={RenderField} validate={required} />
                              {/* <Field
                                name="password"
                                label="Password"
                                type="password"
                                component={RenderField}
                              />
                              <Field
                                name="passwordConfirmation"
                                label="Confirm Password"
                                type="password"
                                component={RenderField}
                              /> */}
                              <SubmitField value="Create Account" block={true} cancel={false} loading={loading} />
                            </form>
                          )}
                        />
                        <div className="uk-margin-small-top">
                          <div className="uk-margin-small-top uk-text-center">
                            <span className="sc-color-primary">Already have an account?</span>
                            <div>
                              <Link className="sc-text-semibold" to="/users/signin">Sign In</Link>
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
      </SignUpMutation>
    );
  }
}

export default compose(withFlashMessage)(SignUpUser);
