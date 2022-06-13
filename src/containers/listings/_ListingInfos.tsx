import * as React from 'react';

// typings
import { ListingPreviewFragment } from 'types';

interface IProps {
  listing: ListingPreviewFragment;
}

export default class ListingInfos extends React.Component<IProps, {}> {
  public render() {
    const { listing } = this.props;

    return (
      <div className="right">
      <a className="is-solid accent-button raised">
        <i data-feather="shopping-cart"></i>
        <span>${listing.pricePerUnit}</span>
      </a>
    </div>
    );
  }
}
