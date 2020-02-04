import React    from 'react';
import ReactDOM from 'react-dom';
import Rodal    from '../../src/rodal';
import './index.css';
import '../../src/rodal.css';

class App extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            visible: false,
            animation: 'zoom'
        }
    }

    show = (animation) => {
        this.setState({
            animation,
            visible: true
        });
    }

    hide = () => {
        this.setState({ visible: false });
    }

    onKeyPressHide = (event) => {
        if (event.which === 13) {
            this.hide();
        }
    }

    render () {
        const { visible, animation } = this.state;
        const types = ['zoom', 'fade', 'flip', 'door', 'rotate', 'slideUp', 'slideDown', 'slideLeft', 'slideRight'];
        const buttons = types.map((value, index) => {
            const style = {
                animationDelay       : index * 100 + 'ms',
                WebkitAnimationDelay : index * 100 + 'ms'
            };
            return (
                <button key={index} className="btn scale" onClick={this.show.bind(this, value)} style={style}>
                    {value}
                </button>
            )
        });

        return (
            <div className="wrap">
                <div className="container" style={{ paddingTop: (window.innerHeight - 440) / 2 }}>
                    <h1 className="title scale">Rodal</h1>
                    <h3 className="intro scale">A React modal with animations.</h3>
                    <div className="btn-area">{buttons}</div>
                </div>
                <Rodal visible={visible}
                       onClose={this.hide}
                       animation={animation}
                       closeOnEsc
                >
                    <div className="header">Rodal</div>
                    <div className="body">A React modal with animations.</div>
                    <button className="rodal-confirm-btn" onClick={this.hide}>ok</button>
                    <button className="rodal-cancel-btn" onClick={this.hide}>close</button>
                </Rodal>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);