import React, { Component, PropTypes } from 'react';
import DialogBox from './react-dialog-box.jsx';
import DialogMask from './react-dialog-mask.jsx';

const propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    animation: PropTypes.string
};

const defaultProps = {
    visible: false,
    animation: 'popup'
};

class Dialog extends Component {

    constructor (props) {
        super(props);

        this.state = {
            opacity: 0,
            isShow: 'none'
        }
    }

    componentWillReceiveProps (nextProps) {
        if (!this.props.visible && nextProps.visible) {
            this.fadeIn();
        } else if (this.props.visible && !nextProps.visible) {
            this.fadeOut();
        }
    }

    fadeIn () {
        let opacity = 0;
        this.setState({ isShow: 'block' });

        var interval = setInterval(function() {
            this.setState({ opacity: opacity / 100 });
            if ( opacity >= 100 ) {
                clearInterval(interval);
            }
            opacity += 5;
        }.bind(this),10);
    }

    fadeOut () {
        let opacity = 100;

        var interval = setInterval(function() {
            this.setState({ opacity: opacity });
            if (opacity <= 0) {
                clearInterval(interval);
                this.setState({ isShow: 'none' });
            }
            opacity -= 5;
        }.bind(this),10);
    }

    render () {
        return (
            <div className="react-dialog" style={{display: this.state.isShow, opacity: this.state.opacity}}>
                <DialogMask
                    onClose={this.props.onClose}
                    opacity={this.state.opacity}
                />
                <DialogBox opacity={this.state.opacity}>
                    {this.props.children}
                </DialogBox>
            </div>
        )
    }
}

Dialog.propTypes = propTypes;
Dialog.defaultProps = defaultProps;

export default Dialog;