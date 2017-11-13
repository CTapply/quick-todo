import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import List, { ListItem } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import { TransitionGroup } from 'react-transition-group';
import CreateTodo from './createTodo/CreateTodo';
import Todo from './todo/Todo';
import Slide from './animations/Slide';
import './TodosContainer.css';

const styles = {
  todoContainer: {
    width: '550px',
    height: 'auto',
  },
  todoItem: {
    width: '100%',
    padding: '1px 0px',
  },
  todoList: {
    width: '100%',
    padding: '0px 0px 0px 0px',
    overflow: 'visible',
    'z-index': '1',
  },
  containerFooter: {
    position: 'relative',
    padding: '5px',
    'line-height': '38px',
    'z-index': 1,
  },
  footerText: {
    'vertical-align': 'middle',
    display: 'inline-block',
    width: 'auto',
    'font-weight': 'lighter',
    'font-size': '0.9em',
    'letter-spacing': '-0.01em',
  },
  footerButton: {
    'min-width': '64px',
    'min-height': '25px',
    'font-size': '0.8em',
    'text-transform': 'none',
    'font-weight': 'lighter',
    padding: '2px',
    'margin-right': '4px',
  },
  footerButtonGroup: {
    display: 'inline-block',
    'margin-left': '80px',
  },
};

const filterEnum = Object.freeze({ ALL: 'all', ACTIVE: 'active', COMPLETED: 'completed' });

class TodosContainer extends Component {
  static propTypes = {
    createTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    todos: PropTypes.shape({ }).isRequired,
    currentUuid: PropTypes.string.isRequired,
    classes: PropTypes.shape({
      todoContainer: PropTypes.string,
      todoItem: PropTypes.string,
      todoList: PropTypes.string,
      containerFooter: PropTypes.string,
      footerText: PropTypes.string,
      footerButton: PropTypes.string,
      footerButtonGroup: PropTypes.string,
    }).isRequired,
  }

  static defaultProps = {
    posts: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      filterSelected: filterEnum.ACTIVE,
      todosHidden: true,
    };
  }

  countIncomplete = () => _.reduce(Object.keys(this.props.todos), (sum, id) => {
    const todo = this.props.todos[id];
    return (todo.isCompleted) ? sum : sum + 1;
  }, 0);

  handleTodoListToggle = () => {
    this.setState({ todosHidden: !this.state.todosHidden });
  }

  handleTodoToggle = (id) => {
    console.log(id);
    const todo = this.props.todos[id];
    todo.id = id;
    todo.isCompleted ? (todo.isCompleted = false) : (todo.isCompleted = true);
    this.props.editTodo(todo);
  }

  sendTodoToDB = (todo) => {
    this.props.createTodo(todo);
  }

  selectFilter = e => this.setState({ filterSelected: e.target.closest('button').name })

  renderTodos = () => {
    switch (this.state.filterSelected) {
      case filterEnum.ALL:
        return this.renderAllTodos();
      case filterEnum.ACTIVE:
        return this.renderActiveTodos();
      case filterEnum.COMPLETED:
        return this.renderCompletedTodos();
      default:
        return this.renderAllTodos();
    }
  }

  renderTodo = (todo, id) => (
    <div className="collapsable-list-item" key={id}>
      <ListItem
        className={this.props.classes.todoItem}
        disableGutters
        button
        /* onClick={} */
      >
        <Todo
          id={id}
          handleToggle={this.handleTodoToggle}
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
    </div>);

  renderAllTodos = () => {
    const todos = Object.keys(this.props.todos);
    todos.sort((a, b) => ((a.todoDate < b.todoDate) ? -1 : 1));

    return todos.map((id) => {
      const todo = this.props.todos[id];
      return this.renderTodo(todo, id);
    });
  }

  renderActiveTodos = () => {
    let todos = Object.keys(this.props.todos);
    todos = _.filter(todos, id => !this.props.todos[id].isCompleted);
    todos.sort((a, b) => ((a.todoDate < b.todoDate) ? -1 : 1));

    return todos.map((id) => {
      const todo = this.props.todos[id];
      return this.renderTodo(todo, id);
    });
  }

  renderCompletedTodos = () => {
    let todos = Object.keys(this.props.todos);
    todos = _.filter(todos, id => this.props.todos[id].isCompleted);
    todos.sort((a, b) => ((a.todoDate < b.todoDate) ? -1 : 1));

    return todos.map((id) => {
      const todo = this.props.todos[id];
      return this.renderTodo(todo, id);
    });
  }

  renderFooterButton = (text, enumeration) => {
    if (this.state.filterSelected === enumeration) {
      return (
        <Button
          name={enumeration}
          raised
          dense
          className={this.props.classes.footerButton}
        >
          {text}
        </Button>
      );
    }

    return (
      <Button
        name={enumeration}
        dense
        className={this.props.classes.footerButton}
        onClick={this.selectFilter}
      >
        {text}
      </Button>
    );
  }


  render = () => (
    <div className={this.props.classes.todoContainer} >
      <CreateTodo
        onSave={this.sendTodoToDB}
        todosHidden
        handleTodoListToggle={this.handleTodoListToggle}
      />
      <div className="collapsable-list">
        <List className={this.props.classes.todoList} >
          <TransitionGroup>
            {(!this.state.todosHidden) ? (
              <Slide>
                {this.renderTodos().concat([
                  <Paper className={`collapsable-list-item ${this.props.classes.containerFooter}`} elevation={4} key="footer">
                    <Typography className={this.props.classes.footerText} type="subheading" component="p">
                      {`${this.countIncomplete()} items left`}
                    </Typography>
                    <span className={this.props.classes.footerButtonGroup} >
                      {this.renderFooterButton('All', filterEnum.ALL)}
                      {this.renderFooterButton('Active', filterEnum.ACTIVE)}
                      {this.renderFooterButton('Completed', filterEnum.COMPLETED)}
                    </span>
                  </Paper>,
                ])}
              </Slide>
            ) : null }
          </TransitionGroup>
        </List>
      </div>
    </div>
  )
}

export default withStyles(styles)(TodosContainer);
