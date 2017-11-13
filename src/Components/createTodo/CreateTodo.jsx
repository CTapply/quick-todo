import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import Typography from 'material-ui/Typography';
import Input from 'material-ui/Input';
import './CreateTodo.css';

const styles = {
  root: {
    padding: '5px !important',
  },
  createTodoBox: {
    position: 'relative',
    'z-index': '1000',
  },
  newTodoTextBox: {
    margin: '0px 0px 0px 0px',
    width: 'calc(100% - 76px)',
  },
  toggleListShown: {
    width: '34px',
    height: '34px',
    float: 'left',
    transform: 'translateY(2px)',
    transition: 'transform 300ms ease-in-out',
  },
  toggleListHidden: {
    transform: 'rotate(-90deg)',
  },
};

class CreateTodo extends Component {
  static propTypes = {
    onSave: PropTypes.func.isRequired,
    todosHidden: PropTypes.bool.isRequired,
    handleTodoListToggle: PropTypes.func.isRequired,
    classes: PropTypes.shape({
      root: PropTypes.string,
      createTodoBox: PropTypes.string,
      newTodoTextBox: PropTypes.string,
      toggleListShown: PropTypes.string,
      toggleListHidden: PropTypes.string,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isRecurring: false,
      recurringTodoPopOverOpen: false,
    };
  }

  componentDidMount() {
    document.getElementById('title-input').focus();
    window.addEventListener('keypress', this.handleEnterKey);
    if (this.props.todosHidden) document.getElementById('list-toggle-carret').classList.add(this.props.classes.toggleListHidden);
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.handleEnterKey);
  }

  handleEnterKey = (e) => {
    if (e.keyCode === 13) {
      this.savePost();
    }
  }

  toggleCalendar = () => (this.state.isRecurring
    ? this.setState({ isRecurring: false })
    : this.setState({ isRecurring: true, recurringTodoPopOverOpen: true }));

  toggleCarret = () => {
    const element = document.getElementById('list-toggle-carret');
    element.classList.toggle(this.props.classes.toggleListHidden);
    this.props.handleTodoListToggle();
  }

  handleRequestClose = () => {
    this.setState({
      recurringTodoPopOverOpen: false,
    });
  };

  savePost = () => {
    const titleInput = document.getElementById('title-input');
    this.props.onSave({
      title: titleInput.value,
      body: '',
      isCompleted: false,
      date: Date.now(),
    });
    titleInput.value = '';
  }

  renderCalendar = () => (
    <svg
      id="calendarSVG"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      version="1.1"
      style={{ width: '42px', height: '42px', float: 'right', transform: 'translateY(-4px)' }}
      onClick={this.toggleCalendar}
    >
      <g id="surface1">
        <path style={{ fill: '#CFD8DC' }} d="M 5 38 L 5 14 L 43 14 L 43 38 C 43 40.199219 41.199219 42 39 42 L 9 42 C 6.800781 42 5 40.199219 5 38 Z " />
        <path style={{ fill: '#F44336' }} d="M 43 10 L 43 16 L 5 16 L 5 10 C 5 7.800781 6.800781 6 9 6 L 39 6 C 41.199219 6 43 7.800781 43 10 Z " />
        <path style={{ fill: '#B71C1C' }} d="M 36 10 C 36 11.65625 34.65625 13 33 13 C 31.34375 13 30 11.65625 30 10 C 30 8.34375 31.34375 7 33 7 C 34.65625 7 36 8.34375 36 10 Z " />
        <path style={{ fill: '#B71C1C' }} d="M 18 10 C 18 11.65625 16.65625 13 15 13 C 13.34375 13 12 11.65625 12 10 C 12 8.34375 13.34375 7 15 7 C 16.65625 7 18 8.34375 18 10 Z " />
        <path style={{ fill: '#B0BEC5' }} d="M 33 3 C 31.898438 3 31 3.898438 31 5 L 31 10 C 31 11.101563 31.898438 12 33 12 C 34.101563 12 35 11.101563 35 10 L 35 5 C 35 3.898438 34.101563 3 33 3 Z " />
        <path style={{ fill: '#B0BEC5' }} d="M 15 3 C 13.898438 3 13 3.898438 13 5 L 13 10 C 13 11.101563 13.898438 12 15 12 C 16.101563 12 17 11.101563 17 10 L 17 5 C 17 3.898438 16.101563 3 15 3 Z " />
        <path style={{ fill: '#90A4AE' }} d="M 13 20 L 17 20 L 17 24 L 13 24 Z " />
        <path style={{ fill: '#90A4AE' }} d="M 19 20 L 23 20 L 23 24 L 19 24 Z " />
        <path style={{ fill: '#90A4AE' }} d="M 25 20 L 29 20 L 29 24 L 25 24 Z " />
        <path style={{ fill: '#90A4AE' }} d="M 31 20 L 35 20 L 35 24 L 31 24 Z " />
        <path style={{ fill: '#90A4AE' }} d="M 13 26 L 17 26 L 17 30 L 13 30 Z " />
        <path style={{ fill: '#90A4AE' }} d="M 19 26 L 23 26 L 23 30 L 19 30 Z " />
        <path style={{ fill: '#90A4AE' }} d="M 25 26 L 29 26 L 29 30 L 25 30 Z " />
        <path style={{ fill: '#90A4AE' }} d="M 31 26 L 35 26 L 35 30 L 31 30 Z " />
        <path style={{ fill: '#90A4AE' }} d="M 13 32 L 17 32 L 17 36 L 13 36 Z " />
        <path style={{ fill: '#90A4AE' }} d="M 19 32 L 23 32 L 23 36 L 19 36 Z " />
        <path style={{ fill: '#90A4AE' }} d="M 25 32 L 29 32 L 29 36 L 25 36 Z " />
        <path style={{ fill: '#90A4AE' }} d="M 31 32 L 35 32 L 35 36 L 31 36 Z " />
      </g>
    </svg>
  )

