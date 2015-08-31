import React, { Component, PropTypes } from 'react';
import TransitionEvents from './ReactTransitionEvents';
import './rodal.scss';

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

class RodalBox extends Component {

    render () {

        const style = {
            animationDuration: this.props.duration + 'ms',
            WebkitAnimationDuration: this.props.duration + 'ms'
        };

        const className = "rodal-box rodal-" + this.props.animation + "-" + this.props.animationState;

        return (
            <div ref="box" style={style} className={className}>
                <span
                    className="rodal-close"
                    onClick={this.props.onClose}
                    style={{ display: this.props.showCloseButton ? 'block' : 'none' }}
                />
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

    componentWillUnmount() {
        const node = React.findDOMNode(this);
        TransitionEvents.removeEndEventListener(node, this.transitionEnd.bind(this));
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
        this.setState({ animationState: 'leave' });
    }

    transitionEnd (e) {
        const node = React.findDOMNode(this);
        if (e && e.target !== node) {
            return;
        }
        if(this.state.animationState === 'leave') {
            this.setState({
                isShow: false
            });
        }
    }

    render () {

        const style = {
            display: this.state.isShow ? 'block' : 'none',
            animationDuration: this.props.duration + 'ms',
            WebkitAnimationDuration: this.props.duration + 'ms'
        };

        return (
            <div className={"rodal rodal-fade-" + this.state.animationState} style={style}>
                <div
                    className="rodal-mask"
                    onClick={this.props.onClose}
                    style={{display: this.props['showMask'] ? 'block' : 'none'}}
                />
                <RodalBox
                    {...this.props}
                    animation={this.props.animation}
                    animationState={this.state.animationState}
                >
                    {this.props.children}
                </RodalBox>
            </div>
        )
    }
}

Rodal.propTypes = propTypes;
Rodal.defaultProps = defaultProps;

export default Rodal;