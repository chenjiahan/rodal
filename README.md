# Rodal
A React component for modal and dialog.

## Usage

    import React, { Component } from 'react';
    import Rodal from '../src/rodal';
    
    class App extends Component {
    
        constructor (props) {
            super(props);
            this.state = { visible: false }
        }
    
        showRodal () {
            this.setState({ visible: true });
        }
    
        hideRodal () {
            this.setState({ visible: false });
        }
    
        render () {
            return (
                <div>
                    <button onClick={this.showRodal.bind(this)}>show</button>
    
                    <Rodal
                        visible={this.state.visible}
                        onClose={this.hideRodal.bind(this)}
                        duration={200}
                    >
                        <h1>Rodal</h1>
                    </Rodal>
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
animation|string|alert|animation types
duration|number|200|animation duration