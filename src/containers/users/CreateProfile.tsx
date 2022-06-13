import * as React from 'react';

interface IProps {
  match: any;
}

export default class CreateProfile extends React.Component<IProps, {}> {
  public render() {
    const {
      params: {  }
    } = this.props.match;

    return (
      <div className="all-recipes">
        <h1 className="title is-3 has-text-centered">Profile Creation</h1>
        <hr />
      </div>
    );
  }
}
