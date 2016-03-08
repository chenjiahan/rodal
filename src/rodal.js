/* ===============================
 * Rodal v1.2.6 http://rodal.cn
 * =============================== */

import React                from 'react';
import ReactDOM             from 'react-dom';
import addEndEventListener  from './animationEvents';
import './rodal.css';

const { PropTypes, Component } = React;
const propTypes = {
    width           : PropTypes.number,
    height          : PropTypes.number,
    onClose         : PropTypes.func.isRequired,
    visible         : PropTypes.bool,
    showMask        : PropTypes.bool,
    showCloseButton : PropTypes.bool,
    animation       : PropTypes.string,
    duration        : PropTypes.number
};

const defaultProps = {
    width           : 400,
    height          : 240,
    visible         : false,
    showMask        : true,
    showCloseButton : true,
    animation       : 'zoom',
    duration        : 300
};

const Dialog = props => {

    const className = `rodal-dialog rodal-${props.animation}-${props.animationType}`;
    const CloseButton = props.showCloseButton ? <span className="rodal-close" onClick={props.onClose} /> : null;
    const style = {
        width                   : props.width,
        height                  : props.height,
        marginTop               : - props.height / 2 - 20,
        marginLeft              : - props.width / 2,
        animationDuration       : props.duration + 'ms',
        WebkitAnimationDuration : props.duration + 'ms'
    };

    return (
        <div style={style} className={className}>
            {CloseButton}
            {props.children}
        </div>
    )
};

class Rodal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isShow        : false,
            animationType : 'leave'
        };
    }

    /**
     * add animation event listener
     */
    componentDidMount() {
        this.animationEvents = addEndEventListener(
            ReactDOM.findDOMNode(this),
            this.animationEnd.bind(this)
        );

        if (this.props.visible) {
            this.enter();
        }
    }

    /**
     * remove animation event listener
     */
    componentWillUnmount() {
        if (this.animationEvents) {
            this.animationEvents.remove();
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
        if (this.animationEvents) {
            this.setState({
                animationType: 'leave'
            });
        } else {
            this.setState({
                isShow: false
            })
        }
    }

    animationEnd(e) {
        const node = ReactDOM.findDOMNode(this);
        if (e && e.target !== node) {
            return;
        }

        if (this.state.animationType === 'leave') {
            this.setState({
                isShow: false
            });
        }
    }

    render() {
        const mask = this.props.showMask ? <div className="rodal-mask" onClick={this.props.onClose} /> : null;
        const style = {
            display                 : this.state.isShow ? 'block' : 'none',
            WebkitAnimationDuration : this.props.duration + 'ms',
            animationDuration       : this.props.duration + 'ms',
        };

        return (
            <div style={style} className={"rodal rodal-fade-" + this.state.animationType}>
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