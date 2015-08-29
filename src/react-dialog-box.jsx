import React, { Component } from 'react';

class DialogBox extends Component {
    render () {
        return (
            <div className="react-dialog-box">
                {this.props.children}
            </div>
        )
    }
}

export default DialogBox;