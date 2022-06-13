import * as React from 'react';
import { compose } from 'react-apollo';
import { Link } from 'react-router-dom';

import withCurrentUser from 'queries/currentUserQuery';

// typings
import { ContactFragment, User } from 'types';

interface IProps {
    contact: ContactFragment;
    currentUser: User;
}

class ContactPreview extends React.Component<IProps, {}> {
    public render() {
        const { contact, currentUser } = this.props;
        return (
            <>
                {(currentUser.id != contact.receiver.id) ?
                    <Link className="tm-media-box"
                        to={`/messages/${contact.sender.id}/${contact.receiver.id}/${contact.listing.id}`}>
                        <td><img className="uk-margin-small-right" src={`${contact.listing.photoUrls[0]}`} width={20} height={20}
                            data-src={`${contact.listing.photoUrls[0]}`} alt={contact.listing.title} /></td>
                        <td>{contact.listing.title}</td>
                        <td></td>
                        <td>{contact.receiver.firstName}</td>
                    </Link> : null
                }
            </>
        );
    }
}

export default compose(withCurrentUser)(ContactPreview);