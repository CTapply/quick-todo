import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import Typography from 'material-ui/Typography';
import './Todo.css';

const styles = {
  todoList: {
    padding: '0px !important',
    'line-height': '48px',
  },
  checkBoxIncomplete: {
    'vertical-align': 'middle',
    display: 'inline-block',
    width: '48px',
    height: '24px',
  },
  checkBoxComplete: {
    'vertical-align': 'middle',
    display: 'inline-block',
    width: '48px',
    height: '24px',
  },
  todoTextIncomplete: {
    'vertical-align': 'middle',
    display: 'inline-block',
    width: 'auto',
    'font-weight': 'lighter',
  },
  todoTextComplete: {
    'vertical-align': 'middle',
    display: 'inline-block',
    width: 'auto',
    'text-decoration': 'line-through',
    'font-style': 'italic',
    'font-weight': 'lighter',
    opacity: '0.5',
  },
};

class Todo extends Component {
  static propTypes = {
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    todoTitle: PropTypes.string.isRequired,
    todoBody: PropTypes.string.isRequired,
    todoDate: PropTypes.number.isRequired,
    todoUuid: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    currentUuid: PropTypes.string.isRequired,
    classes: PropTypes.shape({
      todoList: PropTypes.string,
      checkBoxIncomplete: PropTypes.string,
      checkBoxComplete: PropTypes.string,
      todoTextIncomplete: PropTypes.string,
      todoTextComplete: PropTypes.string,
    }).isRequired,
  }

  constructor() {
    super();
    this.state = {};
  }

  componentWillUpdate = (props) => {
    console.log(`Updated Props! ${props.isCompleted}`);
  }

  saveTodo = () => {
    this.setState({ isEditing: false });
    this.props.editTodo({
      title: document.getElementById('title-input').value,
      body: document.getElementById('body-input').value,
      date: this.props.todoDate,
      id: this.props.id,
      uuid: this.props.todoUuid,
    });
  }

  deleteTodo = () => {
    this.props.deleteTodo(this.props.id);
  }

  renderCompleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 507.2 507.2" style={{ width: '24px', height: '24px' }}>
      <circle style={{ fill: '#32BA7C' }} cx="253.6" cy="253.6" r="253.6" />
      <path style={{ fill: '#0AA06E' }} d="M188.8,368l130.4,130.4c108-28.8,188-127.2,188-244.8c0-2.4,0-4.8,0-7.2L404.8,152L188.8,368z" />
      <g>
        <path style={{ fill: '#FFFFFF' }} d="M260,310.4c11.2,11.2,11.2,30.4,0,41.6l-23.2,23.2c-11.2,11.2-30.4,11.2-41.6,0L93.6,272.8   c-11.2-11.2-11.2-30.4,0-41.6l23.2-23.2c11.2-11.2,30.4-11.2,41.6,0L260,310.4z" />
        <path style={{ fill: '#FFFFFF' }} d="M348.8,133.6c11.2-11.2,30.4-11.2,41.6,0l23.2,23.2c11.2,11.2,11.2,30.4,0,41.6l-176,175.2   c-11.2,11.2-30.4,11.2-41.6,0l-23.2-23.2c-11.2-11.2-11.2-30.4,0-41.6L348.8,133.6z" />
      </g>
    </svg>
  )

  renderIncompleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 507.2 507.2" style={{ width: '24px', height: '24px' }}>
      <circle style={{ fill: '#F15249' }} cx="253.6" cy="253.6" r="253.6" />
      <path style={{ fill: '#AD0E0E' }} d="M147.2,368L284,504.8c115.2-13.6,206.4-104,220.8-219.2L367.2,148L147.2,368z" />
      <path style={{ fill: '#FFFFFF' }} d="M373.6,309.6c11.2,11.2,11.2,30.4,0,41.6l-22.4,22.4c-11.2,11.2-30.4,11.2-41.6,0l-176-176  c-11.2-11.2-11.2-30.4,0-41.6l23.2-23.2c11.2-11.2,30.4-11.2,41.6,0L373.6,309.6z" />
      <path style={{ fill: '#D6D6D6' }} d="M280.8,216L216,280.8l93.6,92.8c11.2,11.2,30.4,11.2,41.6,0l23.2-23.2c11.2-11.2,11.2-30.4,0-41.6  L280.8,216z" />
      <path style={{ fill: '#FFFFFF' }} d="M309.6,133.6c11.2-11.2,30.4-11.2,41.6,0l23.2,23.2c11.2,11.2,11.2,30.4,0,41.6L197.6,373.6  c-11.2,11.2-30.4,11.2-41.6,0l-22.4-22.4c-11.2-11.2-11.2-30.4,0-41.6L309.6,133.6z" />
    </svg>
  )

  render = () => {
    let todoClass;
    if (this.props.isCompleted) {
      todoClass = this.props.classes.todoTextComplete;
    } else {
      todoClass = this.props.classes.todoTextIncomplete;
    }
    return (
      <div className="todo" >
        <Card
          elevation={4}
        >
          <CardContent className={this.props.classes.todoList} >
            <Checkbox
              checkedIcon={this.renderCompleteIcon()}
              icon={this.renderIncompleteIcon()}
              className={this.props.classes.checkBoxIncomplete}
              checkedClassName={this.props.classes.checkBoxComplete}
              disabledClassName={this.props.classes.checkBoxIncomplete}
              checked={this.props.isCompleted}
              tabIndex={-1}
              disableRipple
            />
            <Typography className={todoClass} type="title" component="h1">
              {this.props.todoTitle}
            </Typography>
          </CardContent>
        </Card>
      </div>
    )};
}

export default withStyles(styles)(Todo);
