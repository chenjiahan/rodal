/* ===============================
 * Rodal v1.0.9 http://rodal.cn
 * =============================== */

import React, { Component, PropTypes } from 'react';

const propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    animation: PropTypes.string,
    duration: PropTypes.number,
    showMask: PropTypes.bool,
    showCloseButton: PropTypes.bool
};

const defaultProps = {
    visible: false,
    animation: 'zoom',
    duration: 300,
    showMask: true,
    showCloseButton: true
};

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

let endEvents = [];

//detect events
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

class RodalBox extends Component {

    render () {

        const style = {
            animationDuration: this.props.duration + 'ms',
            WebkitAnimationDuration: this.props.duration + 'ms'
        };

        const className = `rodal-box rodal-${this.props.animation}-${this.props.animationState}`;

        const CloseButton = this.props.showCloseButton ? <span className="rodal-close" onClick={this.props.onClose} /> : null;

        return (
            <div style={style} className={className}>
                {CloseButton}
                {this.props.children}
            </div>
        )
    }
}

class Rodal extends Component {

    constructor (props) {
        super(props);

        this.state = {
            isShow: this.props.visible,
            animationState: this.props.visible ? 'enter' : 'leave'
        };

        this.now = Date.now || (() => { return new Date().getTime() });
    }

    componentDidMount () {
        const node = React.findDOMNode(this);
        TransitionEvents.addEndEventListener(node, this.transitionEnd.bind(this));
    }

    componentWillUnmount () {
        const node = React.findDOMNode(this);
        TransitionEvents.removeEndEventListener(node, this.transitionEnd);
    }

    componentWillReceiveProps (nextProps) {
        if (!this.props.visible && nextProps.visible) {
            this.fadeIn();
        } else if (this.props.visible && !nextProps.visible) {
            this.fadeOut();
        }
    }

    fadeIn () {
        this.setState({
            isShow: true,
            animationState: 'enter'
        });
    }

    fadeOut () {
        this.setState({
            animationState: 'leave'
        });

        //IE9
        if (endEvents.length === 0) {
            this.setState({
                isShow: false
            });
        }
    }

    transitionEnd (e) {
        const node = React.findDOMNode(this);
        if (e && e.target !== node) {
            return;
        }
        const state = this.state.animationState;
        if (state === 'enter') {
            this.refs['rodal'].getDOMNode().focus();
        } else {
            this.setState({
                isShow: false
            });
        }
    }

    handleKeyDown () {
        //Escape
        event.keyCode === 27 && this.props.onClose();
    }

    render () {

        const style = {
            display: this.state.isShow ? 'block' : 'none',
            animationDuration: this.props.duration + 'ms',
            WebkitAnimationDuration: this.props.duration + 'ms'
        };

        const Mask = this.props.showMask ? <div className="rodal-mask" onClick={this.props.onClose} /> : null;

        return (
            <div
                ref="rodal"
                style={style}
                className={"rodal rodal-fade-" + this.state.animationState}
                onKeyDown={this.handleKeyDown.bind(this)}
                tabIndex={-1}
            >
                {Mask}
                <RodalBox {...this.props} animationState={this.state.animationState}>
                    {this.props.children}
                </RodalBox>
            </div>
        )
    }
}

Rodal.propTypes = propTypes;
Rodal.defaultProps = defaultProps;

export default Rodal;