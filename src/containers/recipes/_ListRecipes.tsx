import * as React from 'react';
import { Query } from 'react-apollo';

import RecipePreview from 'containers/recipes/_RecipePreview';
import RECIPES from 'graphql/recipes/recipesQuery.graphql';

import nodata from 'assets/images/no-data.png'


// typings
import { RecipesData, RecipesVariables } from 'types';
class RecipesQuery extends Query<RecipesData, RecipesVariables> {}

interface IProps {
  keywords: string;
}

export default class ListRecipes extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.loadMoreRecipes = this.loadMoreRecipes.bind(this);
  }

  private loadMoreRecipes(data: RecipesData, fetchMore: Function) {
    return async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      fetchMore({
        variables: { offset: data.recipes && data.recipes.length },
        updateQuery(state: any, { fetchMoreResult }: { fetchMoreResult: RecipesData }) {
          const { recipes, recipesCount } = fetchMoreResult;
          if (!recipes) return false;
          return {
            recipes: [...state.recipes, ...recipes],
            recipesCount
          };
        }
      });
    };
  }

  public render() {
    return (
      <RecipesQuery query={RECIPES} variables={{ keywords: this.props.keywords }}>
        {({ data, fetchMore }) => {

          if (!data || !data.recipes) return null;

          console.log(data);

          const { recipes, recipesCount } = data;

          if (recipes.length === 0) return (
            <>
              <div className="uk-flex uk-flex-center">
                <img src={nodata} alt="" width={600} />
                <div className="uk-overlay uk-light uk-margin-large-left uk-position-center">
                  <h3> Sorry !</h3>
                  <h4 className="uk-margin-remove-top"> No recipes found.</h4>
                </div>
              </div>
            </>
          );

          return (


            <>
            <div className="uk-container uk-container-xlarge">
              <div className="uk-card uk-card-default tm-ignore-container">
                <div className="uk-grid-collapse uk-child-width-2 uk-child-width-1-6@l  data-uk-grid" data-uk-grid>
                  {recipes.map(recipe => (
                    <RecipePreview key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              </div>
            </div>
            <br />
            <div className="uk-text-center">
              {recipes && recipes.length < recipesCount ? (
                <button className="sc-button sc-button-primary" onClick={this.loadMoreRecipes(data, fetchMore)}>
                  More Recipes
                </button>
              ) : null}
            </div>
          </>
          );
        }}
      </RecipesQuery>
    );
  }
}
