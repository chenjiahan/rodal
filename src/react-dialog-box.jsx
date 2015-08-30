import React, { Component } from 'react';

class DialogBox {
    render () {
        return (
            <div className="react-dialog-box">
                <div
                    className="react-dialog-close"
                    onClick={this.props.onClose}
                    style={{display: this.props.showCloseButton ? 'block' : 'none'}}
                />
                {this.props.children}
            </div>
        )
    }
}

export default DialogBox;