/* ===============================
 * Rodal v1.2.0 http://rodal.cn
 * =============================== */
import React, { PropTypes } from 'react';
import ReactDOM             from 'react-dom';
import addEndEventListener  from './animationEvents';
import Dialog               from './dialog';
import './rodal.scss';

/**
 * Rodal Component
 */
class Rodal extends React.Component {

    static propTypes = {
        visible         : PropTypes.bool,
        onClose         : PropTypes.func.isRequired,
        animation       : PropTypes.string,
        duration        : PropTypes.number,
        showMask        : PropTypes.bool,
        showCloseButton : PropTypes.bool
    };

    static defaultProps = {
        visible         : false,
        animation       : 'zoom',
        duration        : 300,
        showMask        : true,
        showCloseButton : true
    };

    state = {
        isShow        : false,
        animationType : 'leave'
    };

    /**
     * add animation event listener
     */
    componentDidMount() {
        this.animationEvents = addEndEventListener(
            ReactDOM.findDOMNode(this),
            this.transitionEnd.bind(this)
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

    transitionEnd(e) {
        let node = ReactDOM.findDOMNode(this);
        if (e && e.target !== node) {
            return;
        }

        if (this.state.animationType === 'leave') {
            this.setState({ isShow: false });
        }
    }

    render() {
        let { duration, showMask, onClose, children } = this.props;
        let { isShow, animationType } = this.state;

        let mask = showMask ? <div className="rodal-mask" onClick={onClose} /> : null;

        let style = {
            display                 : isShow ? 'block' : 'none',
            animationDuration       : duration + 'ms',
            WebkitAnimationDuration : duration + 'ms'
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

export default Rodal;