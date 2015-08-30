import React, { Component, PropTypes } from 'react';
import DialogBox from './react-dialog-box.jsx';
import DialogMask from './react-dialog-mask.jsx';

const propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    showCloseButton: PropTypes.bool,
    animation: PropTypes.string,
    duration: PropTypes.number
};

const defaultProps = {
    visible: false,
    showCloseButton: true,
    animation: 'popup',
    duration: 200
};

class Dialog extends Component {

    constructor (props) {
        super(props);

        this.state = {
            opacity: 0,
            isShow: 'none'
        };

        this.now = Date.now || (() => { return new Date().getTime() });
    }

    componentWillReceiveProps (nextProps) {
        if (!this.props.visible && nextProps.visible) {
            this.fadeIn();
        } else if (this.props.visible && !nextProps.visible) {
            this.fadeOut();
        }
    }

    fadeIn () {
        this.setState({ isShow: 'block' });
        let opacity = 0;
        let last = this.now();
        let duration = this.props.duration;
        let interval = duration / 20;
        let tick = function () {
            opacity = opacity + (this.now() - last) / duration;
            last = this.now();
            this.setState({ opacity: opacity });
            if (opacity < 1) {
                setTimeout(tick, interval);
            }
        }.bind(this);
        tick();
    }

    fadeOut () {
        let opacity = 1;
        let last = this.now();
        let duration = this.props.duration;
        let interval = duration / 20;
        let tick = function () {
            opacity = opacity - (this.now() - last) / duration;
            last = this.now();
            this.setState({ opacity: opacity });
            if (opacity > 0) {
                setTimeout(tick, interval);
            } else {
                this.setState({ isShow: 'none' })
            }
        }.bind(this);
        tick();
    }

    render () {

        let style = {
            display: this.state.isShow,
            opacity: this.state.opacity
        };

        return (
            <div className="react-dialog" style={style}>
                <DialogMask onClose={this.props.onClose} />
                <DialogBox {...this.props}>
                    {this.props.children}
                </DialogBox>
            </div>
        )
    }
}

Dialog.propTypes = propTypes;
Dialog.defaultProps = defaultProps;

export default Dialog;