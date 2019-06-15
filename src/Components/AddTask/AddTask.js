import React, { Component } from 'react'
import classes from './AddTask.module.css';
import { connect } from 'react-redux';
import * as actions from '../Store/actions';

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
    console.log('pageNum', this.props.pageNum);
    let form = new FormData();
    form.append("username", this.state.username);
    form.append("email", this.state.email);
    form.append("text", this.state.text);
    this.props.addTask(form);
    this.props.fetchData(this.props.pageNum);
  }
  render() {
    return (
      <div className={classes.AddTask}>
        <h2>Add new task</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.username} name="username" onChange={this.handleInputChange} placeholder="Enter your name" />
          <input type="email" value={this.state.email} name="email" onChange={this.handleInputChange} placeholder="Enter your email" />
          <textarea value={this.state.task} name="text" onChange={this.handleInputChange} />
          <input type="submit" onClick={((e) => this.handleSubmit(e))} value="Submit" />
        </form>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    // isAuth: state.auth !== null,
    //tasks: state.tasks
    pageNum: state.pageNum
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTask: (task) => dispatch(actions.addTask(task)),
    fetchData: (pageNum) => dispatch(actions.fetchData(pageNum)),
    onAdd: (username, email, text) => dispatch({ type: 'ADD_TASK', taskData: { username, email, text } }),
    onDelete: (id) => dispatch({ type: 'DELETE', id: id })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);