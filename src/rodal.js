/* ===============================
 * Rodal v1.1.2 http://rodal.cn
 * =============================== */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import './rodal.scss';

/**
 * detect animation events
 */
let endEvents = [];
let EVENT_NAME_MAP = {
    transitionend: {
              'transition' :       'transitionend',
             'OTransition' :      'oTransitionEnd',
            'msTransition' :     'MSTransitionEnd',
           'MozTransition' :    'mozTransitionEnd',
        'WebkitTransition' : 'webkitTransitionEnd'
    },

    animationend: {
              'animation' :       'animationend',
             'OAnimation' :      'oAnimationEnd',
            'msAnimation' :     'MSAnimationEnd',
           'MozAnimation' :    'mozAnimationEnd',
        'WebkitAnimation' : 'webkitAnimationEnd'
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
        endEvents.forEach(endEvent => {
            node.addEventListener(endEvent, eventListener, false);
        });
    },
    removeEndEventListener: (node, eventListener) => {
        if (endEvents.length === 0) {
            return;
        }
        endEvents.forEach(endEvent => {
            node.removeEventListener(endEvent, eventListener, false);
        });
    }
};

/**
 * Modal Component
 */
const Modal = props => {
    const { animation, animationType, onClose, children } = props;
    const className = `rodal-box rodal-${animation}-${animationType}`;
    const CloseButton = props.showCloseButton ? <span className="rodal-close" onClick={onClose} /> : null;
    const style = {
        animationDuration       : props.duration + 'ms',
        WebkitAnimationDuration : props.duration + 'ms'
    };

    return (
        <div style={style} className={className}>
            {CloseButton}
            {children}
        </div>
    )
};

/**
 * Mask Component
 */
const Mask = ({ onClose }) => (
    <div className="rodal-mask" onClick={onClose} />
);

/**
 * Rodal Component
 */
class Rodal extends Component {

    static defaultProps = {
        visible         : false,
        animation       : 'zoom',
        duration        : 300,
        showMask        : true,
        showCloseButton : true
    };

    static propTypes = {
        visible         : PropTypes.bool,
        onClose         : PropTypes.func.isRequired,
        animation       : PropTypes.string,
        duration        : PropTypes.number,
        showMask        : PropTypes.bool,
        showCloseButton : PropTypes.bool,
        autoClose       : PropTypes.number
    };

    constructor (props) {
        super(props);

        const visible = props.visible;
        this.state = {
            isShow: visible,
            animationType: visible ? 'enter' : 'leave'
        };
    }

    componentDidMount () {
        TransitionEvents.addEndEventListener(
            ReactDOM.findDOMNode(this),
            this.transitionEnd.bind(this)
        );
    }

    componentWillUnmount () {
        TransitionEvents.removeEndEventListener(
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
        this.setState({ animationType: 'leave' });

        //IE9
        if (endEvents.length === 0) {
            this.setState({ isShow: false });
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
            this.setState({ isShow: false });
        }
    }

    handleKeyDown (e) {
        //Escape
        if (e.keyCode === 27) {
            this.props.onClose();
        }
    }

    render () {
        const { duration, showMask, autoClose, onClose, children } = this.props;
        const { isShow, animationType } = this.state;
        const mask = showMask ? <Mask onClose={onClose} /> : null;
        const style = {
            display                 : isShow ? 'block' : 'none',
            animationDuration       : duration + 'ms',
            WebkitAnimationDuration : duration + 'ms'
        };

        if (autoClose && animationType === 'enter') {
            this.autoClose = setTimeout(() => {
                onClose();
            }, autoClose);
        }

        return (
            <div style={style}
                 className={"rodal rodal-fade-" + animationType}
                 onKeyDown={this.handleKeyDown.bind(this)}
                 tabIndex={-1}
            >
                {mask}
                <Modal {...this.props} animationType={animationType}>
                    {children}
                </Modal>
            </div>
        )
    }
}

export default Rodal;