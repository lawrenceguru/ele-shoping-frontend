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
    const pathName = keywords ? `/listings/search/${keywords}` : '/';
    this.props.history.push(pathName);
  }

  public render() {
    return (
      <>
        <form className="uk-search uk-search-default"  onSubmit={this.onSearch}>
          <button name="commit" type="submit" className="uk-search-icon-flip" data-uk-search-icon></button>
          <input className="uk-search-input" 
                  type="search" 
                  name="keywords"
                  placeholder="Search by text, category or location.. "
                  value={this.state.keywords || ""}
                  onChange={this.onInputChange}
                  data-parsley-required />
        </form>
      </>
    );
  }
}

export default compose(withRouter)(SearchForm);
