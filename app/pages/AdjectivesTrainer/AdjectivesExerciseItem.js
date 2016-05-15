import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'

const className = 'AdjectivesExerciseItem';

const getInput = (tabindex) => document.querySelector(`.${className} [tabindex='${tabindex}']`);

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
      <tr
        className={ className }
        onClick={ this.handleClick.bind(this) }
      >
        <td className='text'>
          <span>{ untilStub }</span>
          <span className={`input-wrapper ${inputState}`}>
            <input
              ref={ phrase.key }
              autoFocus={ number === 0 ? true : false }
              type="text"
              maxLength={ numOfChars }
              size={ numOfChars }
              onChange={ this.handleInputChange.bind(this) }
              onKeyPress={ this.handleInputKeyPress.bind(this) }
              tabIndex={ number + 1 }
            />
            <div className="placeholder">{ Array(numOfChars + 1).join('_') }</div>
          </span>
          <span>{ afterStub }</span>
        </td>
        { this.renderExerciseActions(number) }
      </tr>

    );
  }

  renderExerciseActions (number) {
    return (
      <td>
        <Link
          to={`detail/${number}`}
          className='detail-link'
        >
          <i className='wr-ico wr-ico-info-circle wr-ico-fw' />
        </Link>
      </td>
    );
  }

  handleClick () {
    const input = getInput(this.props.number + 1);
    input.focus();
  }

  handleInputKeyPress (event) {
    if (event.key.toLowerCase() === 'enter') {
      let nextInput = getInput(this.props.number + 2);
      if (!nextInput) nextInput = getInput(1);
      nextInput.focus();
    }
  }

  handleInputChange (event) {
    const { value } = event.target;
    const { stubbedValue } = this.props.phrase;

    const isCorrect = value.toLowerCase() === stubbedValue.toLowerCase();
    const isFilled = value.length === stubbedValue.length;
    this.setState({ isCorrect, isFilled });
  }

}
