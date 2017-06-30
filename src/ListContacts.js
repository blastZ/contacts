import React from 'react';
import PropTypes from 'prop-types';

class ListContacts extends React.Component {
    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    render() {
        const contacts = this.props.contacts;
        return (
            <div className='list-contacts'>
                <div className='list-contacts-top'>
                    <input
                        className='search-contacts'
                        type='text'
                        placeholder='Search contacts'
                        value={this.state.query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                </div>
                <ol className='contact-list'>
                    {contacts.map(person => (
                        <li key={person.id} className='contact-list-item'>
                            <div className='contact-avatar' style={{
                                backgroundImage: `url(${person.avatarURL})`
                            }}></div>
                            <div className='contact-details'>
                                <p>{person.name}</p>
                                <p>{person.email}</p>
                            </div>
                            <button onClick={() => this.props.onDeleteContact(person)} className='contact-remove'>Remove</button>
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
