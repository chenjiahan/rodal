import React, { Component } from 'react';
import Rodal from '../src/rodal';

class App extends Component {

    constructor (props) {
        super(props);
        this.state = { visible: false }
    }

    showRodal () {
        this.setState({ visible: true });
    }

    hideRodal () {
        this.setState({ visible: false });
    }

    render () {
        return (
            <div>
                <button onClick={this.showRodal.bind(this)}>show</button>

                <Rodal
                    visible={this.state.visible}
                    onClose={this.hideRodal.bind(this)}
                    duration={200}
                >
                    <h1>Rodal</h1>
                </Rodal>
            </div>
        )
    }
}

React.render(
    <App />,
    document.getElementById('example')
);