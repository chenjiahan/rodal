'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* ===============================
                                                                                                                                                                                                                                                                   * Rodal v1.7.0 https://chenjiahan.github.com/rodal
                                                                                                                                                                                                                                                                   * =============================== */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// env
var IN_BROWSER = typeof window !== 'undefined';
var UA = IN_BROWSER && window.navigator.userAgent.toLowerCase();
var IS_IE_9 = UA && UA.indexOf('msie 9.0') > 0;

var Dialog = function Dialog(props) {
    var animation = (props.animationType === 'enter' ? props.enterAnimation : props.leaveAnimation) || props.animation;
    var className = 'rodal-dialog rodal-' + animation + '-' + props.animationType;
    var CloseButton = props.showCloseButton ? _react2.default.createElement('span', { className: 'rodal-close', onClick: props.onClose }) : null;
    var width = props.width,
        height = props.height,
        measure = props.measure,
        duration = props.duration,
        customStyles = props.customStyles;

    var style = {
        width: width + measure,
        height: height + measure,
        animationDuration: duration + 'ms',
        WebkitAnimationDuration: duration + 'ms'
    };
    var mergedStyles = _extends({}, style, customStyles);

    return _react2.default.createElement(
        'div',
        { style: mergedStyles, className: className },
        props.children,
        CloseButton
    );
};

var Rodal = function (_React$Component) {
    _inherits(Rodal, _React$Component);

    function Rodal() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Rodal);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Rodal.__proto__ || Object.getPrototypeOf(Rodal)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            isShow: false,
            animationType: 'leave'
        }, _this.onKeyUp = function (event) {
            if (!_this.props.closeOnEsc || event.keyCode !== 27) {
                return;
            }

            _this.props.onClose();
        }, _this.animationEnd = function (event) {
            var animationType = _this.state.animationType;
            var _this$props = _this.props,
                closeOnEsc = _this$props.closeOnEsc,
                onAnimationEnd = _this$props.onAnimationEnd;


            if (animationType === 'leave') {
                _this.setState({ isShow: false });
            } else if (closeOnEsc) {
                _this.el.focus();
            }

            if (event.target === _this.el && onAnimationEnd) {
                onAnimationEnd();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Rodal, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.visible) {
                this.enter();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (this.props.visible && !prevProps.visible) {
                this.enter();
            }

            if (!this.props.visible && prevProps.visible) {
                this.leave();
            }
        }
    }, {
        key: 'enter',
        value: function enter() {
            this.setState({ isShow: true, animationType: 'enter' });
        }
    }, {
        key: 'leave',
        value: function leave() {
            this.setState(IS_IE_9 ? { isShow: false } : { animationType: 'leave' });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                closeMaskOnClick = _props.closeMaskOnClick,
                onClose = _props.onClose,
                customMaskStyles = _props.customMaskStyles,
                showMask = _props.showMask,
                duration = _props.duration,
                className = _props.className,
                children = _props.children;
            var _state = this.state,
                isShow = _state.isShow,
                animationType = _state.animationType;

            var mask = showMask ? _react2.default.createElement('div', {
                className: 'rodal-mask',
                style: customMaskStyles,
                onClick: closeMaskOnClick ? onClose : void 0
            }) : null;
            var style = {
                display: isShow ? '' : 'none',
                animationDuration: duration + 'ms',
                WebkitAnimationDuration: duration + 'ms'
            };

            return _react2.default.createElement(
                'div',
                {
                    style: style,
                    className: (0, _classnames2.default)('rodal', 'rodal-fade-' + animationType, className),
                    onAnimationEnd: this.animationEnd,
                    tabIndex: '-1',
                    ref: function ref(el) {
                        _this2.el = el;
                    },
                    onKeyUp: this.onKeyUp
                },
                mask,
                _react2.default.createElement(
                    Dialog,
                    _extends({}, this.props, { animationType: animationType }),
                    children
                )
            );
        }
    }]);

    return Rodal;
}(_react2.default.Component);

Rodal.propTypes = {
    width: _propTypes2.default.number,
    height: _propTypes2.default.number,
    measure: _propTypes2.default.string,
    visible: _propTypes2.default.bool,
    showMask: _propTypes2.default.bool,
    closeOnEsc: _propTypes2.default.bool,
    closeMaskOnClick: _propTypes2.default.bool,
    showCloseButton: _propTypes2.default.bool,
    animation: _propTypes2.default.string,
    enterAnimation: _propTypes2.default.string,
    leaveAnimation: _propTypes2.default.string,
    duration: _propTypes2.default.number,
    className: _propTypes2.default.string,
    customStyles: _propTypes2.default.object,
    customMaskStyles: _propTypes2.default.object,
    onClose: _propTypes2.default.func.isRequired,
    onAnimationEnd: _propTypes2.default.func
};
Rodal.defaultProps = {
    width: 400,
    height: 240,
    measure: 'px',
    visible: false,
    showMask: true,
    closeOnEsc: false,
    closeMaskOnClick: true,
    showCloseButton: true,
    animation: 'zoom',
    enterAnimation: '',
    leaveAnimation: '',
    duration: 300,
    className: '',
    customStyles: {},
    customMaskStyles: {}
};
exports.default = Rodal;
