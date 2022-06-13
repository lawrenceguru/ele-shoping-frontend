import * as React from 'react';
import { Mutation, MutationResult, compose } from 'react-apollo';
import { Form, Field } from 'react-final-form';

import withFlashMessage from 'components/flash/withFlashMessage';
import RenderField from 'components/form/RenderField';
import SubmitField from 'components/form/SubmitField';

import CHANGE_USER_PASSWORD from 'graphql/users/changeUserPasswordMutation.graphql';

// typings
import { FlashMessageVariables, ChangePasswordData, ChangePasswordVariables } from 'types';
class ChangePasswordMutation extends Mutation<ChangePasswordData, ChangePasswordVariables> { }

interface IProps {
  redirect: (path: string, message?: FlashMessageVariables) => void;
}

class ChangeUserPassword extends React.Component<IProps, {}> {
  private changePasswordForm: any;

  constructor(props: IProps) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  private submitForm(changePassword: Function) {
    return async (values: ChangePasswordVariables) => {
      const response: MutationResult<ChangePasswordData> = await changePassword({ variables: values });
      const {
        changePassword: { errors }
      } = response.data!;
      if (!errors) {
        this.props.redirect('/', { notice: 'Votre mot de passe a bien été mis à jour' });
      } else {
        this.changePasswordForm.form.change('currentPassword', '');
        this.changePasswordForm.form.change('password', '');
        this.changePasswordForm.form.change('passwordConfirmation', '');
        return errors;
      }
    };
  }

  public render() {
    return (
      <ChangePasswordMutation mutation={CHANGE_USER_PASSWORD}>
        {(changePassword, { loading }) => (
                <Form
                  onSubmit={this.submitForm(changePassword)}
                  ref={(input: any) => {
                    this.changePasswordForm = input;
                  }}
                  render={({ handleSubmit, pristine }: any) => (
                    <form onSubmit={handleSubmit}>
                      <Field
                        name="currentPassword"
                        label="Current Password"
                        type="password"
                        component={RenderField}
                      />
                      <Field name="password" label="New Password" type="password" component={RenderField} />
                      <Field
                        name="passwordConfirmation"
                        label="Confirm your Password"
                        type="password"
                        component={RenderField}
                      />
                      <SubmitField loading={loading} disabled={pristine} value="Update" />                    
                    </form>
                  )}
                />
        )}
      </ChangePasswordMutation>
    );
  }
}

export default compose(withFlashMessage)(ChangeUserPassword);
