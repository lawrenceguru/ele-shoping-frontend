import * as React from 'react';
import { Query } from 'react-apollo';
import { Form, Field } from 'react-final-form';

import SubmitField from 'components/form/SubmitField';
import RenderField from 'components/form/RenderField';
import { required } from 'components/form/validation';
import RECIPE_OPTIONS from 'graphql/recipes/recipeOptionsQuery.graphql';

// typings
import { RecipeOptionsData, RecipeForEditingFragment } from 'types';
class RecipeOptionsQuery extends Query<RecipeOptionsData> {}

interface IProps {
  action: (values: any) => Promise<any>;
  initialValues: Partial<RecipeForEditingFragment>;
  loading: boolean;
}

interface IState {
  removeImage: boolean;
}

export default class RecipeForm extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { removeImage: false };
    this.submitForm = this.submitForm.bind(this);
    this.onRemoveImage = this.onRemoveImage.bind(this);
  }

  private async submitForm(values: any) {

    console.log(values);

    const { removeImage } = this.state;
    try {
      await this.props.action({ removeImage, ...values });
    } catch (errors) {
      return errors;
    }
  }

  private onRemoveImage() {
    this.setState({ removeImage: true });
  }

  public render() {
    const { removeImage } = this.state;
    const { initialValues: recipe, loading } = this.props;

    return (
      <RecipeOptionsQuery query={RECIPE_OPTIONS}>
        {({ data }) => {
          if (!data) return null;
          const { totalTimeOptions, levelOptions, budgetOptions } = data;

          return (
            <section key={recipe.id} className="uk-section uk-section-small">
            <div className="uk-container uk-container-small">
              <div className="uk-grid-small uk-child-width-1-1" data-uk-grid>
            <Form
              onSubmit={this.submitForm}
              initialValues={recipe}
              render={({ handleSubmit }: any) => (
                <form onSubmit={handleSubmit} className="recipe-form">
                  <Field name="title" label="Title" component={RenderField} validate={required} />
                  <div className="columns">
                    <div className="column">
                      <Field
                        name="totalTime"
                        label="Total Time"
                        type="select"
                        options={totalTimeOptions}
                        component={RenderField}
                      />
                    </div>
                    <div className="column">
                      <Field name="level" label="Level" type="select" options={levelOptions} component={RenderField} />
                    </div>
                    <div className="column">
                      <Field name="budget" type="select" options={budgetOptions} component={RenderField} />
                    </div>
                  </div>

                  {recipe.image_url && !removeImage ? (
                    <div className="field">
                      <label className="label" htmlFor="recipe_image_url">
                        Photo
                      </label>
                      <img src={`${recipe.image_url[0]}`} alt={recipe.title} className="recipe-image image is-96x96" />
                      <a onClick={this.onRemoveImage} className="button is-text remove-image-link">
                      To delete
                      </a>
                    </div>
                  ) : null}
                  <Field name="image" label="Choose a photo..." type="file" component={RenderField} />
                  <Field
                    name="content"
                    label="Recipe Details"
                    type="textarea"
                    inputHtml={{ rows: 14 }}
                    component={RenderField}
                    validate={required}
                  />

                  <SubmitField loading={loading} />
                </form>
              )}
            />
            </div>
            </div>
            </section>
          );
        }}
      </RecipeOptionsQuery>
    );
  }
}
