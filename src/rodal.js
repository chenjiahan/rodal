import React, { Component, PropTypes } from 'react';
import './rodal.scss';

class RodalBox extends Component {

    shouldComponentUpdate (nextProps) {
        const props = this.props;
        if (props.onClose !== nextProps.onClose) { return true }
        if (props.animation !== nextProps.animation) { return true }
        if (props.showCloseButton !== nextProps.showCloseButton) { return true }
        if (props.duration !== nextProps.duration) { return true }
        return false;
    }

    render () {

        let style = {
            animationDuration: this.props.duration + 'ms',
            WebkitAnimationDuration: this.props.duration + 'ms'
        };

        return (
            <div className={"rodal-box " + this.props.animation} style={style}>
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

    shouldComponentUpdate (nextProps) {
        if(this.props.onClose !== nextProps.onClose) { return true }
        return false;
    }

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

        this.state = {
            opacity: 0,
            isShow: 'none'
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
            animation: 'rodal-' + this.props.animation + '-enter',
            isShow: 'block'
        });

        let opacity = 0;
        let last = this.now();
        const duration = this.props.duration;
        const interval = duration / 20;
        const tick = function () {
            opacity = opacity + (this.now() - last) / duration;
            last = this.now();
            this.setState({ opacity: opacity });
            if (opacity < 1) {
                setTimeout(tick, interval);
            }
        }.bind(this);
        tick();
    }

    fadeOut () {

        this.setState({
            animation: 'rodal-' + this.props.animation + '-leave'
        });

        let opacity = 1;
        let last = this.now();
        const duration = this.props.duration;
        const interval = duration / 20;
        const tick = function () {
            opacity = opacity - (this.now() - last) / duration;
            last = this.now();
            this.setState({ opacity: opacity });
            if (opacity > 0) {
                setTimeout(tick, interval);
            } else {
                this.setState({ isShow: 'none' })
            }
        }.bind(this);
        tick();
    }

    render () {

        const style = {
            display: this.state.isShow,
            opacity: this.state.opacity
        };

        return (
            <div className="rodal" style={style}>
                <RodalMask onClose={this.props.onClose} />
                <RodalBox {...this.props} animation={this.state.animation}>
                    {this.props.children}
                </RodalBox>
            </div>
        )
    }
}

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
    animation: 'alert',
    duration: 200
};

Rodal.propTypes = propTypes;
Rodal.defaultProps = defaultProps;

export default Rodal;