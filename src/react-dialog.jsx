import React, {Component, PropTypes} from 'react';

const propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func
}

const defaultProps = {
    visible: false,
    onClose: function () {}
}

class Dialog extends Component {

    render () {
        let visible = this.props.visible ? 'block' : 'none';
        return (
            <div className="react-dialog" style={{display: visible}}>
                <div className="react-dialog-mask"
                     onClick={this.props.onClose}>
                </div>
                <div className="react-dialog-box">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

Dialog.propTypes = propTypes;
Dialog.defaultProps = defaultProps;

export default Dialog;