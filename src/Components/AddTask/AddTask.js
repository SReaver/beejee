import React, { Component } from 'react'
import classes from './AddTask.module.css';
import axios from 'axios';
import { connect } from 'react-redux';

class AddTask extends Component {
  state = {
    username: '',
    email: '',
    text: 'Value'
  }
  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    let form = new FormData();
    form.append("username", this.state.username);
    form.append("email", this.state.email);
    form.append("text", this.state.text);
    axios.post('https://uxcandy.com/~shapoval/test-task-backend/create?developer=Example', form)
      .then(res => { console.log(res); })
    //   .then(() => {
    //     console.log(this.props.getState());
    //   })
  }
  render() {
    return (
      <div className={classes.AddTask}>
        <h2>Add new task</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.username} name="username" onChange={this.handleInputChange} placeholder="Enter your name" />
          <input type="email" value={this.state.email} name="email" onChange={this.handleInputChange} placeholder="Enter your email" />
          <textarea value={this.state.task} name="text" onChange={this.handleInputChange} />
          <input type="submit" onClick={(event) => this.props.handleSubmit(event)} value="Submit" />
        </form>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    isAuth: state.auth !== null,
    tasks: state.tasks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAdd: (username, email, text) => dispatch({ type: 'ADD_TASK', taskData: { username, email, text } }),
    onDelete: (id) => dispatch({ type: 'DELETE', id: id })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);