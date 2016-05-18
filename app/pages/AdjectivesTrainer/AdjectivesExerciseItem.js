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
    const { phrase, uid, setFocusedItem, shouldFocus } = this.props;
    const { untilStub, afterStub, stub } = phrase
    const numOfChars = stub.length;

    const { isFilled, isCorrect } = this.state;
    let inputState = '';
    if (isFilled) inputState = isCorrect ? 'correct' : 'incorrect';

    const classNames = [
      className,
      shouldFocus ? 'isFocused' : ''
    ];

    return (
      <tr
        className={ classNames.join(' ') }
        onClick={ this.handleClick.bind(this) }
        onMouseEnter={ () => setFocusedItem(uid) }
      >
        <td className='text'>
          <span>{ untilStub }</span>
          <strong className={`input-wrapper ${inputState}`}>
            <input
              ref={ phrase.key }
              autoFocus={ uid === 0 ? true : false }
              type="text"
              maxLength={ numOfChars }
              size={ numOfChars }
              onChange={ this.handleInputChange.bind(this) }
              onKeyPress={ this.handleInputKeyPress.bind(this) }
              onFocus={ () => setFocusedItem(uid) }
              tabIndex={ uid + 1 }
            />
            <div className="placeholder">{ Array(numOfChars + 1).join('_') }</div>
          </strong>
          <span>{ afterStub }</span>
        </td>
        { this.renderExerciseActions(uid) }
      </tr>

    );
  }

  renderExerciseActions (uid) {
    return (
      <td>
        <Link
          to={`detail/${uid}`}
          className='detail-link'
        >
          <i className='wr-ico wr-ico-info-circle wr-ico-fw' />
        </Link>
      </td>
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
    const isFilled = value.length === stubbedValue.length;
    this.setState({ isCorrect, isFilled });
  }

}
