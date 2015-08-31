import React, { Component, PropTypes } from 'react';
import Transition from './transition';
import './rodal.scss';

const propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    showCloseButton: PropTypes.bool,
    animation: PropTypes.string,
    duration: PropTypes.number
};

const defaultProps = {
    visible: false,
    showCloseButton: true,
    animation: 'zoom',
    duration: 300
};

class RodalBox extends Component {

    render () {

        let style = {
            animationDuration: this.props.duration + 'ms',
            WebkitAnimationDuration: this.props.duration + 'ms'
        };

        return (
            <div
                ref="box"
                className={"rodal-box rodal-" + this.props.animation + "-" + this.props.animationState}
                style={style}
            >
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

class RodalMask extends Component {

    render () {
        return (
            <div
                className="rodal-mask"
                onClick={this.props.onClose}
            />
        )
    }
}

class Rodal extends Component {

    constructor (props) {
        super(props);

        //initial state
        this.state = {
            isShow: this.props.visible,
            animationState: this.props.visible ? 'enter' : 'leave'
        };

        this.now = Date.now || (() => { return new Date().getTime() });
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
            animationState: 'enter',
            isShow: true
        });
    }

    fadeOut () {
        this.setState({
            animationState: 'leave'
        });
    }

    transitionEnd () {
        let node = this.refs["rodal"].getDOMNode();
        var endListener = function(e) {
            if (e && e.target !== node) {
                return;
            }
            this.setState({
                animationState: 'enter',
                isShow: false
            });
            Transition.removeEndEventListener(node, endListener);

        }.bind(this);
        Transition.addEndEventListener(node, endListener);
    }

    render () {
        if(!this.state.isShow) return null;

        const style = {
            animationDuration: this.props.duration + 'ms',
            WebkitAnimationDuration: this.props.duration + 'ms'
        };
        if(this.state.animationState === 'leave') {
            this.transitionEnd();
        }
        return (
            <div ref="rodal" className={"rodal rodal-fade-" + this.state.animationState} style={style}>
                <RodalMask onClose={this.props.onClose} />
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