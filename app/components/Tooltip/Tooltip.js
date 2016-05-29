import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './Tooltip.scss';

export default class Tooltip extends Component {

    static get propTypes() {
        return {
            show: PropTypes.bool.isRequired,
            children: PropTypes.node.isRequired
        };
    }

    render() {
        const tooltip = (!this.props.show) ? null : (<div className='Tooltip' >{ this.props.children }</div>);
        const transitionProps = {
            transitionName: 'Tooltip',
            transitionEnterTimeout: 100,
            transitionLeaveTimeout: 100,
        };

        return (<ReactCSSTransitionGroup { ...transitionProps } >{ tooltip }</ReactCSSTransitionGroup>);
    }

}