import React from 'react';
import Dialog from '../src/react-dialog.jsx';
import '../src/react-dialog.scss';

class App {

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
                <button onClick={this.showDialog}>show</button>
                <Dialog visible={this.state.visible}
                        onClose={this.hideDialog}>
                    <h1>Dialog</h1>
                    <button onClick={this.hideDialog}>cancel</button>
                </Dialog>
            </div>
        )
    }
}

React.render(
    <App />,
    document.getElementById('example')
);