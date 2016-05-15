import React, { Component, PropTypes } from 'react';

const className = 'AdjectivesExerciseItem';

function getInput (tabindex) {
  return document.querySelector(`.${className} [tabindex='${tabindex}']`);
}

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
      isFilled: false
    };
  }

  render () {
    const { phrase, number } = this.props;
    const { untilStub, afterStub, stub } = phrase
    const numOfChars = stub.length;

    const { isFilled, isCorrect } = this.state;
    let inputState = '';
    if (isFilled) inputState = isCorrect ? 'correct' : 'incorrect';

    return (
      <td className={ className } >
        <span>{ untilStub }</span>
        <span className={`input-wrapper ${inputState}`}>
          <input
            ref={ phrase.key }
            autoFocus={ number === 0 ? true : false }
            type="text"
            maxLength={ numOfChars }
            size={ numOfChars }
            onChange={ this.handleChange.bind(this) }
            onKeyPress={ this.handleKeypress.bind(this) }
            tabIndex={ number + 1 }
          />
          <div className="placeholder">{ Array(numOfChars + 1).join('_') }</div>
        </span>
        <span>{ afterStub }</span>
      </td>
    );
  }

  handleKeypress (event) {
    if (event.key.toLowerCase() === 'enter') {
      let nextInput = getInput(this.props.number + 2);
      if (!nextInput) nextInput = getInput(1);
      nextInput.focus();
    }
  }

  handleChange (event) {
    const { value } = event.target;
    const { stubbedValue } = this.props.phrase;

    const isCorrect = value.toLowerCase() === stubbedValue.toLowerCase();
    const isFilled = value.length === stubbedValue.length;
    this.setState({ isCorrect, isFilled });
  }

}
