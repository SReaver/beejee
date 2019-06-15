import React, { Component } from 'react';
import Task from './Components/Task/Task';
import AddTask from './Components/AddTask/AddTask';
import './App.css';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from './Components/Store/actions';

class App extends Component {

  componentDidMount() {
    this.props.fetchData();
  }
  render() {
    //console.log('app.js this.props.tasks ', this.props.tasks);

    let tasks = this.props.tasks ? this.props.tasks : <tr><td colSpan="3">Данные загружаются...</td></tr>
    if (this.props.tasks) {
      tasks = this.props.tasks.map(task => (
        <Task
          key={task.id}
          username={task.username}
          email={task.email}
          text={task.text}
        />
      ));
    }

    return (
      <div className="App" >
        <header className="App-header">
          <AddTask
            handleSubmit={this.props.onAdd}
          />
          <table>
            <tbody>
              <tr>
                <th>Username</th><th>Email</th><th>Task</th>
              </tr>
              {tasks}
            </tbody>
          </table>
          Total: {this.props.totalTaskCount ? this.props.totalTaskCount : 0}
        </header>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    isAuth: state.auth,
    tasks: state.tasks,
    totalTaskCount: state.totalTaskCount || null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(actions.fetchData()),
    onAdd: (username, email, text) => dispatch({ type: 'ADD_TASK', taskData: { username, email, text } }),
    onDelete: (id) => dispatch({ type: 'DELETE', id: id }),
    //setTotalTasksCount: (count) => dispatch({ type: actions.SET_TOTAL_TASKS_COUNT, payload: count }),
    onPageSelect: (page) => dispatch({})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);