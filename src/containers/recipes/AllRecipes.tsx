import * as React from 'react';

import HeadListRecipes from 'containers/recipes/_HeadListRecipes';
import ListRecipes from 'containers/recipes/_ListRecipes';

interface IProps {
  match: any;
}

export default class AllRecipes extends React.Component<IProps, {}> {
  public render() {
    const {
      params: { keywords }
    } = this.props.match;

    return (
      <section className="uk-section uk-section-small">
        <div className="uk-container uk-container-large">
          <HeadListRecipes keywords={keywords} />
        </div>
        <br />
        <ListRecipes keywords={keywords} />
      </section>
    );
  }
}
