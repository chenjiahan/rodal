'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* ===============================
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Rodal v1.3.2 http://rodal.cn
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * =============================== */

var PropTypes = _react2.default.PropTypes;
var Component = _react2.default.Component;

var propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    onClose: PropTypes.func.isRequired,
    visible: PropTypes.bool,
    showMask: PropTypes.bool,
    showCloseButton: PropTypes.bool,
    animation: PropTypes.string,
    duration: PropTypes.number,
    measure: PropTypes.string,
    customStyles: PropTypes.object
};

var defaultProps = {
    width: 400,
    height: 240,
    measure: 'px',
    visible: false,
    showMask: true,
    showCloseButton: true,
    animation: 'zoom',
    duration: 300,
    customStyles: {}
};

var Dialog = function Dialog(props) {

    var className = 'rodal-dialog rodal-' + props.animation + '-' + props.animationType;
    var CloseButton = props.showCloseButton ? _react2.default.createElement('span', { className: 'rodal-close', onClick: props.onClose }) : null;
    var width = props.width;
    var height = props.height;
    var measure = props.measure;
    var duration = props.duration;
    var customStyles = props.customStyles;

    var style = {
        width: width + measure,
        height: height + measure,
        marginTop: -height / 2 + measure,
        marginLeft: -width / 2 + measure,
        animationDuration: duration + 'ms',
        WebkitAnimationDuration: duration + 'ms'
    };
    console.log('customStyles');
    console.log(customStyles);
    // es7
    //const mergedStyles = {...style, ...customStyles}
    var mergedStyles = Object.assign(style, customStyles);
    console.log('mergedStyles');
    console.log(mergedStyles);
    return _react2.default.createElement(
        'div',
        { style: mergedStyles, className: className },
        CloseButton,
        props.children
    );
};

var Rodal = function (_Component) {
    _inherits(Rodal, _Component);

    function Rodal(props) {
        _classCallCheck(this, Rodal);

        var _this = _possibleConstructorReturn(this, (Rodal.__proto__ || Object.getPrototypeOf(Rodal)).call(this, props));

        _this.animationEnd = _this.animationEnd.bind(_this);
        _this.state = {
            isShow: false,
            animationType: 'leave'
        };
        return _this;
    }

    _createClass(Rodal, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.visible) {
                this.enter();
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
            this.setState({
                animationType: 'leave'
            });
        }
    }, {
        key: 'animationEnd',
        value: function animationEnd() {
            if (this.state.animationType === 'leave') {
                this.setState({
                    isShow: false
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var mask = this.props.showMask ? _react2.default.createElement('div', { className: 'rodal-mask', onClick: this.props.onClose }) : null;
            var style = {
                display: this.state.isShow ? 'block' : 'none',
                WebkitAnimationDuration: this.props.duration + 'ms',
                animationDuration: this.props.duration + 'ms'
            };

            return _react2.default.createElement(
                'div',
                { style: style, className: "rodal rodal-fade-" + this.state.animationType, onAnimationEnd: this.animationEnd },
                mask,
                _react2.default.createElement(
                    Dialog,
                    _extends({}, this.props, { animationType: this.state.animationType }),
                    this.props.children
                )
            );
        }
    }]);

    return Rodal;
}(Component);

Rodal.propTypes = propTypes;
Rodal.defaultProps = defaultProps;

exports.default = Rodal;
