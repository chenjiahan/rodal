'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var Dialog = function Dialog(props) {

    var className = 'rodal-dialog rodal-' + props.animation + '-' + props.animationType;
    var CloseButton = props.showCloseButton ? _react2.default.createElement('span', { className: 'rodal-close', onClick: props.onClose }) : null;
    var style = {
        animationDuration: props.duration + 'ms',
        WebkitAnimationDuration: props.duration + 'ms'
    };

    return _react2.default.createElement('div', { style: style, className: className }, CloseButton, props.children);
}; /**
    * Dialog Component
    */

exports.default = Dialog;