import React, { Component, PropTypes } from 'react';

export default class WithTooltip extends Component {

  constructor () {
    super();

    this.state = {
      show: false
    };
  }

  showTooltip() {
    this.setState({ show: true });
  }

  hideTooltip() {
    this.setState({ show: false });
  }

}
