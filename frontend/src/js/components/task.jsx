import React from 'react'

import { requestUpdateTask, requestDeleteTask } from "../actions"

export class Task extends React.Component {
    constructor(props) {
        super(props)
        this.state = { text: props.task.text }
    }

    render() {
        return (<div>
            <input type='text'
                value={this.state.text}
                onKeyPress={e => this.handleKeyPress(e)}
                onChange={e => this.handleChange(e)} />
            <a href="#" onClick={e => this.handleUp(e)}>Up</a>
            <a href="#" onClick={e => this.handleDown(e)}>Down</a>
            <a href="#" onClick={e => this.handleDelete(e)}>Delete</a>
        </div>)
    }

    handleUp(e) {
        this.props.dispatch(requestUpdateTask(Object.assign({}, this.props.task, { position: this.props.task.position + 1 })))
    }

    handleDown(e) {
        this.props.dispatch(requestUpdateTask(Object.assign({}, this.props.task, { position: this.props.task.position - 1 })))
    }

    handleChange(e) {
        this.setState({ text: e.target.value })
    }

    handleDelete(e) {
        this.props.dispatch(requestDeleteTask(Object.assign({}, this.props.task)))        
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.props.dispatch(requestUpdateTask(Object.assign({}, this.props.task, { text: this.state.text })))
        }
    }
}

