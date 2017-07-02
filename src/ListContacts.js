import React from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import { Link } from 'react-router-dom';
import sortBy from 'sort-by';


class ListContacts extends React.Component {
    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    clearQuery = () => {
        this.setState({query: ''})
    }

    render() {
        const {query} = this.state;
        const {contacts, onDeleteContact} = this.props;
        let showingContacts;
        if(query) {
            const match = new RegExp(escapeRegExp(this.state.query), 'i');
            showingContacts = contacts.filter((contact) => match.test(contact.name));
        } else {
            showingContacts = contacts;
        }
        showingContacts.sort(sortBy('name'));
        return (
            <div className='list-contacts'>
                <div className='list-contacts-top'>
                    <input
                        className='search-contacts'
                        type='text'
                        placeholder='Search contacts'
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                    <Link
                        to='/create'
                        className='add-contact'
                    >Add Contact</Link>
                </div>
                {showingContacts.length !== contacts.length && (
                    <div className='showing-contacts'>
                        <span>Now showing {showingContacts.length} of {contacts.length} total</span>
                        <button onClick={this.clearQuery}>Show all</button>
                    </div>
                )}
                <ol className='contact-list'>
                    {showingContacts.map(person => (
                        <li key={person.id} className='contact-list-item'>
                            <div className='contact-avatar' style={{
                                backgroundImage: `url(${person.avatarURL})`
                            }}></div>
                            <div className='contact-details'>
                                <p>{person.name}</p>
                                <p>{person.email}</p>
                            </div>
                            <button onClick={() => onDeleteContact(person)} className='contact-remove'>Remove</button>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}

ListContacts.propTypes = {
    onDeleteContact: PropTypes.func.isRequired,
    contacts: PropTypes.array.isRequired
}

export default ListContacts
