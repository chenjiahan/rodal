import React from 'react';

class DialogMask {
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

