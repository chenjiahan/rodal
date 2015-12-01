'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _animationEvents = require('./animationEvents');

var _animationEvents2 = _interopRequireDefault(_animationEvents);

var _dialog = require('./dialog');

var _dialog2 = _interopRequireDefault(_dialog);

require('./rodal.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

/* ===============================
 * Rodal v1.2.0 http://rodal.cn
 * =============================== */

/**
 * Rodal Component
 */

var Rodal = (function (_React$Component) {
    _inherits(Rodal, _React$Component);

    function Rodal(props) {
        _classCallCheck(this, Rodal);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Rodal).call(this, props));
    }

    _createClass(Rodal, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.transitionEnd = this.transitionEnd.bind(this);
            _animationEvents2.default.addEndEventListener(_reactDom2.default.findDOMNode(this), this.transitionEnd);

            if (this.props.visible) {
                this.enter();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _animationEvents2.default.removeEndEventListener(_reactDom2.default.findDOMNode(this), this.transitionEnd);
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
        }
    }, {
        key: 'transitionEnd',
        value: function transitionEnd(e) {
            var node = _reactDom2.default.findDOMNode(this);
            if (e && e.target !== node) {
                return;
            }

            if (this.state.animationType === 'leave') {
                this.setState({ isShow: false });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props;
            var duration = _props.duration;
            var showMask = _props.showMask;
            var onClose = _props.onClose;
            var children = _props.children;
            var _state = this.state;
            var isShow = _state.isShow;
            var animationType = _state.animationType;

            var mask = showMask ? _react2.default.createElement('div', { className: 'rodal-mask', onClick: onClose }) : null;

            var style = {
                display: isShow ? 'block' : 'none',
                animationDuration: duration + 'ms',
                WebkitAnimationDuration: duration + 'ms'
            };

            return _react2.default.createElement('div', { style: style, className: "rodal rodal-fade-" + animationType }, mask, _react2.default.createElement(_dialog2.default, _extends({}, this.props, { animationType: animationType }), children));
        }
    }]);

    return Rodal;
})(_react2.default.Component);

Rodal.propTypes = {
    visible: _react.PropTypes.bool,
    onClose: _react.PropTypes.func.isRequired,
    animation: _react.PropTypes.string,
    duration: _react.PropTypes.number,
    showMask: _react.PropTypes.bool,
    showCloseButton: _react.PropTypes.bool
};
Rodal.defaultProps = {
    visible: false,
    animation: 'zoom',
    duration: 300,
    showMask: true,
    showCloseButton: true
};
Rodal.state = {
    isShow: false,
    animationType: 'leave'
};
exports.default = Rodal;