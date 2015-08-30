import React, { Component } from 'react';
import Rodal from '../src/rodal';
import './index.scss';

class App extends Component {

    constructor (props) {
        super(props);
        this.state = { visible: false }
    }

    show () {
        this.setState({ visible: true });
    }

    hide () {
        this.setState({ visible: false });
    }

    render () {
        return (
            <div className="wrap" style={{height: window.innerHeight}}>
                <div className="container">
                    <h1 className="title">Rodal</h1>
                    <h3 className="intro">A React component for modal and dialog.</h3>

                    <button
                        className="show-btn"
                        onClick={this.show.bind(this)}
                    >
                        show
                    </button>

                    <Rodal
                        visible={this.state.visible}
                        onClose={this.hide.bind(this)}
                        duration={200}
                        >
                        <h1 className="content-title">Hello Rodal!</h1>
                    </Rodal>

                </div>
            </div>
        )
    }
}

React.render(
    <App />,
    document.getElementById('app')
);