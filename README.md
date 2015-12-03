# Rodal
A React modal with animations.  
[Example](http://rodal.cn)

## Install

    npm install rodal

## Usage

    import React from 'react';
    import Rodal from 'rodal';
    
    class App extends React.Component {
    
        constructor(props) {
            super(props);
            this.state = { visible: false };
        }
    
        show() {
            this.setState({ visible: true });
        }
    
        hide() {
            this.setState({ visible: false });
        }
    
        render() {
            return (
                <div>
                    <button onClick={this.show.bind(this)}>show</button>
    
                    <Rodal visible={this.state.visible} onClose={this.hide.bind(this)}>
                        <div>Content</div>
                    </Rodal>
                </div>
            )
        }
    }

## Props

Property|Type|Default|Description
---|---|---|---
width|number|400|width of dialog
height|number|240|height of dialog
onClose|func|/|onClose handler function
visible|bool|false|whether to show dialog
showMask|bool|true|whether to show mask
showCloseButton|bool|true|whether to show close button
animation|string|zoom|animation type
duration|number|300|animation duration

## Animation Types
* zoom
* fade
* flip
* door
* rotate
* slideUp
* slideDown
* slideLeft
* slideRight
