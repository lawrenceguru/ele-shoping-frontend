import * as React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

// typings
interface IProps {
  value?: string;
  loading?: boolean;
  block?: boolean;
  cancel?: boolean;
  disabled?: boolean;
}

export default class SubmitField extends React.Component<IProps, {}> {
  public static defaultProps: IProps = {
    value: 'Submit',
    loading: false,
    cancel: true,
    block: false,
    disabled: false
  };

  public render() {
    const { loading, value, cancel, block, disabled } = this.props;
    return (
      <>
        <div>
          {cancel ? (
              <Link className="sc-button sc-button-medium sc-button-default uk-margin-right" to="/">
                Return
              </Link>
          ) : null}
          {block ? (
              <button
                className={classnames('sc-button sc-button-medium sc-button-block sc-button-primary'
                  , { 'is-loading': loading })}
                disabled={disabled}
                type="submit"
              >
                {value}
              </button>
          ) :
              <button
                className={classnames('sc-button sc-button-medium sc-button-primary'
                  , { 'is-loading': loading })}
                disabled={disabled}
                type="submit"
              >
                {value}
              </button>
          }
        </div>
      </>
    );
  }
}
