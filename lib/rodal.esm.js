function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* ===============================
 * Rodal v1.7.0 https://chenjiahan.github.com/rodal
 * =============================== */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames'; // env

var IN_BROWSER = typeof window !== 'undefined';
var UA = IN_BROWSER && window.navigator.userAgent.toLowerCase();
var IS_IE_9 = UA && UA.indexOf('msie 9.0') > 0;

var Dialog = function Dialog(props) {
  var animation = (props.animationType === 'enter' ? props.enterAnimation : props.leaveAnimation) || props.animation;
  var className = "rodal-dialog rodal-" + animation + "-" + props.animationType;
  var CloseButton = props.showCloseButton ? React.createElement("span", {
    className: "rodal-close",
    onClick: props.onClose,
    onKeyPress: function onKeyPress(event) {
      if (props.onClose && event.which === 13) {
        props.onClose(event);
      }
    },
    tabIndex: 0
  }) : null;
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

  var mergedStyles = _extends({}, style, {}, customStyles);

  return React.createElement("div", {
    style: mergedStyles,
    className: className
  }, props.children, CloseButton);
};

var Rodal =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Rodal, _React$Component);

  function Rodal() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      isShow: false,
      animationType: 'leave'
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyUp", function (event) {
      if (!_this.props.closeOnEsc || event.keyCode !== 27) {
        return;
      }

      _this.props.onClose(event);
    });

    _defineProperty(_assertThisInitialized(_this), "animationEnd", function (event) {
      var animationType = _this.state.animationType;
      var _this$props = _this.props,
          closeOnEsc = _this$props.closeOnEsc,
          onAnimationEnd = _this$props.onAnimationEnd;

      if (animationType === 'leave') {
        _this.setState({
          isShow: false
        });
      } else if (closeOnEsc) {
        _this.el.focus();
      }

      if (event.target === _this.el && onAnimationEnd) {
        onAnimationEnd();
      }
    });

    return _this;
  }

  var _proto = Rodal.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (this.props.visible) {
      this.enter();
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props.visible && !prevProps.visible) {
      this.enter();
    }

    if (!this.props.visible && prevProps.visible) {
      this.leave();
    }
  };

  _proto.enter = function enter() {
    this.setState({
      isShow: true,
      animationType: 'enter'
    });
  };

  _proto.leave = function leave() {
    this.setState(IS_IE_9 ? {
      isShow: false
    } : {
      animationType: 'leave'
    });
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        closeMaskOnClick = _this$props2.closeMaskOnClick,
        onClose = _this$props2.onClose,
        customMaskStyles = _this$props2.customMaskStyles,
        showMask = _this$props2.showMask,
        duration = _this$props2.duration,
        className = _this$props2.className,
        children = _this$props2.children;
    var _this$state = this.state,
        isShow = _this$state.isShow,
        animationType = _this$state.animationType;
    var Mask = showMask ? React.createElement("div", {
      className: "rodal-mask",
      style: customMaskStyles,
      onClick: closeMaskOnClick ? onClose : void 0
    }) : null;
    var style = {
      display: isShow ? '' : 'none',
      animationDuration: duration + 'ms',
      WebkitAnimationDuration: duration + 'ms'
    };
    return React.createElement("div", {
      style: style,
      className: cx('rodal', "rodal-fade-" + animationType, className),
      onAnimationEnd: this.animationEnd,
      tabIndex: "-1",
      ref: function ref(el) {
        _this2.el = el;
      },
      onKeyUp: this.onKeyUp
    }, Mask, React.createElement(Dialog, _extends({}, this.props, {
      animationType: animationType
    }), children));
  };

  return Rodal;
}(React.Component);

_defineProperty(Rodal, "propTypes", {
  width: PropTypes.number,
  height: PropTypes.number,
  measure: PropTypes.string,
  visible: PropTypes.bool,
  showMask: PropTypes.bool,
  closeOnEsc: PropTypes.bool,
  closeMaskOnClick: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  animation: PropTypes.string,
  enterAnimation: PropTypes.string,
  leaveAnimation: PropTypes.string,
  duration: PropTypes.number,
  className: PropTypes.string,
  customStyles: PropTypes.object,
  customMaskStyles: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onAnimationEnd: PropTypes.func
});

_defineProperty(Rodal, "defaultProps", {
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
});

export default Rodal;
