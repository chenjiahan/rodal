import React, { Component } from 'react';
import Rodal from '../src/rodal';
import './index.scss';
import '../src/rodal.scss';

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

    componentDidMount () {
        window.onresize = () => {
            this.forceUpdate();
        }
    }

    render () {

        const types = ['zoom', 'fade', 'flip', 'slideUp', 'slideDown', 'slideLeft', 'slideRight'];
        const buttons = types.map((value,index) => {
            return (
                <button key={index} className="btn" onClick={this.show.bind(this,value)}>
                    {value}
                </button>
            )
        });

        const wrapStyle = {
            paddingTop:window.innerHeight / 2 - 230,
            height: window.innerHeight
        }

        return (
            <div>
                <div className="wrap" style={wrapStyle}>
                    <div className="container">
                        <h1 className="title">Rodal</h1>
                        <h3 className="intro">A React modal with animations.</h3>
                        <div className="btn-area">{buttons}</div>

                        <Rodal
                            visible={this.state.visible}
                            onClose={this.hide.bind(this)}
                            animation={this.state.animation}
                            >
                            <h1 className="content-title">Hello Rodal!</h1>
                        </Rodal>

                    </div>
                </div>
                <span id="fork"><a target="_blank" href="https://github.com/chenjiahan/rodal">Fork me on GitHub</a></span>
            </div>
        )
    }
}

React.render(
    <App />,
    document.getElementById('app')
);