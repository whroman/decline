import React, { Component, PropTypes } from 'react';
import genders from "./../../../../../tables/genders/data.js";
import Tooltip from "./../../../Tooltip//Tooltip";
import WithTooltip from "./WithTooltip";

export default class DirectObject extends WithTooltip {

  static get propTypes() {
    return {
      text: PropTypes.string.isRequired,
      gender: PropTypes.number.isRequired,
      translations: PropTypes.arrayOf(PropTypes.string).isRequired,
    };
  }

  render() {
    const { text, gender, translations } = this.props;

    return (
      <span
        className='triggersTooltip'
        onMouseEnter={ this.showTooltip.bind(this) }
        onMouseLeave={ this.hideTooltip.bind(this) }
      >
        <Tooltip show={ this.state.show } >
          <strong>Direktes Objekt</strong>
          <div>{ `{ ${genders[gender]} }` }</div>
          { translations.map((translation) => {
            return (<div key={ translation }>{ translation }</div>);
          }) }
        </Tooltip>
        <span>{ text }</span>
      </span>
    );
  }

}
