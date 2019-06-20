import React, { Component } from 'react';
import Task from './Components/Task/Task';
import AddTask from './Components/AddTask/AddTask';
import './App.css';
import { connect } from 'react-redux';
import * as actions from './Components/Store/actions';
import Modal from './Components/Modal/Modal';
import LoginForm from './Components/LoginForm/LoginForm';
import EditTaskForm from './Components/EditTaskForm/EditTaskForm';

class App extends Component {

  componentDidMount() {
    this.props.fetchData();
  }
  sorting = (opt, desc = false) => {
    let arr = [...this.props.tasks];
    arr.sort((a, b) => (a[opt] > b[opt]) ? 1 : ((b[opt] > a[opt]) ? -1 : 0));
    if (desc) {
      arr.reverse(function (a, b) {
        return a[opt] - b[opt]
      });
    }
    this.props.saveSortData(arr);
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
          status={task.status}
        />
      ));
    }

    let pagesCount = this.props.totalTaskCount ? Math.ceil(this.props.totalTaskCount / 3) : 0,
      pages = [];
    for (let page = 1; page <= pagesCount; page++) {
      pages.push(<span key={page} onClick={() => { this.props.fetchData(null, null, page) }} style={{ display: 'inline-block', padding: '5px', cursor: 'pointer' }}>{page}</span>)
    }

    return (
      <div className="App" >
        <header className="App-header">
          <div style={{ textAlign: "right", width: "50%" }}>
            {this.props.authenticated ? <span onClick={() => this.props.authenticate(false)}>LogOut</span> : <span onClick={this.props.openModal}>LogIn</span>}
          </div>
          <Modal
            show={this.props.showModal}
            closeModal={this.props.closeModal}
          >
            {this.props.showLoginForm ? <LoginForm /> : this.props.showEditTaskForm ? <EditTaskForm id={this.props.taskId} /> : null}
          </Modal>
          <AddTask />
          <table>
            <tbody>
              <tr>
                <th>Username <i className="sort-by-asc" onClick={() => this.sorting('username')}></i>
                  <i className="sort-by-desc" onClick={() => this.sorting('username', 1)}></i></th>
                <th>Email <i className="sort-by-asc" onClick={() => this.sorting('email')}></i>
                  <i className="sort-by-desc" onClick={() => this.sorting('email', 1)}></i></th>
                <th>Task</th>
                <th>Status <i className="sort-by-asc" onClick={() => this.sorting('status')}></i>
                  <i className="sort-by-desc" onClick={() => this.sorting('status', 1)}></i></th>
              </tr>
              {tasks}
            </tbody>
          </table>
          <div>{pages}</div>
          Total: {this.props.totalTaskCount ? this.props.totalTaskCount : 0}
        </header>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    pageNum: state.pageNum,
    tasks: state.tasks,
    totalTaskCount: state.totalTaskCount,
    authenticated: state.authenticated,
    showModal: state.showModal,
    showLoginForm: state.showLoginForm,
    showEditTaskForm: state.showEditTaskForm
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: (sort_field, sort_direction, pageNum) => dispatch(actions.fetchData(sort_field, sort_direction, pageNum)),
    saveSortData: (sortedData) => dispatch(actions.saveData(sortedData)),
    authenticate: (payload) => dispatch({ type: actions.AUTHENTICATE, payload }),
    openModal: () => dispatch({ type: actions.SHOW_MODAL, payload: true }),
    closeModal: () => dispatch({ type: actions.SHOW_MODAL, payload: false })
    //onDelete: (id) => dispatch({ type: 'DELETE', id: id }),
    //setTotalTasksCount: (count) => dispatch({ type: actions.SET_TOTAL_TASKS_COUNT, payload: count }),
    //onPageSelect: (page) => dispatch({})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);