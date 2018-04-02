import React from 'react'
import { connect } from 'react-redux'
import { Task } from './task'
import { requestListTask } from '../actions';
import AddTask from './add-task'

const mapStateToProps = state => {
    return {tasks: [...state.todos].sort((el1, el2) => {
        if (el1.position > el2.position) return -1
        if (el1.position < el2.position) return 1
        return 0
    })};
}

class TaskList extends React.Component {
    componentDidMount() {
        this.props.dispatch(requestListTask())
    }

    render() {
        return <div>
            <AddTask dispatch={this.props.dispatch} />
            {this.props.tasks.map(task => <Task task={task} key={task.id} dispatch={this.props.dispatch} />)}
        </div>;
    }
}

export default connect(mapStateToProps)(TaskList)