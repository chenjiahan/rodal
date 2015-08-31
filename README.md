# Rodal
A React component for modal and dialog.

## install
> npm install rodal

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
onClose|func|/|hide the dialog
visible|bool|false|visible
showCloseButton|bool|true|whether to show close button
animation|string|zoom|animation types
duration|number|300|animation duration