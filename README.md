# react-dialog
A simple dialog for React.

## Usage

    import React, { Component } from 'react';
    import Dialog from '../src/react-dialog.jsx';
    
    class App extends Component {
    
        constructor (props) {
            super(props);
            this.state = { visible: false }
        }
    
        showDialog () {
            this.setState({ visible: true });
        }
    
        hideDialog () {
            this.setState({ visible: false });
        }
    
        render () {
            return (
                <div>
                    <button onClick={this.showDialog.bind(this)}>show</button>
    
                    <Dialog
                        visible={this.state.visible}
                        onClose={this.hideDialog.bind(this)}
                    >
                        <h1>Dialog</h1>
                    </Dialog>
                </div>
            )
        }
    }

## API

Property|Type|Default|Description
---|---|---|---
onClose|func|required|hide the dialog
visible|bool|false|visible
showCloseButton|bool|true|whether to show close button
animation|string|"zoomIn"|animation types
duration|number|200|animation duration