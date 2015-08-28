var React = require('react');


var Dialog = React.createClass({

    getDefaultProps: function() {
        return {
            visible: false,
            onClose: function() {}
        }
    },

    render: function() {

        var style = {
            display:  this.props.visible ? 'block' : 'none'
        };

        return (
            <div className="react-dialog" style={style}>
                <div className="react-dialog-mask"
                     onClick={this.props.onClose}>
                </div>
                <div className="react-dialog-box">
                    {this.props.children}
                </div>
            </div>
        )
    }
});

module.exports = Dialog;