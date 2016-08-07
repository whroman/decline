import React, { Component, PropTypes } from 'react';
import './Tooltip.scss';

export default class Tooltip extends Component {

    static get propTypes() {
        return {
            show: PropTypes.bool.isRequired,
            children: PropTypes.node.isRequired,
            className: PropTypes.string
        };
    }

    render() {
        const { show, children, className } = this.props;
        const tooltip = (!show) ? null : (<div className={ `Tooltip ${className}` } >{ children }</div>);
        return tooltip;
    }

}