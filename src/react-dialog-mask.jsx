import React, { Component } from 'react';

class DialogMask extends Component {
    render () {
        return (
            <div
                className="react-dialog-mask"
                onClick={this.props.onClose}
             >
            </div>
        )
    }
}

export default DialogMask;

