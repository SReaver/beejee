import React from 'react'
const Task = (props) => (
    <tr>
        <td>{props.username}</td><td>{props.email}</td><td>{props.text}</td><td>{props.status === 10 ? 'Done!' : 'Not completed'}</td>
    </tr>
)
export default Task;