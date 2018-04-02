import React from 'react'
import { requestCreateTask } from '../actions';
class AddTask extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }
    }

    render() {
        return (<div>
            <input type='text'
                value={this.state.text}
                onKeyPress={e => this.handleKeyPress(e)}
                onChange={e => this.setState({ text: e.target.value })} />
        </div>)
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.props.dispatch(requestCreateTask(this.state.text, () => this.setState({text: ''})));
        }
    }
}

export default AddTask;