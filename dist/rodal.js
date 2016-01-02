'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

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

require('./rodal.css');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} /* ===============================
   * Rodal v1.2.6 http://rodal.cn
   * =============================== */

var propTypes = {
    width: _react.PropTypes.number,
    height: _react.PropTypes.number,
    onClose: _react.PropTypes.func.isRequired,
    visible: _react.PropTypes.bool,
    showMask: _react.PropTypes.bool,
    showCloseButton: _react.PropTypes.bool,
    animation: _react.PropTypes.string,
    duration: _react.PropTypes.number
};

var defaultProps = {
    width: 400,
    height: 240,
    visible: false,
    showMask: true,
    showCloseButton: true,
    animation: 'zoom',
    duration: 300
};

/**
 * Rodal Component
 */

var Rodal = (function (_React$Component) {
    _inherits(Rodal, _React$Component);

    function Rodal(props) {
        _classCallCheck(this, Rodal);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Rodal).call(this, props));

        _this.state = {
            isShow: false,
            animationType: 'leave'
        };
        return _this;
    }

    /**
     * add animation event listener
     */

    _createClass(Rodal, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.animationEvents = (0, _animationEvents2.default)(_reactDom2.default.findDOMNode(this), this.animationEnd.bind(this));

            if (this.props.visible) {
                this.enter();
            }
        }

        /**
         * remove animation event listener
         */

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.animationEvents) {
                this.animationEvents.remove();
            }
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
            if (this.animationEvents) {
                this.setState({
                    animationType: 'leave'
                });
            } else {
                this.setState({
                    isShow: false
                });
            }
        }
    }, {
        key: 'animationEnd',
        value: function animationEnd(e) {
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
                WebkitAnimationDuration: duration + 'ms',
                animationDuration: duration + 'ms'
            };

            return _react2.default.createElement('div', { style: style, className: "rodal rodal-fade-" + animationType }, mask, _react2.default.createElement(_dialog2.default, _extends({}, this.props, { animationType: animationType }), children));
        }
    }]);

    return Rodal;
})(_react2.default.Component);

Rodal.propTypes = propTypes;
Rodal.defaultProps = defaultProps;

exports.default = Rodal;