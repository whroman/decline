import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'

import './AdjectivesExercise.scss';

export default class AdjectivesExercise extends Component {

  static get propTypes() {
    return {
      phrases: PropTypes.arrayOf(PropTypes.shape),
    };
  }

  renderPhrase (phrase, index) {
    return (
      <tr key={ phrase.key } >
        <AdjectivesExerciseItem number={ index } phrase={ phrase } />
        { this.renderExerciseActions(index) }
      </tr>
    );
  }

  render () {
    return (
      <table className='AdjectivesExercise'>
        <tbody>
          { this.props.phrases.map(this.renderPhrase.bind(this)) }
        </tbody>
      </table>
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

}

class AdjectivesExerciseItem extends Component {

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
      <td className="AdjectivesExerciseItem" >
        <span>{ untilStub }</span>
        <span className={`input-wrapper ${inputState}`}>
          <input
            autoFocus= { number === 0 ? true : false }
            type="text"
            maxLength={ numOfChars }
            size={ numOfChars }
            onChange={ this.handleChange.bind(this) }
          />
          <div className="placeholder">{ Array(numOfChars + 1).join('_') }</div>
        </span>
        <span>{ afterStub }</span>
      </td>
    );
  }

  handleChange (event) {
    const { value } = event.target;
    const { stubbedValue } = this.props.phrase;

    const isCorrect = value.toLowerCase() === stubbedValue.toLowerCase();
    const isFilled = value.length === stubbedValue.length;
    this.setState({ isCorrect, isFilled });
  }

}
