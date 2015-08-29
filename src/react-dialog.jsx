import React, { Component, PropTypes } from 'react';
import DialogBox from './react-dialog-box.jsx';
import DialogMask from './react-dialog-mask.jsx';

const propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func.isRequired
};

const defaultProps = {
    visible: false
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
        this.setState ({
            opacity: 1,
            isShow: 'block'
        });
    }

    fadeOut () {
        this.setState ({
            opacity: 0,
            isShow: 'none'
        });
    }

    render () {
        return (
            <div className="react-dialog" style={{display: this.state.isShow}}>
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