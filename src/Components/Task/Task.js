import React from 'react'
const Task = (props) => (
    <tr>
        <td>{props.username}</td><td>{props.email}</td><td>{props.text}</td>
    </tr>
)
export default Task;