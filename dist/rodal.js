/* ===============================
 * Rodal v1.1.0 http://rodal.cn
 * =============================== */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

/**
 * Props
 */
var propTypes = {
    visible: _react.PropTypes.bool,
    onClose: _react.PropTypes.func.isRequired,
    animation: _react.PropTypes.string,
    duration: _react.PropTypes.number,
    showMask: _react.PropTypes.bool,
    showCloseButton: _react.PropTypes.bool,
    autoClose: _react.PropTypes.number
};
var defaultProps = {
    visible: false,
    animation: 'zoom',
    duration: 300,
    showMask: true,
    showCloseButton: true
};

/**
 * detect animation events
 */
var endEvents = [];
var EVENT_NAME_MAP = {
    transitionend: {
        'transition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'mozTransitionEnd',
        'OTransition': 'oTransitionEnd',
        'msTransition': 'MSTransitionEnd'
    },

    animationend: {
        'animation': 'animationend',
        'WebkitAnimation': 'webkitAnimationEnd',
        'MozAnimation': 'mozAnimationEnd',
        'OAnimation': 'oAnimationEnd',
        'msAnimation': 'MSAnimationEnd'
    }
};
(function () {
    var testEl = document.createElement('div');
    var style = testEl.style;

    if (!('AnimationEvent' in window)) {
        delete EVENT_NAME_MAP.animationend.animation;
    }

    if (!('TransitionEvent' in window)) {
        delete EVENT_NAME_MAP.transitionend.transition;
    }

    for (var baseEventName in EVENT_NAME_MAP) {
        var baseEvents = EVENT_NAME_MAP[baseEventName];
        for (var styleName in baseEvents) {
            if (styleName in style) {
                endEvents.push(baseEvents[styleName]);
                break;
            }
        }
    }
})();
var TransitionEvents = {
    addEndEventListener: function addEndEventListener(node, eventListener) {
        if (endEvents.length === 0) {
            window.setTimeout(eventListener, 0);
            return;
        }
        endEvents.forEach(function (endEvent) {
            node.addEventListener(endEvent, eventListener, false);
        });
    },
    removeEndEventListener: function removeEndEventListener(node, eventListener) {
        if (endEvents.length === 0) {
            return;
        }
        endEvents.forEach(function (endEvent) {
            node.removeEventListener(endEvent, eventListener, false);
        });
    }
};

/**
 * Modal Component
 */
var Modal = function Modal(props) {
    var style = {
        animationDuration: props.duration + 'ms',
        WebkitAnimationDuration: props.duration + 'ms'
    };

    var className = 'rodal-box rodal-' + props.animation + '-' + props.animationType;

    var CloseButton = props.showCloseButton ? _react2['default'].createElement('span', { className: 'rodal-close', onClick: props.onClose }) : null;

    return _react2['default'].createElement(
        'div',
        { style: style, className: className },
        CloseButton,
        props.children
    );
};

/**
 * Mask Component
 */
var Mask = function Mask(_ref) {
    var onClose = _ref.onClose;
    return _react2['default'].createElement('div', { className: 'rodal-mask', onClick: onClose });
};

/**
 * Rodal Component
 */

var Rodal = (function (_Component) {
    _inherits(Rodal, _Component);

    function Rodal(props) {
        _classCallCheck(this, Rodal);

        _get(Object.getPrototypeOf(Rodal.prototype), 'constructor', this).call(this, props);

        this.state = {
            isShow: this.props.visible,
            animationType: this.props.visible ? 'enter' : 'leave'
        };
    }

    _createClass(Rodal, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            TransitionEvents.addEndEventListener(_reactDom2['default'].findDOMNode(this), this.transitionEnd.bind(this));
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            TransitionEvents.removeEndEventListener(_react2['default'].findDOMNode(this), this.transitionEnd);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (!this.props.visible && nextProps.visible) {
                this.enter();
            } else if (this.props.visible && !nextProps.visible) {
                this.leave();
            }
        }
    }, {
        key: 'enter',
        value: function enter() {
            this.setState({
                isShow: true,
                animationType: 'enter'
            });
        }
    }, {
        key: 'leave',
        value: function leave() {
            this.setState({
                animationType: 'leave'
            });

            //IE9
            if (endEvents.length === 0) {
                this.setState({
                    isShow: false
                });
            }
        }
    }, {
        key: 'transitionEnd',
        value: function transitionEnd(e) {
            var node = _reactDom2['default'].findDOMNode(this);
            if (e && e.target !== node) {
                return;
            }

            if (this.state.animationType === 'enter') {
                node.focus();
            } else {
                this.setState({
                    isShow: false
                });
            }
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {
            //Escape
            if (e.keyCode === 27) {
                this.props.onClose();
            }
        }
    }, {
        key: 'render',
        value: function render() {

            var style = {
                display: this.state.isShow ? 'block' : 'none',
                animationDuration: this.props.duration + 'ms',
                WebkitAnimationDuration: this.props.duration + 'ms'
            };

            var animationType = this.state.animationType;

            var showMask = this.props.showMask ? _react2['default'].createElement(Mask, { onClose: this.props.onClose }) : null;

            var autoClose = this.props.autoClose;
            if (typeof autoClose === 'number' && animationType === 'enter') {
                this.autoClose = setTimeout((function () {
                    this.props.onClose();
                }).bind(this), autoClose);
            } else if (this.autoClose !== undefined) {
                clearTimeout(this.autoClose);
            }

            return _react2['default'].createElement(
                'div',
                {
                    style: style,
                    className: "rodal rodal-fade-" + animationType,
                    onKeyDown: this.handleKeyDown.bind(this),
                    tabIndex: -1
                },
                showMask,
                _react2['default'].createElement(
                    Modal,
                    _extends({}, this.props, { animationType: animationType }),
                    this.props.children
                )
            );
        }
    }]);

    return Rodal;
})(_react.Component);

Rodal.propTypes = propTypes;
Rodal.defaultProps = defaultProps;

exports['default'] = Rodal;
module.exports = exports['default'];