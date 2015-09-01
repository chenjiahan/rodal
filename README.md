# Rodal
A React modal with animations.  
[example](http://chenjiahan.github.io/rodal/)

## Install

    npm install rodal

## Usage

    import Rodal from 'rodal';
    
    class App extends React.Component {
    
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

## API

Property|Type|Default|Description
---|---|---|---
onClose|func|/|onClose handler function
visible|bool|false|whether to show dialog
animation|string|zoom|animation type
duration|number|300|animation duration
showMask|bool|true|whether to show mask
showCloseButton|bool|true|whether to show close button

## Animation
* zoom
* fade
* flip
* slideUp
* slideDown
