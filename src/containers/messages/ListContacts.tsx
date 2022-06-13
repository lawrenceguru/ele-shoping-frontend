import * as React from 'react';
import { Query, compose } from 'react-apollo';
import withCurrentUser from 'queries/currentUserQuery';

import CONTACTS from 'graphql/messages/contactsQuery.graphql';

// typings
import { ContactsData, ContactVariables } from 'types';
import ContactPreview from './ContactPreview';
class ContactsQuery extends Query<ContactsData, ContactVariables> { }

interface IProps {
    match: any;
}

class ListContacts extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }
    state = {
        hasMoreItems: true
    };

    public render() {

        return (
            <>

                <section className="uk-section uk-section-small">
                    <div className="uk-container">
                        <div className="uk-grid-medium" data-uk-grid>
                            <ContactsQuery query={CONTACTS} variables={{ limit: 20, offset: 0, senderId: this.props.match.params.id }}>
                                {({ data, loading, fetchMore }) => {
                                    if (!data || !data.userContacts) return null;
                                    if (loading) return <div data-uk-spinner />;
                                    if (data.userContacts.length === 0) return (
                                        <>
                                            <div className="uk-flex uk-flex-center">
                                                <h4 className="uk-margin-medium-top uk-text-danger uk-h3"> Whoops! You don't have any messages.</h4>
                                            </div>
                                        </>
                                    );

                                    return (
                                        <>
                                            <div className="uk-width-1-1 uk-width-expand@m">
                                                <div className="uk-card uk-card-default uk-card-small tm-ignore-container">
                                                    <header className="uk-card-header">
                                                        <h1 className="uk-h2">Inbox</h1>
                                                    </header>
                                                    <table className="uk-table uk-table-small uk-table-divider">
                                                        <tbody>
                                                            {data.userContacts!.map(contact => (
                                                                <tr>
                                                                    <ContactPreview key={contact.id} contact={contact} />                                                                   
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>


                                                    {/* <div className="uk-grid-collapse tm-products-list uk-grid uk-grid-stack" uk-grid="">
                                                        <ul className="uk-list">
                                                            {data.userContacts!.map(contact => (
                                                                <li key={contact.id}>
                                                                    <ContactPreview key={contact.id} contact={contact} />
                                                                </li>
                                                            ))}
                                                        </ul>

                                                    </div> */}
                                                </div>
                                                {(data.userContacts.length >= 20) ?
                                                    <div className="uk-text-center">
                                                        <button
                                                            className="sc-button sc-button-primary"
                                                            disabled={!this.state.hasMoreItems}
                                                            onClick={() =>
                                                                fetchMore({
                                                                    variables: {
                                                                        offset: data.userContacts.length
                                                                    },
                                                                    updateQuery: (previousResult, { fetchMoreResult }) => {
                                                                        if (!fetchMoreResult) return previousResult;

                                                                        if (fetchMoreResult.userContacts.length < 20) {
                                                                            this.setState({ hasMoreItems: false });
                                                                        }

                                                                        return {
                                                                            userContacts: [
                                                                                ...previousResult.userContacts,
                                                                                ...fetchMoreResult.userContacts
                                                                            ]
                                                                        };
                                                                    }
                                                                })
                                                            }>
                                                            See More
                                                        </button>
                                                    </div>
                                                    : null}

                                            </div>
                                        </>
                                    );
                                }}
                            </ContactsQuery>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}
export default compose(withCurrentUser)(ListContacts);
