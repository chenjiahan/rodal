/* ===============================
 * Rodal v1.7.0 https://chenjiahan.github.com/rodal
 * =============================== */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// env
const IN_BROWSER = typeof window !== 'undefined';
const UA = IN_BROWSER && window.navigator.userAgent.toLowerCase();
const IS_IE_9 = UA && UA.indexOf('msie 9.0') > 0;

const Dialog = props => {
  const animation =
    (props.animationType === 'enter'
      ? props.enterAnimation
      : props.leaveAnimation) || props.animation;

  const className = `rodal-dialog rodal-${animation}-${props.animationType}`;

  const CloseButton = props.showCloseButton ? (
    <span
      className="rodal-close"
      onClick={props.onClose}
      onKeyPress={event => {
        if (props.onClose && event.which === 13) {
          props.onClose(event);
        }
      }}
      tabIndex={0}
    />
  ) : null;

  const { width, height, measure, duration, customStyles, id } = props;

  const style = {
    width: width + measure,
    height: height + measure,
    animationDuration: duration + 'ms',
    WebkitAnimationDuration: duration + 'ms'
  };

  const mergedStyles = { ...style, ...customStyles };

  return (
    <div style={mergedStyles} className={className} id={id}>
      {props.children}
      {CloseButton}
    </div>
  );
};

class Rodal extends React.Component {
  static propTypes = {
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
    onAnimationEnd: PropTypes.func,
    id:PropTypes.string
  };

  static defaultProps = {
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

  state = {
    isShow: false,
    animationType: 'leave'
  };

  componentDidMount() {
    if (this.props.visible) {
      this.enter();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible && !prevProps.visible) {
      this.enter();
    }

    if (!this.props.visible && prevProps.visible) {
      this.leave();
    }
  }

  enter() {
    this.setState({ isShow: true, animationType: 'enter' });
  }

  leave() {
    this.setState(IS_IE_9 ? { isShow: false } : { animationType: 'leave' });
  }

  onKeyUp = event => {
    if (!this.props.closeOnEsc || event.keyCode !== 27) {
      return;
    }

    this.props.onClose(event);
  };

  animationEnd = event => {
    const { animationType } = this.state;
    const { closeOnEsc, onAnimationEnd } = this.props;

    if (animationType === 'leave') {
      this.setState({ isShow: false });
    } else if (closeOnEsc) {
      this.el.focus();
    }

    if (event.target === this.el && onAnimationEnd) {
      onAnimationEnd();
    }
  };

  render() {
    const {
      closeMaskOnClick,
      onClose,
      customMaskStyles,
      showMask,
      duration,
      className,
      children
    } = this.props;

    const { isShow, animationType } = this.state;

    const Mask = showMask ? (
      <div
        className="rodal-mask"
        style={customMaskStyles}
        onClick={closeMaskOnClick ? onClose : void 0}
      />
    ) : null;

    const style = {
      display: isShow ? '' : 'none',
      animationDuration: duration + 'ms',
      WebkitAnimationDuration: duration + 'ms'
    };

    return (
      <div
        style={style}
        className={cx('rodal', `rodal-fade-${animationType}`, className)}
        onAnimationEnd={this.animationEnd}
        tabIndex="-1"
        ref={el => {
          this.el = el;
        }}
        onKeyUp={this.onKeyUp}
      >
        {Mask}
        <Dialog {...this.props} animationType={animationType}>
          {children}
        </Dialog>
      </div>
    );
  }
}

export default Rodal;
