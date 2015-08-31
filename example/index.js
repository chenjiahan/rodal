import React, { Component } from 'react';
import Rodal from '../src/rodal';
import './index.scss';

class App extends Component {

    constructor (props) {
        super(props);
        this.state = {
            visible: false,
            animation: 'zoom'
        }
    }

    show (animation) {
        this.setState({
            animation: animation,
            visible: true
        });
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
                        onClick={this.show.bind(this,"zoom")}
                    >
                        zoom
                    </button>

                    <button
                        className="show-btn"
                        onClick={this.show.bind(this,"slide-down")}
                    >
                        slide-down
                    </button>

                    <Rodal
                        visible={this.state.visible}
                        onClose={this.hide.bind(this)}
                        animation={this.state.animation}
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