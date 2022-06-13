import * as React from 'react';
import { Query, compose } from 'react-apollo';
import classnames from 'classnames';

import withFlashMessage from 'components/flash/withFlashMessage';
import FLASH_MESSAGE from 'graphql/flash/flashMessageQuery.graphql';

// typings
import { FlashMessageData } from 'types';
class FlashMessageQuery extends Query<FlashMessageData> { }

interface IProps {
  deleteFlashMessage: () => void;
}

class FlashMessage extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  private onClick() {
    this.props.deleteFlashMessage();
  }

  public render() {
    return (
      <FlashMessageQuery query={FLASH_MESSAGE}>
        {({ data }) => {
          if (!data || !data.message) return null;
          const { type, text } = data.message;
          return (
            <div className="uk-grid-small uk-text-center">             
              <div
                className={classnames('uk-alert', {
                  'uk-text-primary': type === 'notice',
                  'uk-text-danger': type === 'error'
                })}>
                {text}
                <button onClick={this.onClick} className="uk-alert-close" data-uk-icon="close" />
              </div>
            </div>
          );
        }}
      </FlashMessageQuery>
    );
  }
}

export default compose(withFlashMessage)(FlashMessage);
