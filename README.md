# Rodal
A React modal with animations.  
[Example](http://rodal.cn)

## Install

    npm install rodal

## Usage

    import Rodal from 'rodal';
    import 'rodal.css';
    
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
autoClose|number||close the modal after some time(ms)

## Animation
* zoom
* fade
* flip
* door
* rotate
* slideUp
* slideDown
* slideLeft
* slideRight
