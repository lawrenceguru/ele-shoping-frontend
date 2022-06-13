import * as React from 'react';
import { withRouter } from 'react-router';
import { compose } from 'react-apollo';

// typings
import { History } from 'history';

interface IProps {
  initialKeywords: string;
  history: History;
}

interface IState {
  keywords: string;
}

class SearchForm extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  public componentWillMount() {
    this.setState({ keywords: this.props.initialKeywords });
  }

  private onInputChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ keywords: (event.target as HTMLInputElement).value });
  }

  private onSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { keywords } = this.state;
    const pathName = keywords ? `/recipes/search/${keywords}` : '/';
    this.props.history.push(pathName);
  }

  public render() {
    return (

      <form onSubmit={this.onSearch} role="search">
      <div className="uk-flex-center uk-grid-small" data-uk-grid>
        <div className="uk-width-1-2@l uk-width-1-2@s">
          <input className="uk-input"
            name="keywords"
            type="text"
            placeholder="Search by text, category or location.. "
            value={this.state.keywords || ""}
            onChange={this.onInputChange}
            data-parsley-required />
        </div>
        <div className="uk-width-1-6@l uk-width-1-2@s">
          <button name="commit" type="submit" className="uk-margin-small" data-uk-search-icon></button>
        </div>
      </div>
    </form>

    );
  }
}

export default compose(withRouter)(SearchForm);
