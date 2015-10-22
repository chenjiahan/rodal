/* ===============================
 * Rodal v1.1.1 http://rodal.cn
 * =============================== */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

/**
 * Props
 */
const propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    animation: PropTypes.string,
    duration: PropTypes.number,
    showMask: PropTypes.bool,
    showCloseButton: PropTypes.bool,
    autoClose: PropTypes.number
};
const defaultProps = {
    visible: false,
    animation: 'zoom',
    duration: 300,
    showMask: true,
    showCloseButton: true
};



/**
 * detect animation events
 */
let endEvents = [];
let EVENT_NAME_MAP = {
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
(() => {
    let testEl = document.createElement('div');
    let style = testEl.style;

    if (!('AnimationEvent' in window)) {
        delete EVENT_NAME_MAP.animationend.animation;
    }

    if (!('TransitionEvent' in window)) {
        delete EVENT_NAME_MAP.transitionend.transition;
    }

    for (let baseEventName in EVENT_NAME_MAP) {
        let baseEvents = EVENT_NAME_MAP[baseEventName];
        for (let styleName in baseEvents) {
            if (styleName in style) {
                endEvents.push(baseEvents[styleName]);
                break;
            }
        }
    }
})();
const TransitionEvents =  {
    addEndEventListener: (node, eventListener) => {
        if (endEvents.length === 0) {
            window.setTimeout(eventListener, 0);
            return;
        }
        endEvents.forEach( endEvent => {
            node.addEventListener(endEvent, eventListener, false);
        });
    },
    removeEndEventListener: (node, eventListener) => {
        if (endEvents.length === 0) {
            return;
        }
        endEvents.forEach( endEvent => {
            node.removeEventListener(endEvent, eventListener, false);
        });
    }
};

/**
 * Modal Component
 */
const Modal = (props) => {
    const style = {
        animationDuration: props.duration + 'ms',
        WebkitAnimationDuration: props.duration + 'ms'
    };

    const className = `rodal-box rodal-${props.animation}-${props.animationType}`;

    const CloseButton = props.showCloseButton ?
        <span className="rodal-close" onClick={props.onClose} /> :
        null;

    return (
        <div style={style} className={className}>
            {CloseButton}
            {props.children}
        </div>
    )
};

/**
 * Mask Component
 */
const Mask = ({onClose}) => (
    <div className="rodal-mask" onClick={onClose} />
);

/**
 * Rodal Component
 */
class Rodal extends Component {

    constructor (props) {
        super(props);

        this.state = {
            isShow: this.props.visible,
            animationType: this.props.visible ? 'enter' : 'leave'
        };
    }

    componentDidMount () {
        TransitionEvents.addEndEventListener (
            ReactDOM.findDOMNode(this),
            this.transitionEnd.bind(this)
        );
    }

    componentWillUnmount () {
        TransitionEvents.removeEndEventListener (
            ReactDOM.findDOMNode(this),
            this.transitionEnd
        );
    }

    componentWillReceiveProps (nextProps) {
        if (!this.props.visible && nextProps.visible) {
            this.enter();
        } else if (this.props.visible && !nextProps.visible) {
            this.leave();
        }
    }

    enter () {
        this.setState({
            isShow: true,
            animationType: 'enter'
        });
    }

    leave () {
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

    transitionEnd (e) {
        const node = ReactDOM.findDOMNode(this);
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

    handleKeyDown (e) {
        //Escape
        if (e.keyCode === 27) {
            this.props.onClose();
        }
    }

    render () {

        const style = {
            display: this.state.isShow ? 'block' : 'none',
            animationDuration: this.props.duration + 'ms',
            WebkitAnimationDuration: this.props.duration + 'ms'
        };

        const animationType = this.state.animationType;

        const showMask = this.props.showMask ? <Mask onClose={this.props.onClose} /> : null;

        const autoClose = this.props.autoClose;
        if ( typeof autoClose === 'number' && animationType === 'enter' ) {
            this.autoClose = setTimeout( function() {
                this.props.onClose();
            }.bind(this), autoClose );
        } else if (this.autoClose !== undefined) {
            clearTimeout(this.autoClose);
        }

        return (
            <div
                style={style}
                className={"rodal rodal-fade-" + animationType}
                onKeyDown={this.handleKeyDown.bind(this)}
                tabIndex={-1}
            >
                {showMask}
                <Modal {...this.props} animationType={animationType}>
                    {this.props.children}
                </Modal>
            </div>
        )
    }
}

Rodal.propTypes = propTypes;
Rodal.defaultProps = defaultProps;

export default Rodal;