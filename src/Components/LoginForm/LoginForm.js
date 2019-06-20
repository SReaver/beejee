import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../Store/actions';

class LoginForm extends Component {
    state = {
        username: '',
        password: '',
        usr: 'admin',
        pwd: '123',
        error: false
    }
    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    checkCredentials = () => {
        if (this.state.username === this.state.usr && this.state.password === this.state.pwd) {
            this.setState({ error: false });
            this.props.authenticate(true);
            this.props.showModal(false)
        } else {
            this.setState({ error: true })
        }
    }
    render() {
        return (
            <div style={{ textAlign: 'left', color: '#000' }}>
                {this.state.error ? <div style={{ color: 'red' }}>Please check your login or password</div> : null}
                <div>
                    <label htmlFor='username'>Login</label>
                    <input type='text' value={this.state.username} name='username' onChange={this.handleInputChange} id='username'></input>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input type='password' value={this.state.password} name='password' onChange={this.handleInputChange} id='password'></input>
                </div>
                <button onClick={this.checkCredentials}>Login</button>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        // pageNum: state.pageNum,
        // tasks: state.tasks,
        // totalTaskCount: state.totalTaskCount,
        authenticated: state.authenticated,
        showModal: state.showModal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // fetchData: (sort_field, sort_direction, pageNum) => dispatch(actions.fetchData(sort_field, sort_direction, pageNum)),
        // saveSortData: (sortedData) => dispatch(actions.saveData(sortedData)),
        authenticate: (payload) => dispatch({ type: actions.AUTHENTICATE, payload }),
        showModal: (payload) => dispatch({ type: actions.SHOW_MODAL, payload })
        //onDelete: (id) => dispatch({type: 'DELETE', id: id }),
        //setTotalTasksCount: (count) => dispatch({type: actions.SET_TOTAL_TASKS_COUNT, payload: count }),
        //onPageSelect: (page) => dispatch({})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);