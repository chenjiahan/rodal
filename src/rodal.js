/* ===============================
 * Rodal v1.2.6 http://rodal.cn
 * =============================== */
import React, { PropTypes } from 'react';
import ReactDOM             from 'react-dom';
import addEndEventListener  from './animationEvents';
import Dialog               from './dialog';
import './rodal.css';

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

/**
 * Rodal Component
 */
class Rodal extends React.Component {

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
            this.setState({ isShow: false });
        }
    }

    render() {
        const { duration, showMask, onClose, children } = this.props;
        const { isShow, animationType } = this.state;

        const mask = showMask ? <div className="rodal-mask" onClick={onClose} /> : null;

        const style = {
            display                 : isShow ? 'block' : 'none',
            WebkitAnimationDuration : duration + 'ms',
            animationDuration       : duration + 'ms',
        };

        return (
            <div style={style} className={"rodal rodal-fade-" + animationType}>
                {mask}
                <Dialog {...this.props} animationType={animationType}>
                    {children}
                </Dialog>
            </div>
        )
    }
}

Rodal.propTypes = propTypes;
Rodal.defaultProps = defaultProps;

export default Rodal;