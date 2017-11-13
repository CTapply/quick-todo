import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import Rebase from 're-base';
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles';
import { blue, green, red } from 'material-ui/colors';
import TodosContainer from './Components/TodosContainer';
import './App.css';

/**
 * How to Access Electron process
 * const electron = window.require('electron');
 * const fs = electron.remote.require('fs');
 * const ipcRenderer  = electron.ipcRenderer;
 */

const darkTheme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      ...green,
      A400: '#00e677',
    },
    error: red,
  },
});

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
  appBar: {
    '-webkit-app-region': 'drag',
    width: '100%',
    left: '0px',
    marginLeft: '0px',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class App extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      todos: {},
      currentUuid: '',
    };
    this.classes = props.classes;
  }

  componentWillMount() {
    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyCabQyhh8NmftCdX5MMDQEphIqnKxvKWVU',
      authDomain: 'quick-todo-b0448.firebaseapp.com',
      databaseURL: 'https://quick-todo-b0448.firebaseio.com',
      projectId: 'quick-todo-b0448',
      storageBucket: '',
      messagingSenderId: '717207483020',
    };
    const app = firebase.initializeApp(config);
    const base = Rebase.createClass(app.database());

    firebase.auth().signInAnonymously().catch((error) => {
      // Handle Errors here.
      console.log(`An Error has Occured:\n${error}`);
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        const uid = user.uid;
        this.setState({ currentUuid: uid });

        this.ref = base.bindToState(`users/${uid}/todos`, {
          context: this,
          state: 'todos',
        });
      } else {
        this.setState({ currentUuid: '' });
        // User is signed out.
      }
    });
  }

  componentWillUnMount() {
    this.base.removeBinding(this.ref);
  }

  createTodo = (todo) => {
    const todoWithUUID = todo;
    todoWithUUID.uuid = this.state.currentUuid;
    const newTodoRef = firebase.database().ref(`users/${this.state.currentUuid}/todos`).push();
    newTodoRef.set(todoWithUUID);
  }

  deleteTodo = (id) => {
    firebase.database().ref(`users/${this.state.currentUuid}/todos/${id}`).remove();
  }

  editTodo = (todo) => {
    console.log(todo)
    const id = todo.id;
    const todoWithoutID = todo;
    delete todoWithoutID.id;
    firebase.database().ref(`users/${this.state.currentUuid}/todos/${id}`).set(todoWithoutID);
  }

  render() {
    return (
      <MuiThemeProvider theme={darkTheme} >
        <div className="App">
          <TodosContainer
            createTodo={this.createTodo}
            deleteTodo={this.deleteTodo}
            editTodo={this.editTodo}
            todos={this.state.todos}
            currentUuid={this.state.currentUuid}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
