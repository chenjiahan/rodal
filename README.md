# Rodal
A React modal with animations.  
[Example](http://rodal.cn)

## Install

    npm install rodal

## Usage

    import React, { Component } from 'react';
    import Rodal from 'rodal';
    
    class App extends Component {
    
        constructor (props) {
            super(props);
            this.state = { visible: false }
        }
    
        show () {
            this.setState({ visible: true });
        }
    
        hide () {
            this.setState({ visible: false });
        }
    
        render () {
            return (
                <div>
                    <button onClick={this.show.bind(this)}>show</button>
    
                    <Rodal visible={this.state.visible} onClose={this.hide.bind(this)}>
                        <h1>Rodal</h1>
                    </Rodal>
                </div>
            )
        }
    }

## Props

Property|Type|Default|Description
---|---|---|---
onClose|func|/|onClose handler function
visible|bool|false|whether to show dialog
animation|string|zoom|animation type
duration|number|300|animation duration
showMask|bool|true|whether to show mask
showCloseButton|bool|true|whether to show close button
autoClose|number||close the modal after some time(ms)

## Animation Type
* zoom
* fade
* flip
* door
* rotate
* slideUp
* slideDown
* slideLeft
* slideRight
