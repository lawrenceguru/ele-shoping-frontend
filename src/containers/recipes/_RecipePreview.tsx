import * as React from 'react';
import { compose } from 'react-apollo';
import { Link } from 'react-router-dom';

import RecipeInfos from 'containers/recipes/_RecipeInfos';
import RecipeActions from 'containers/recipes/_RecipeActions';
import withCurrentUser from 'queries/currentUserQuery';

// typings
import { RecipePreviewFragment, User } from 'types';

interface IProps {
  recipe: RecipePreviewFragment;
  currentUser: User;
}

class RecipePreview extends React.Component<IProps, {}> {
  public render() {
    const { recipe, currentUser } = this.props;

    return (
      <>
              <article className="tm-product-card">
                <div className="tm-product-card-media">
                  <div className="tm-ratio tm-ratio-4-3">
                    <Link className="tm-media-box" to={`/recipes/${recipe.id}`}>
                      <figure className="tm-media-box-wrap"><img src={`${recipe.image_url![0]}`} alt={recipe.title} />
                      </figure>
                    </Link></div>
                </div>
                <div className="tm-product-card-body">
                  <div className="tm-product-card-info">
                    <div className="uk-text-small uk-label uk-margin-xsmall-bottom">{recipe.budget}</div>
                    <h3 className="tm-product-card-title">
                      <Link to={`/recipes/${recipe.id}`} className="uk-link-heading">
                        {recipe.title}
                      </Link></h3>
                  </div>
                  <div className="tm-product-card-shop">
                    <div className="tm-product-card-add">
                      <div className="uk-text-meta tm-product-card-actions uk-text-bold">
                        {currentUser && currentUser.id === recipe.author.id ? <RecipeActions recipe={recipe} /> : null}
                      </div>
                      <RecipeInfos recipe={recipe} />
                    </div>
                  </div>
                </div>
              </article>
      </>
    );
  }
}

export default compose(withCurrentUser)(RecipePreview);