  renderGreyCalendar = () => (
    <svg
      id="calendarSVG"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      version="1.1"
      style={{ width: '42px', height: '42px', float: 'right', transform: 'translateY(-4px)', opacity: 0.5 }}
      onClick={this.toggleCalendar}
    >
      <g id="surface1">
        <path style={{ fill: '#DCDCDC' }} d="M 5 38 L 5 14 L 43 14 L 43 38 C 43 40.199219 41.199219 42 39 42 L 9 42 C 6.800781 42 5 40.199219 5 38 Z " />
        <path style={{ fill: '#F2F2F2' }} d="M 43 10 L 43 16 L 5 16 L 5 10 C 5 7.800781 6.800781 6 9 6 L 39 6 C 41.199219 6 43 7.800781 43 10 Z " />
        <path style={{ fill: '#B5B5B5' }} d="M 36 10 C 36 11.65625 34.65625 13 33 13 C 31.34375 13 30 11.65625 30 10 C 30 8.34375 31.34375 7 33 7 C 34.65625 7 36 8.34375 36 10 Z " />
        <path style={{ fill: '#B5B5B5' }} d="M 18 10 C 18 11.65625 16.65625 13 15 13 C 13.34375 13 12 11.65625 12 10 C 12 8.34375 13.34375 7 15 7 C 16.65625 7 18 8.34375 18 10 Z " />
        <path style={{ fill: '#C4C4C4' }} d="M 33 3 C 31.898438 3 31 3.898438 31 5 L 31 10 C 31 11.101563 31.898438 12 33 12 C 34.101563 12 35 11.101563 35 10 L 35 5 C 35 3.898438 34.101563 3 33 3 Z " />
        <path style={{ fill: '#C4C4C4' }} d="M 15 3 C 13.898438 3 13 3.898438 13 5 L 13 10 C 13 11.101563 13.898438 12 15 12 C 16.101563 12 17 11.101563 17 10 L 17 5 C 17 3.898438 16.101563 3 15 3 Z " />
        <path style={{ fill: '#ADADAD' }} d="M 13 20 L 17 20 L 17 24 L 13 24 Z " />
        <path style={{ fill: '#ADADAD' }} d="M 19 20 L 23 20 L 23 24 L 19 24 Z " />
        <path style={{ fill: '#ADADAD' }} d="M 25 20 L 29 20 L 29 24 L 25 24 Z " />
        <path style={{ fill: '#ADADAD' }} d="M 31 20 L 35 20 L 35 24 L 31 24 Z " />
        <path style={{ fill: '#ADADAD' }} d="M 13 26 L 17 26 L 17 30 L 13 30 Z " />
        <path style={{ fill: '#ADADAD' }} d="M 19 26 L 23 26 L 23 30 L 19 30 Z " />
        <path style={{ fill: '#ADADAD' }} d="M 25 26 L 29 26 L 29 30 L 25 30 Z " />
        <path style={{ fill: '#ADADAD' }} d="M 31 26 L 35 26 L 35 30 L 31 30 Z " />
        <path style={{ fill: '#ADADAD' }} d="M 13 32 L 17 32 L 17 36 L 13 36 Z " />
        <path style={{ fill: '#ADADAD' }} d="M 19 32 L 23 32 L 23 36 L 19 36 Z " />
        <path style={{ fill: '#ADADAD' }} d="M 25 32 L 29 32 L 29 36 L 25 36 Z " />
        <path style={{ fill: '#ADADAD' }} d="M 31 32 L 35 32 L 35 36 L 31 36 Z " />
      </g>
    </svg>
  )

  renderDropDownIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      version="1.1"
      style={{ width: '24px', height: '24px' }}
    >
      <g id="surface1">
        <path d="M 44.988281 13.984375 C 44.726563 13.992188 44.476563 14.101563 44.292969 14.292969 L 25 33.585938 L 5.707031 14.292969 C 5.519531 14.097656 5.261719 13.992188 4.992188 13.988281 C 4.582031 13.992188 4.21875 14.238281 4.0625 14.613281 C 3.910156 14.992188 4 15.421875 4.292969 15.707031 L 24.292969 35.707031 C 24.683594 36.097656 25.316406 36.097656 25.707031 35.707031 L 45.707031 15.707031 C 46.003906 15.421875 46.09375 14.980469 45.9375 14.601563 C 45.777344 14.222656 45.402344 13.976563 44.988281 13.984375 Z " />
      </g>
    </svg>
  )

  render = () => (
    <Card raised elevation={4} className={this.props.classes.createTodoBox} >
      <CardContent classes={{ root: this.props.classes.root }} >
        <IconButton
          id="list-toggle-carret"
          className={this.props.classes.toggleListShown}
          aria-label="Toggle Todos"
          onClick={this.toggleCarret}
        >
          {this.renderDropDownIcon()}
        </IconButton>
        <Input
          placeholder="New Task"
          className={this.props.classes.newTodoTextBox}
          id="title-input"
          fullWidth={false}
        />
        {(this.state.isRecurring)
          ? this.renderCalendar()
          : this.renderGreyCalendar()}
        <Popover
          open={this.state.recurringTodoPopOverOpen}
          anchorEl={document.getElementById('calendarSVG')}
          onRequestClose={this.handleRequestClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Typography>The content of the Popover.</Typography>
        </Popover>
      </CardContent>
    </Card>
  )
}

export default withStyles(styles)(CreateTodo);
