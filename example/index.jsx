var React = require('react');
var Dialog = require('../src/react-dialog.jsx');

require('../src/react-dialog.scss');

var Example = React.createClass({

    getInitialState: function () {
        return {
            visible: false
        }
    },

    showDialog: function () {
        this.setState({ visible: true });
    },

    hideDialog: function () {
        this.setState({ visible: false });
    },

    render: function () {
        return (
            <div>
                <button onClick={this.showDialog}>show</button>
                <Dialog visible={this.state.visible}
                        onClose={this.hideDialog}>
                    <h1>Dialog</h1>
                    <p>some words bala bala</p>
                </Dialog>
            </div>
        )
    }
});

React.render(
    <Example />,
    document.getElementById('example')
);