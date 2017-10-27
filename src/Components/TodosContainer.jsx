import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import CreateTodo from './createTodo/CreateTodo';
import Todo from './todo/Todo';
import './TodosContainer.css';

const styles = {
  todoContainer: {
    width: '400px',
    height: 'auto',
  },
  todoItem: {
    padding: '1px 0px',
  },
  todoList: {
    padding: '5px 0px 0px 0px',
  },
  containerFooter: {
    padding: '5px',
    'line-height': '32px',
  },
  footerText: {
    'vertical-align': 'middle',
    display: 'inline-block',
    width: 'auto',
    'font-weight': 'lighter',
    'font-size': '0.9em',
  },
};

class TodosContainer extends Component {
  static propTypes = {
    createTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    todos: PropTypes.object,
    currentUuid: PropTypes.string.isRequired,
    classes: PropTypes.shape({
      todoContainer: PropTypes.string,
      todoItem: PropTypes.string,
      todoList: PropTypes.string,
      containerFooter: PropTypes.string,
      footerText: PropTypes.string,
    }).isRequired,
  }

  static defaultProps = {
    posts: {},
  }

  constructor() {
    super();
    this.state = {};
  }

  handleToggle = id => () => {
    console.log(id);
    const todo = this.props.todos[id];
    todo.id = id;
    (todo.isCompleted) ? todo.isCompleted = false : todo.isCompleted = true;
    this.props.editTodo(todo);
  }

  sendTodoToDB = (todo) => {
    this.props.createTodo(todo);
  }

  renderTodos = () => {
    const todos = Object.keys(this.props.todos);
    todos.sort((a, b) => ((a.todoDate < b.todoDate) ? -1 : 1));

    return todos.map((id) => {
      const todo = this.props.todos[id];
      return (
        <span key={id}>
          <ListItem
            className={this.props.classes.todoItem}
            disableGutters
            button
            onClick={this.handleToggle(id)}
          >
            <Todo
              id={id}
              editTodo={this.props.editTodo}
              deleteTodo={this.props.deleteTodo}
              todoTitle={todo.title}
              todoBody={todo.body}
              todoDate={todo.date}
              todoUuid={todo.uuid}
              isCompleted={todo.isCompleted}
              currentUuid={this.props.currentUuid}
            />
          </ListItem>
        </span>);
    });
  }

  render = () => (
    <div className={this.props.classes.todoContainer} >
      <CreateTodo onSave={this.sendTodoToDB} />
      <List className={this.props.classes.todoList} >
        {this.renderTodos()}
      </List>
      <Paper className={this.props.classes.containerFooter} elevation={4}>
        <Typography className={this.props.classes.footerText} type="subheading" component="h2">
          {`${2} Items Left`}
        </Typography>
      </Paper>
    </div>
  )
}

export default withStyles(styles)(TodosContainer);
