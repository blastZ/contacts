import React, {Component} from 'react'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import { Route } from 'react-router-dom'
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
    state = {
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
    createContact = (contact) => {
        ContactsAPI.create(contact).then((contact) => {
            this.setState((state) => ({
                contacts: state.contacts.concat([contact])
            }))
        })
    }
    render() {
        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <ListContacts onDeleteContact={this.removeContact} contacts={this.state.contacts}/>
                )} />
                <Route exact path='/create' render={({history}) => (
                    <CreateContact onCreateContact={(contact) => {
                        this.createContact(contact)
                        history.push('/')
                    }}/>
                )} />
            </div>
        )
    }
}

export default App;
