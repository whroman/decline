import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Tooltip from "rc-tooltip";

import genders from "./../../../fixtures/genders";

const componentClassName = 'AdjectivesExerciseItem';

const getInput = (tabindex) => document.querySelector(`.${componentClassName} [tabindex='${tabindex}']`);

export default class AdjectivesExerciseItem extends Component {

  static get propTypes() {
    return {
      phrase: PropTypes.shape(),
    };
  }

  constructor () {
    super();

    this.state = {
      isCorrect: false,
      isFilled: false,
      tooltipShow: false,
      tooltipJSX: null
    };
  }

  render () {
    const { phrase, uid, setFocusedItem, shouldFocus } = this.props;
    const { untilAdj, key } = phrase

    const { isFilled, isCorrect } = this.state;
    let inputState = '';
    if (isFilled) inputState = isCorrect ? 'isCorrect' : 'isIncorrect';

    const componentClassNames = [ componentClassName, inputState ];
    if (shouldFocus) componentClassNames.push('isFocused');

    return (
      <div
        className={ componentClassNames.join(' ') }
        onClick={ this.handleClick.bind(this) }
        onMouseEnter={ () => setFocusedItem(key) }
      >
        { this.renderTooltip() }
        <div className='text'>
          <span>{ untilAdj }</span>
          <span>&nbsp;</span>
          { this.renderAdjective() }
          { this.renderInput() }
          <span>&nbsp;</span>
          { this.renderDirectObject() }
          <span>.</span>
        </div>
        { this.renderExerciseActions(uid) }
      </div>
    );
  }

  renderTooltip () {
    const { tooltipJSX } = this.state;
    return tooltipJSX === null ? null : (
      <div className='tooltip'>
        { this.state.tooltipJSX }
      </div>
    );
  }

  renderAdjective () {
    const { text, translations } = this.props.phrase.adjective;

    const tooltip = (
      <div>
        <strong>Adjektiv</strong>
        {
          translations.eng.map((trans) => (
            <div key={ trans }>{ trans }</div>
          ))
        }
      </div>
    );

    return (
      <span
        className='triggersTooltip'
        onMouseEnter={ () => this.toggleTooltip(true, tooltip) }
        onMouseLeave={ () => this.toggleTooltip(false) }
      >{ text }</span>
    );
  }

  renderInput () {
    const { phrase, uid, setFocusedItem } = this.props;
    const { stub, key } = phrase
    const numOfChars = stub.length;

    return (
      <strong className='input-wrapper'>
        <input
          autoFocus={ uid === 0 ? true : false }
          type="text"
          maxLength={ numOfChars }
          size={ numOfChars }
          onChange={ this.handleInputChange.bind(this) }
          onKeyPress={ this.handleInputKeyPress.bind(this) }
          onFocus={ () => setFocusedItem(key) }
          onBlur={ this.handleInputBlur.bind(this) }
          tabIndex={ uid + 1 }
        />
        <div className="placeholder">{ Array(numOfChars + 1).join('_') }</div>
      </strong>
    );
  }

  renderDirectObject () {
    const { text, gender, translations } = this.props.phrase.noun;

    const tooltip = (
      <div>
        <strong>Direktes Objekt</strong>
        <div>{ `{ ${genders[gender]} }` }</div>
        { translations.eng.map((translation) => {
          return (<div key={ translation }>{ translation }</div>);
        }) }
      </div>
    );

    return (
      <span
        className='triggersTooltip'
        onMouseEnter={ () => this.toggleTooltip(true, tooltip) }
        onMouseLeave={ () => this.toggleTooltip(false) }
      >{ text }</span>
    );

  }

  renderExerciseActions (uid) {
    return (
      <div className='actions'>
        <Link
          to={`detail/${uid}`}
          className='detail-link'
        >
          <i className='wr-ico wr-ico-info-circle wr-ico-fw' />
        </Link>
      </div>
    );
  }

  handleClick () {
    getInput(this.props.uid + 1).focus();
  }

  handleInputKeyPress (event) {
    if (event.key.toLowerCase() === 'enter') {
      let nextInput = getInput(this.props.uid + 2);
      if (!nextInput) nextInput = getInput(1);
      nextInput.focus();
    }
  }

  handleInputChange (event) {
    const { value } = event.target;
    const { stubbedValue } = this.props.phrase;

    const isCorrect = value.toLowerCase() === stubbedValue.toLowerCase();
    const isFilled = areSameLength(value, stubbedValue);
    this.setState({ isCorrect, isFilled });
  }

  handleInputBlur (event) {
    const { value } = event.target;
    const { uid, phrase, replace } = this.props;
    const isFilled = areSameLength(value, phrase.stubbedValue);
    if (uid >= 3 && isFilled) replace(1);
    this.toggleTooltip(false);
  }

  toggleTooltip (show, tooltipJSX=null) {
    this.setState({
      tooltipShow: show,
      tooltipJSX
    });
  }

}

function areSameLength (str1, str2) {
  return str1.length === str2.length
}
