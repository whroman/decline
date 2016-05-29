import React, { Component, PropTypes } from 'react';
import './Tooltip.scss';

export default class Tooltip extends Component {

    static get propTypes() {
        return {
            show: PropTypes.bool.isRequired,
            children: PropTypes.node.isRequired
        };
    }

    render() {
        return (<div className={ `Tooltip ${ this.props.show ? 'show' : '' }` } >{ this.props.children }</div>);
    }

}