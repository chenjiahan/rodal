/* ===============================
 * Rodal v1.3.5 http://rodal.cn
 * =============================== */

import React from 'react';

const { PropTypes, Component } = React;
const propTypes = {
    width            : PropTypes.number,
    height           : PropTypes.number,
    measure          : PropTypes.string,
    visible          : PropTypes.bool,
    showMask         : PropTypes.bool,
    showCloseButton  : PropTypes.bool,
    animation        : PropTypes.string,
    duration         : PropTypes.number,
    className        : PropTypes.string,
    customStyles     : PropTypes.object,
    customMaskStyles : PropTypes.object,
    onClose          : PropTypes.func.isRequired
};

const defaultProps = {
    width            : 400,
    height           : 240,
    measure          : 'px',
    visible          : false,
    showMask         : true,
    showCloseButton  : true,
    animation        : 'zoom',
    duration         : 300,
    className        : '',
    customStyles     : {},
    customMaskStyles : {},
};

const Dialog = props => {

    const className = `rodal-dialog rodal-${props.animation}-${props.animationType}`;
    const CloseButton = props.showCloseButton ? <span className="rodal-close" onClick={props.onClose} /> : null;
    const { width, height, measure, duration, customStyles } = props;
    const style = {
        width                   : width + measure,
        height                  : height + measure,
        animationDuration       : duration + 'ms',
        WebkitAnimationDuration : duration + 'ms'
    };

    const mergedStyles = Object.assign(style, customStyles)

    return (
        <div style={mergedStyles} className={className}>
            {CloseButton}
            {props.children}
        </div>
    )
};

class Rodal extends Component {

    constructor(props) {
        super(props);

        this.animationEnd = this.animationEnd.bind(this);
        this.state = {
            isShow        : false,
            animationType : 'leave'
        };
    }

    componentDidMount() {
        if (this.props.visible) {
            this.enter();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.visible && nextProps.visible) {
            this.enter();
        } else if (this.props.visible && !nextProps.visible) {
            this.leave();
        }
    }

    enter() {
        this.setState({
            isShow: true,
            animationType: 'enter'
        });
    }

    leave() {
        this.setState({
            animationType: 'leave'
        });
    }

    animationEnd() {
        if (this.state.animationType === 'leave') {
            this.setState({
                isShow: false
            });
        }
    }

    render() {
        const mask = this.props.showMask ? <div className="rodal-mask" style={this.props.customMaskStyles} onClick={this.props.onClose} /> : null;
        const style = {
            display                 : this.state.isShow ? 'block' : 'none',
            WebkitAnimationDuration : this.props.duration + 'ms',
            animationDuration       : this.props.duration + 'ms'
        };

        return (
            <div style={style} 
                 className={"rodal rodal-fade-" + this.state.animationType + ' ' + this.props.className} 
                 onAnimationEnd={this.animationEnd}
            >
                {mask}
                <Dialog {...this.props} animationType={this.state.animationType}>
                    {this.props.children}
                </Dialog>
            </div>
        )
    }
}

Rodal.propTypes = propTypes;
Rodal.defaultProps = defaultProps;

export default Rodal;
