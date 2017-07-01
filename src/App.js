import React, {Component} from 'react'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
    state = {
        screen: 'list',
        contacts: []
    }
    componentDidMount() {
        ContactsAPI.getAll().then((contacts => this.setState({contacts: contacts})))
    }
    removeContact = (person) => {
        this.setState((state) => ({
            contacts: state.contacts.filter((contact) => person.id !== contact.id)
        }));
        ContactsAPI.remove(person);
    }
    createContact = () => {
        this.setState({screen: 'create'})
    }
    render() {
        return (
            <div className="app">
                {this.state.screen === 'list' && (
                    <ListContacts onCreateContact={this.createContact} onDeleteContact={this.removeContact} contacts={this.state.contacts}/>
                )}
                {this.state.screen === 'create' && (
                    <CreateContact/>
                )}
            </div>
        )
    }
}

export default App;
