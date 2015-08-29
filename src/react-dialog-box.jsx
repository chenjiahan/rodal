import React, { Component } from 'react';

class DialogBox {
    render () {
        return (
            <div className="react-dialog-box">
                {this.props.children}
            </div>
        )
    }
}

export default DialogBox;