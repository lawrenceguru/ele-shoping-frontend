import * as React from 'react';

// import HeadListListings from 'containers/listings/_HeadListListings';
import ListListings from 'containers/listings/_ListListings';
// import ListingExample from './ListingExample';

interface IProps {
  match: any;
}


export default class AllListings extends React.Component<IProps, {}> {

  public componentWillMount() {
    let visited = localStorage["alreadyVisited"];

    if (visited) {
      this.setState({ viewPopup: false })
      //do not view Popup
    } else {
      //this is the first time
      localStorage["alreadyVisited"] = true;
      this.setState({ viewPopup: true });
    }

    return (
      <>
      <div id="modal-example" data-uk-modal>
        <div className="uk-modal-dialog uk-modal-body">
          <h2 className="uk-modal-title">Headline</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p className="uk-text-right">
            <button className="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
            <button className="uk-button uk-button-primary" type="button">Save</button>
          </p>
        </div>
      </div>
      </>
    )
  }

  public render() {
    const {
      params: { keywords }
    } = this.props.match;

    return (
      <>
        <ListListings keywords={keywords} />
      </>
    );
  }
}
