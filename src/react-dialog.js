import React, { Component, PropTypes } from 'react';
import '../src/react-dialog.scss';

class DialogBox extends Component {
    render () {

        let style = {
            animationDuration: this.props.duration + 'ms',
            WebkitAnimationDuration: this.props.duration + 'ms'
        };

        return (
            <div className={"react-dialog-box " + this.props.animation} style={style}>
                <span
                    className="react-dialog-close"
                    onClick={this.props.onClose}
                    style={{ display: this.props.showCloseButton ? 'block' : 'none' }}
                />
                {this.props.children}
            </div>
        )
    }
}

class DialogMask extends Component {
    render () {
        return (
            <div
                className="react-dialog-mask"
                onClick={this.props.onClose}
            />
        )
    }
}

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
            this.setState({ animation: 'react-dialog-' + this.props.animation + '-enter' });
            this.fadeIn();
        } else if (this.props.visible && !nextProps.visible) {
            this.setState({ animation: 'react-dialog-' + this.props.animation + '-leave' });
            this.fadeOut();
        }
    }

    fadeIn () {
        this.setState({ isShow: 'block' });
        let opacity = 0;
        let last = this.now();
        let duration = this.props.duration;
        let interval = duration / 10;
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
        let interval = duration / 10;
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
                <DialogBox {...this.props} animation={this.state.animation}>
                    {this.props.children}
                </DialogBox>
            </div>
        )
    }
}

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
    animation: 'alert',
    duration: 200
};

Dialog.propTypes = propTypes;
Dialog.defaultProps = defaultProps;

export default Dialog;