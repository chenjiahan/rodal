import React, { Component } from 'react';
import Dialog from '../src/react-dialog.jsx';
import '../src/react-dialog.scss';

class App extends Component {

    constructor (props) {
        super(props);

        this.state = {
            visible: false
        }
    }

    showDialog () {
        this.setState({ visible: true });
    }

    hideDialog () {
        this.setState({ visible: false });
    }

    render () {
        return (
            <div>
                <button onClick={this.showDialog.bind(this)}>show</button>

                <Dialog
                    visible={this.state.visible}
                    onClose={this.hideDialog.bind(this)}
                >
                    <h1>Dialog</h1>
                </Dialog>
            </div>
        )
    }
}

React.render(
    <App />,
    document.getElementById('example')
);